import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMusic } from "../../../features/home/music/musicSlice";
import music1 from "../../../assets/images/music-icon.png";
import play from "../../../assets/images/play-icon.png";
import play1 from "../../../assets/images/black-music-icon.png"

const CalmMusicListing = () => {
  const dispatch = useDispatch();
  const { music, loading } = useSelector((state) => state.music);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    dispatch(fetchMusic());
  }, [dispatch]);

  const handlePlay = (track) => {
    if (audio) {
      audio.pause();
    }

    const newAudio = new Audio(track.fileUrl);
    newAudio.play();

    setAudio(newAudio);
    setCurrentTrack(track);
  };

  const formatLength = (len) => {
    return len?.replace(")", "") || "0:00"; 
  };

  return (
    <div className="main-content calm-music-main">
      <div className="row">
        {loading ? (
          <p>Loading...</p>
        ) : (
          music.map((item) => (
            <div className="col-md-6" key={item._id}>
              <div className="calm-music-card">
                <div className="left">
                  <div className="icon">
                    <img src={music1} alt="" />
                  </div>

                  <div>
                    <h4>{item.trackName||"N/A"}</h4>
                    <p>
                      {formatLength(item.length)}{" "}
                      <span className="tag">
                        {item.mood || "Relax"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="right">
                  <div
                    className="play"
                    onClick={() => handlePlay(item)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={play} alt="" />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Player */}
      {currentTrack && (
        <div className="player">
          <div className="player-left">
            <div className="icon small">
              <img src={play1} alt="" />
            </div>

            <div>
              <h4>{currentTrack.trackName||"N/A"}</h4>
              <p>{formatLength(currentTrack.length)}</p>
            </div>
          </div>

          <div className="controls">
            <button>⏮</button>

            <button
              className="pause"
              onClick={() =>
                audio?.paused ? audio.play() : audio.pause()
              }
            >
              ⏯
            </button>

            <button>⏭</button>

            <button
              className="close"
              onClick={() => {
                audio?.pause();
                setCurrentTrack(null);
              }}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalmMusicListing;