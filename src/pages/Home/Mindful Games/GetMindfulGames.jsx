import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openGame } from "../../../features/home/games/gamesSlice";
import img1 from "../../../assets/images/mindful-one.png";
import img2 from "../../../assets/images/mindful-two.png";
import img3 from "../../../assets/images/mindful-three.png";
import img4 from "../../../assets/images/mindful-four.png";
import img5 from "../../../assets/images/mindful-five.png";

const GetMindfulGames = () => {
  const dispatch = useDispatch();
  const { games } = useSelector((state) => state.games);

  const imageMap = {
  1: img1,
  2: img2,
  3: img3,
  4: img4,
  5: img5,
};

  return (
    <div className="main-content">
      <div className="activities-grid">
        {games.map((game) => (
          <div
            key={game.id}
            className="activity-card"
            onClick={() => dispatch(openGame(game.endpoint))}
            style={{ cursor: "pointer" }}
          >
            <div className="activity-icon">
              <img src={imageMap[game.id]} alt={game.title} />
            </div>
            <h4>{game.title}</h4>
            <p>{game.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetMindfulGames;