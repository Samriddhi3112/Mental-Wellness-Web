import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import FeedbackModal from "../../../components/modals/FeedbackModal";

import defaultImg from "../../../assets/images/mindfull-breathing-img.png";
import clockIcon from "../../../assets/images/clock-icon.svg";
import musicIcon from "../../../assets/images/music-icon.svg";
import chairIcon from "../../../assets/images/chair-icon.svg";

const WiseYogiDetail = () => {
  const { state } = useLocation();
  const data = state?.data;

  const [showModal, setShowModal] = useState(false);

  if (!data) return <p>No data found</p>;

  return (
    <>
      <div className="main-content">
        <div className="activity-detail-card">
          <div className="row">
            {/* LEFT IMAGE */}
            <div className="col-md-7">
              <div className="activity-image">
                {data?.fileUrl ? (
                  <video
                    src={data.fileUrl||"N/A"}
                    controls
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <img src={data?.thumbnail||"N/A"} alt="" />
                )}
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="col-md-5">
              <div className="activity-content">
                <div className="activity-header">
                  <h2>{data?.title || data?.activityName}</h2>

                  <div className="activity-meta">
                    <div className="activity-meta-item">
                      <span>
                        <img src={clockIcon} alt="" />
                      </span>
                      <span>
                        {data?.duration ? `${data.duration} min` : "5 min"}
                      </span>
                    </div>

                    <div className="activity-meta-item">
                      <span>
                        <img src={musicIcon} alt="" />
                      </span>
                      <span>Audio Guided</span>
                    </div>
                  </div>
                </div>

                {/* ABOUT */}
                <div className="section-title">About this activity</div>
                <div className="section-content">
                  {data?.description ||
                    "This guided breathing exercise helps calm your mind and reduce stress."}
                </div>

                {/* WHAT YOU NEED */}
                <div className="section-title">What you'll need</div>
                <div className="what-you-need">
                  <ul>
                    <li>
                      <img src={chairIcon} alt="" /> {data?.requirement ||
                    "A quiet and comfortable place to sit"}
                    </li>
                  </ul>
                </div>

                {/* BUTTON */}
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
      </div>

      {/* MODAL */}
      <FeedbackModal show={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

export default WiseYogiDetail;
