import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import FeedbackModal from "../../../components/modals/FeedbackModal";

const MoviesDetail = () => {
  const { state } = useLocation();
  const [showModal, setShowModal] = useState(false);

  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const movie = state?.movie;

  if (!movie) return <p>No data found</p>;

  return (
    <div className="main-content">
      <div className="activity-detail-card">
        <div className="row">
          {/* LEFT SIDE → VIDEO */}
          <div className="col-md-7">
            <div
              className="activity-image position-relative"
              style={{ height: "350px" }}
            >
              {!isPlaying ? (
                <>
                  {/* Thumbnail */}
                  <img
                    src={movie?.thumbnail || "-"}
                    alt="thumbnail"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />

                  {/* Play Button Overlay */}
                  <div
                    onClick={() => {
                      setIsPlaying(true);
                      setTimeout(() => {
                        videoRef.current?.play();
                      }, 100);
                    }}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      cursor: "pointer",
                      background: "rgba(0,0,0,0.6)",
                      borderRadius: "50%",
                      padding: "20px",
                    }}
                  >
                    ▶
                  </div>
                </>
              ) : (
                <video
                  ref={videoRef}
                  width="100%"
                  height="100%"
                  controls
                  style={{
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                >
                  <source src={movie?.fileUrl || "N/A"} type="video/mp4" />
                </video>
              )}
            </div>
          </div>

          {/* RIGHT SIDE → CONTENT */}
          <div className="col-md-5">
            <div className="activity-content">
              <div className="activity-header">
                <h2>{movie?.activityName || "N/A"}</h2>

                <div className="section-content">
                  {movie?.description || "N/A"}
                </div>

                <div className="section-title color-grey">Duration</div>
                <p>
                  <strong>{movie?.duration || "N/A"} minutes</strong>
                </p>
              </div>

              <div className="section-title color-grey">Category</div>
              <p>
                <strong>{movie?.category || "N/A"}</strong>
              </p>

              <div className="section-title color-grey">Language</div>
              <p>
                <strong>{movie?.language || "N/A"}</strong>
              </p>

              <div className="section-title color-grey">Uploaded By</div>
              <p>
                <img src="/images/profile-image.svg" alt="" />
                <strong> &nbsp; Admin</strong>
              </p>

              {/* START BUTTON → PLAY VIDEO */}
              <button
                className="w-100 btn-primary-orange"
                onClick={() => setShowModal(true)}
              >
                Start Activity →
              </button>
            </div>
          </div>
        </div>
      </div>
      <FeedbackModal show={showModal} handleClose={() => setShowModal(false)} />
    </div>
  );
};

export default MoviesDetail;
