// hooks/useAgoraCall.js
import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import AgoraRTC from "agora-rtc-sdk-ng";
import {
  setInCall,
  addRemoteUser,
  removeRemoteUser,
  updateRemoteUser,
  clearTokenData,
  resetCallState,
} from "../features/call/callSlice";
import { startCall, endCall, generateCallToken } from "../features/call/callSlice";

/**
 * useAgoraCall
 * 
 * Usage:
 *   const { joinCall, leaveCall, toggleMicMute, toggleCameraOff } = useAgoraCall({
 *     bookingId,
 *     isAdmin,
 *     localVideoRef,   // ref for local video container div
 *     remoteVideoRef,  // ref for remote video container div (voice-only mein zaroorat nahi)
 *   });
 */
export function useAgoraCall({ bookingId, isAdmin = false, localVideoRef, remoteVideoRef }) {
  const dispatch = useDispatch();
  const { tokenData } = useSelector((state) => state.call);

  // Agora internals – refs taaki re-render pe reset na ho
  const clientRef = useRef(null);
  const localTracksRef = useRef({ audioTrack: null, videoTrack: null });
  const isJoinedRef = useRef(false);
  // Token refresh timer
  const tokenRefreshTimerRef = useRef(null);

  // ─── Initialize Agora Client ────────────────────────────────────────────────
  const initClient = useCallback((mode) => {
    if (clientRef.current) return; // already initialized

    clientRef.current = AgoraRTC.createClient({
      mode: "rtc",
      codec: "vp8",
    });

    const client = clientRef.current;

    // Remote user joined → subscribe karo
    client.on("user-published", async (user, mediaType) => {
  await client.subscribe(user, mediaType);

  if (mediaType === "video") {
    // Ref null hai to wait karke retry karo
    const playVideo = (attempts = 0) => {
      if (remoteVideoRef?.current) {
        user.videoTrack?.play(remoteVideoRef.current);
        console.log("[Agora] Playing remote video ✓");
      } else if (attempts < 10) {
        console.log("[Agora] remoteVideoRef null, retry", attempts + 1);
        setTimeout(() => playVideo(attempts + 1), 300);
      } else {
        console.error("[Agora] remoteVideoRef never became available");
      }
    };
    playVideo();
  }

  if (mediaType === "audio") {
    user.audioTrack?.play();
  }

  dispatch(addRemoteUser({
    uid: user.uid,
    hasVideo: mediaType === "video",
    hasAudio: mediaType === "audio",
  }));
});

    // Remote user left
    client.on("user-unpublished", (user, mediaType) => {
      if (mediaType === "video") {
        dispatch(updateRemoteUser({ uid: user.uid, hasVideo: false }));
      }
      if (mediaType === "audio") {
        dispatch(updateRemoteUser({ uid: user.uid, hasAudio: false }));
      }
    });

    client.on("user-left", (user) => {
      dispatch(removeRemoteUser(user.uid));
    });

    // Token expiry near → refresh karo
    client.on("token-privilege-will-expire", async () => {
      console.log("[Agora] Token expiring soon, refreshing...");
      await refreshToken();
    });

    client.on("token-privilege-did-expire", async () => {
      console.log("[Agora] Token expired, refreshing...");
      await refreshToken();
    });
  }, [dispatch, remoteVideoRef]);

  // ─── Token Refresh ──────────────────────────────────────────────────────────
  const refreshToken = useCallback(async () => {
    try {
      const result = await dispatch(generateCallToken({ bookingId, isAdmin })).unwrap();
      const newToken = result.data?.token || result.token;
      if (clientRef.current && isJoinedRef.current) {
        await clientRef.current.renewToken(newToken);
        console.log("[Agora] Token renewed successfully");
      }
    } catch (err) {
      console.error("[Agora] Token refresh failed:", err);
    }
  }, [bookingId, isAdmin, dispatch]);

  // ─── Schedule token refresh (5 min before expiry) ──────────────────────────
  const scheduleTokenRefresh = useCallback((expiresIn) => {
    if (tokenRefreshTimerRef.current) clearTimeout(tokenRefreshTimerRef.current);
    const refreshAfterMs = Math.max((expiresIn - 300) * 1000, 60000); // at least 1 min
    tokenRefreshTimerRef.current = setTimeout(() => {
      refreshToken();
    }, refreshAfterMs);
  }, [refreshToken]);

  // ─── Join Call ──────────────────────────────────────────────────────────────
  const joinCall = useCallback(async (tokenDataOverride = null) => {
    const td = tokenDataOverride || tokenData;
    if (!td) {
      console.error("[Agora] No token data available");
      return;
    }

    const { appId, channelName, token, uid, mode, expiresIn } = td;

    try {
      initClient(mode);
      const client = clientRef.current;

      // Channel join
      await client.join(appId, channelName, token, uid);
      isJoinedRef.current = true;

      // Local tracks create karo
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      localTracksRef.current.audioTrack = audioTrack;

      if (mode === "video") {
        const videoTrack = await AgoraRTC.createCameraVideoTrack();
        localTracksRef.current.videoTrack = videoTrack;

        // Local video play karo
        if (localVideoRef?.current) {
          videoTrack.play(localVideoRef.current);
        }

        await client.publish([audioTrack, videoTrack]);
      } else {
        // Voice only
        await client.publish([audioTrack]);
      }

      dispatch(setInCall(true));

      // Backend ko batao call start hui
      dispatch(startCall({ bookingId, isAdmin }));

      // Token refresh schedule karo
      if (expiresIn) scheduleTokenRefresh(expiresIn);

      console.log("[Agora] Joined channel:", channelName, "| UID:", uid, "| Mode:", mode);
    } catch (err) {
      console.error("[Agora] Join failed:", err);
      throw err;
    }
  }, [tokenData, bookingId, isAdmin, dispatch, initClient, scheduleTokenRefresh, localVideoRef]);

  // ─── Leave Call ─────────────────────────────────────────────────────────────
  const leaveCall = useCallback(async () => {
    try {
      // Local tracks band karo
      const { audioTrack, videoTrack } = localTracksRef.current;
      audioTrack?.close();
      videoTrack?.close();
      localTracksRef.current = { audioTrack: null, videoTrack: null };

      // Channel se niklo
      if (clientRef.current && isJoinedRef.current) {
        await clientRef.current.leave();
        isJoinedRef.current = false;
      }

      // Client destroy
      clientRef.current = null;

      // Timer clear
      if (tokenRefreshTimerRef.current) {
        clearTimeout(tokenRefreshTimerRef.current);
      }

      // Backend ko batao call end hui
      await dispatch(endCall({ bookingId, isAdmin })).unwrap();

      dispatch(clearTokenData());
      dispatch(setInCall(false));

      console.log("[Agora] Left channel");
    } catch (err) {
      console.error("[Agora] Leave failed:", err);
    }
  }, [bookingId, isAdmin, dispatch]);

  // ─── Toggle Mic ─────────────────────────────────────────────────────────────
  const toggleMicMute = useCallback(async (shouldMute) => {
    const { audioTrack } = localTracksRef.current;
    if (audioTrack) {
      await audioTrack.setMuted(shouldMute);
    }
  }, []);

  // ─── Toggle Camera ───────────────────────────────────────────────────────────
  const toggleCameraOff = useCallback(async (shouldDisable) => {
    const { videoTrack } = localTracksRef.current;
    if (videoTrack) {
      await videoTrack.setMuted(shouldDisable);
    }
  }, []);

  // ─── Cleanup on unmount ──────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (isJoinedRef.current) {
        leaveCall();
      }
      if (tokenRefreshTimerRef.current) {
        clearTimeout(tokenRefreshTimerRef.current);
      }
    };
  }, []);

  return {
    joinCall,
    leaveCall,
    toggleMicMute,
    toggleCameraOff,
    isJoined: isJoinedRef.current,
  };
}