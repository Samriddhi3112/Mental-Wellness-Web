import React from "react";
import mindfulOne from "../../../assets/images/mindful-one.png";
import mindfulTwo from "../../../assets/images/mindful-two.png";
import mindfulThree from "../../../assets/images/mindful-three.png";
import mindfulFour from "../../../assets/images/mindful-four.png";
import mindfulFive from "../../../assets/images/mindful-five.png";

const GetMindfulGames = () => {
  return (
    <div className="main-content">
      <div className="activities-grid">
        <div className="activity-card">
          <div className="activity-icon icon-puzzle">
            <img src={mindfulOne} alt="2048" />
          </div>
          <h4>2048</h4>
          <p>Classic Puzzle Game</p>
        </div>

        <div className="activity-card">
          <div className="activity-icon icon-edit">
            <img src={mindfulTwo} alt="Memory Match" />
          </div>
          <h4>Memory Match</h4>
          <p>Pairs Game</p>
        </div>

        <div className="activity-card">
          <div className="activity-icon icon-movie">
            <img src={mindfulThree} alt="Breathing" />
          </div>
          <h4>Breathing</h4>
          <p>Relaxation Game</p>
        </div>

        <div className="activity-card">
          <div className="activity-icon icon-music">
            <img src={mindfulFour} alt="Simple Zen" />
          </div>
          <h4>Simple Zen</h4>
          <p>Drawing Game</p>
        </div>

        <div className="activity-card">
          <div className="activity-icon icon-yoga">
            <img src={mindfulFive} alt="Block Puzzle" />
          </div>
          <h4>Block Puzzle</h4>
          <p>Puzzle Game</p>
        </div>
      </div>
    </div>
  );
};

export default GetMindfulGames;