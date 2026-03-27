import React from "react";

import kaiImage from "../../assets/images/side-nav-bottom-image.png";
import mindful from "../../assets/images/mindful.png";
import journal from "../../assets/images/your-secret-jounal.png";
import movie from "../../assets/images/movie.png";
import calmMusic from "../../assets/images/clam-music.png";
import wiseYogi from "../../assets/images/wise-yogi.png";
import health from "../../assets/images/health-is-wealth.png";
import offcanvasImg1 from "../../assets/images/offcanvas-image-one.svg";
import offcanvasImg2 from "../../assets/images/offcanvas-image-two.svg";
import playIcon from "../../assets/images/play-icon.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="main-content">
        {/* Talk to Kai Card */}
        <div className="kai-card">
          <div className="kai-card-left">
            <img src={kaiImage} alt="Kai" />
            <div>
              <h3>Talk to Kai</h3>
              <p>Your personal companion is here to listen, judgment-free.</p>
            </div>
          </div>
          <a className="btn" href="#">
            Start Conversation
          </a>
        </div>

        {/* Recommended Activities */}
        <div className="activities-header">
          <h3>Recommended Activities</h3>
          {/* <a href="#">View All</a> */}
        </div>

        <div className="activities-grid">
          <div
            className="activity-card"
            onClick={() => navigate("/home/mindfulGames")}
          >
            <div className="activity-icon icon-puzzle">
              <img src={mindful} alt="" />
            </div>
            <h4>Mindful Games</h4>
            <p>Play, Relax, Focus</p>
          </div>

          <div
            className="activity-card"
          >
            <div className="activity-icon icon-edit">
              <img src={journal} alt="" />
            </div>
            <h4>Your Secret Journal</h4>
            <p>Write Without Judgment</p>
          </div>

          <div className="activity-card" onClick={() => navigate("/home/moviesHome")}>
            <div
              className="activity-icon icon-movie"
              onClick={() => navigate("/home/moviesHome")}
            >
              <img src={movie} alt="" />
            </div>
            <h4>Movies</h4>
            <p>Watch And Unwind</p>
          </div>

          <div className="activity-card" onClick={() => navigate("/home/musicHome")}>
            <div className="activity-icon icon-music" onClick={() => navigate("/home/moviesHome")}>
              <img src={calmMusic} alt="" />
            </div>
            <h4>Calm Music</h4>
            <p>Relax Through Sound</p>
          </div>

          <div className="activity-card" onClick={()=> navigate("/home/wiseYogi")}>
            <div className="activity-icon icon-yoga" onClick={()=> navigate("/home/wiseYogi")}>
              <img src={wiseYogi} alt="" />
            </div>
            <h4>Wise Yogi</h4>
            <p>Balance Mind & Body</p>
          </div>

          <div className="activity-card">
            <div className="activity-icon icon-health">
              <img src={health} alt="" />
            </div>
            <h4>Health is Wealth</h4>
            <p>Care For Health</p>
          </div>
        </div>
      </div>

      {/* OFFCANVAS 1 */}

      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasRight"
      >
        <div className="offcanvas-body">
          <div className="text-center mb-4">
            <h2 className="title">Meet Kai, your guide</h2>
            <p className="sub-title">
              We've selected a friendly companion for your journey.
            </p>

            <img src={offcanvasImg1} alt="" />
          </div>
        </div>
      </div>

      {/* OFFCANVAS 2 */}

      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasRightSecond"
      >
        <div className="offcanvas-body">
          <div className="text-center mb-4 mt-4">
            <img src={offcanvasImg2} alt="" />
            <h2 className="title">Meet Kai, your guide</h2>
          </div>

          <div className="voice-option">
            <input type="radio" name="voice" defaultChecked />
            <span>Aura (Default)</span>
            <button>
              <img src={playIcon} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
