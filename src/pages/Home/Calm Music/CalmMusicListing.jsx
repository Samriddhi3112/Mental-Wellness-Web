// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMusic } from "../../../features/home/music/musicSlice";
// import music1 from "../../../assets/images/music-icon.png";
// import play from "../../../assets/images/play-icon.png";
// import play1 from "../../../assets/images/black-music-icon.png";
// import { useMusicPlayer } from "../../../context/MusicPlayerContext";

// const CalmMusicListing = () => {
//   const dispatch = useDispatch();
//   const { music, loading } = useSelector((state) => state.music);
//   const {
//   playMusic,
//   currentTrack,
//   isPlaying,
//   pauseMusic,
//   resumeMusic,
//   stopMusic,
// } = useMusicPlayer();
//   // const { playMusic } = useMusicPlayer();
//   // const [currentTrack, setCurrentTrack] = useState(null);
//   // const [audio, setAudio] = useState(null);

//   useEffect(() => {
//     dispatch(fetchMusic());
//   }, [dispatch]);

//   const handlePlay = (track) => {
//     playMusic(track);
//   };

//   // const handlePlay = (track) => {
//   //   if (audio) {
//   //     audio.pause();
//   //   }

//   //   const newAudio = new Audio(track.fileUrl);
//   //   newAudio.play();

//   //   setAudio(newAudio);
//   //   setCurrentTrack(track);
//   // };

//   const formatLength = (len) => {
//     return len?.replace(")", "") || "0:00";
//   };

  

//   return (
//     <div className="main-content calm-music-main">
//       <div className="row">
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           music.map((item) => (
//             <div className="col-md-6" key={item._id}>
//               <div className="calm-music-card">
//                 <div className="left">
//                   <div className="icon">
//                     <img src={music1} alt="" />
//                   </div>

//                   <div>
//                     <h4>{item.trackName || "N/A"}</h4>
//                     <p>
//                       {formatLength(item.length)}{" "}
//                       <span className="tag">{item.mood || "Relax"}</span>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="right">
//                   <div
//                     className="play"
//                     onClick={() => playMusic(item)}
//                     // onClick={() => handlePlay(item)}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <img src={play} alt="" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Bottom Player
//       {currentTrack && (
//         <div className="player">
//           <div className="player-left">
//             <div className="icon small">
//               <img src={play1} alt="" />
//             </div>

//             <div>
//               <h4>{currentTrack.trackName || "N/A"}</h4>
//               <p>{formatLength(currentTrack.length)}</p>
//             </div>
//           </div>

//           <div className="controls">
//             <button>⏮</button>

//             <button
//               className="pause"
//               onClick={() => (audio?.paused ? audio.play() : audio.pause())}
//             >
//               ⏯
//             </button>

//             <button>⏭</button>

//             <button
//               className="close"
//               onClick={() => {
//                 audio?.pause();
//                 setCurrentTrack(null);
//               }}
//             >
//               ✖
//             </button>
//           </div>
//         </div>
//       )} */}
//       {/* Floating Bottom Player */}
//       {/* {currentTrack && (
//         <div className="floating-player">
//           <div className="music-circle">
//             <img src={play1} alt="" />
//           </div>

//           <div className="controls">
//             {isPlaying ? (
//               <button onClick={pauseMusic}>⏸</button>
//             ) : (
//               <button onClick={resumeMusic}>▶</button>
//             )}

//             <button onClick={stopMusic}>✖</button>
//           </div>
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default CalmMusicListing;
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMusic } from "../../../features/home/music/musicSlice";
import music1 from "../../../assets/images/music-icon.png";
import play from "../../../assets/images/play-icon.png";
import play1 from "../../../assets/images/black-music-icon.png";
import { useMusicPlayer } from "../../../context/MusicPlayerContext";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { FaPause, FaPlay } from "react-icons/fa";

const CalmMusicListing = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { music, loading } = useSelector(
    (state) => state.music
  );

  // Background music player
  const {
    playMusic,
    currentTrack,
  } = useMusicPlayer();

  // Local preview player
  const localAudioRef = useRef(null);

  const [previewTrack, setPreviewTrack] =
    useState(null);

  const [isPreviewPlaying, setIsPreviewPlaying] =
    useState(false);

  useEffect(() => {
    dispatch(fetchMusic());
  }, [dispatch]);

  // Route change pe preview stop
  useEffect(() => {
    return () => {
      if (localAudioRef.current) {
        localAudioRef.current.pause();
        localAudioRef.current = null;
      }
    };
  }, [location.pathname]);

  const formatLength = (len) => {
    return len?.replace(")", "") || "0:00";
  };

  // Preview music only on current page
  const handlePreviewMusic = (e, item) => {
    e.stopPropagation();

    // Same song
    if (
      previewTrack?._id === item._id &&
      localAudioRef.current
    ) {
      if (isPreviewPlaying) {
        localAudioRef.current.pause();
        setIsPreviewPlaying(false);
      } else {
        localAudioRef.current.play();
        setIsPreviewPlaying(true);
      }

      return;
    }

    // Stop previous preview
    if (localAudioRef.current) {
      localAudioRef.current.pause();
    }

    const audio = new Audio(item.fileUrl);

    audio.play();

    localAudioRef.current = audio;

    setPreviewTrack(item);
    setIsPreviewPlaying(true);

    audio.onended = () => {
      setIsPreviewPlaying(false);
    };
  };

  // Set background music
  const handleSetBackgroundMusic = (item) => {
    // Stop local preview
    if (localAudioRef.current) {
      localAudioRef.current.pause();
      localAudioRef.current = null;
      setPreviewTrack(null);
      setIsPreviewPlaying(false);
    }

    playMusic(item);

    toast.success(
      `${item.trackName} set as background music`
    );
  };

  return (
    <div className="main-content calm-music-main">
      <div className="row">
  {loading ? (
    <p>Loading...</p>
  ) : (
    music.map((item) => {
      const isCurrentPreview =
        previewTrack?._id === item._id;

      // Selected background music
      const isBackgroundMusic =
        currentTrack?._id === item._id;

      return (
        <div
          className="col-md-6"
          key={item._id}
        >
          <div
            className={`calm-music-card ${
              isBackgroundMusic
                ? "active-background-music"
                : ""
            }`}
            onClick={() =>
              handleSetBackgroundMusic(item)
            }
          >
            <div className="left">
              <div className="icon">
                <img
                  src={music1}
                  alt=""
                />
              </div>

              <div className="music-info">
                <h4>
                  {item.trackName || "N/A"}
                </h4>

                <p>
                  {formatLength(item.length)}

                  <span className="tag">
                    {item.mood || "Relax"}
                  </span>
                </p>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              {/* Selected Label */}
              {isBackgroundMusic && (
                <span className="selected-music-badge">
                  Selected
                </span>
              )}

              {/* Play / Pause */}
              <div
                className={`play-btn ${
                  isCurrentPreview &&
                  isPreviewPlaying
                    ? "active"
                    : ""
                }`}
                onClick={(e) =>
                  handlePreviewMusic(e, item)
                }
              >
                {isCurrentPreview &&
                isPreviewPlaying ? (
                  <FaPause className="music-action-icon" />
                ) : (
                  <FaPlay className="music-action-icon play-icon" />
                )}
              </div>
            </div>
          </div>
        </div>
      );
    })
  )}
</div>

      {/* ONLY ONE FLOATING PLAYER */}
      {/* {currentTrack && (
        <div className="floating-player">
          <div className="player-left">
            <div className="music-circle">
              <img src={play1} alt="" />
            </div>

            <div className="music-details">
              <h4>
                {currentTrack.trackName || "N/A"}
              </h4>

              <p>
                {formatLength(
                  currentTrack.length
                )}
              </p>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default CalmMusicListing;