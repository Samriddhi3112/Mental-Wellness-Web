import React, { createContext, useContext, useRef, useState } from "react";

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());

  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playMusic = (track) => {
    if (!track?.fileUrl) return;

    const audio = audioRef.current;

    if (currentTrack?._id === track._id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }

      return;
    }

    audio.pause();

    audio.src = track.fileUrl;

    // 👇 LOOP ENABLE
    audio.loop = true;

    audio.play();

    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pauseMusic = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const resumeMusic = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const stopMusic = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    setCurrentTrack(null);
    setIsPlaying(false);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playMusic,
        pauseMusic,
        resumeMusic,
        stopMusic,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);