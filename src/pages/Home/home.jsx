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
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div>
      <div className="main-content">
        {/* Talk to Kai Card */}
        <div className="kai-card">
          <div className="kai-card-left">
            <img src={kaiImage} alt="Kai" />
            <div>
              <h3>{t("talkToKai")}</h3>
              <p>{t("kaiDescription")}</p>
              {/* <h3>Talk to Kai</h3>
              <p>Your personal companion is here to listen, judgment-free.</p> */}
            </div>
          </div>
          <Link to="/chat" className="btn no-hover start-chat-btn">
            {t("startConversation")}
          </Link>
        </div>

        {/* Recommended Activities */}
        <div className="activities-header">
          {/* <h3>Recommended Activities</h3> */}
          <h3>{t("recommendedActivities")}</h3>
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
            <h4>{t("mindfulGames")}</h4>
            <p>{t("mindfulGamesDesc")}</p>
            {/* <h4>Mindful Games</h4>
            <p>Play, Relax, Focus</p> */}
          </div>

          <div className="activity-card" onClick={() => navigate("/home/secret-journal")}>
            <div className="activity-icon icon-edit">
              <img src={journal} alt="" />
            </div>
            <h4>{t("secretJournal")}</h4>
            <p>{t("secretJournalDesc")}</p>
            {/* <h4>Your Secret Journal</h4>
            <p>Write Without Judgment</p> */}
          </div>

          <div
            className="activity-card"
            onClick={() => navigate("/home/moviesHome")}
          >
            <div
              className="activity-icon icon-movie"
              onClick={() => navigate("/home/moviesHome")}
            >
              <img src={movie} alt="" />
            </div>
            <h4>{t("movies")}</h4>
            <p>{t("moviesDesc")}</p>
            {/* <h4>Movies</h4>
            <p>Watch And Unwind</p> */}
          </div>

          <div
            className="activity-card"
            onClick={() => navigate("/home/musicHome")}
          >
            <div
              className="activity-icon icon-music"
              onClick={() => navigate("/home/moviesHome")}
            >
              <img src={calmMusic} alt="" />
            </div>
            <h4>{t("calmMusic")}</h4>
            <p>{t("calmMusicDesc")}</p>
            {/* <h4>Calm Music</h4>
            <p>Relax Through Sound</p> */}
          </div>

          <div
            className="activity-card"
            onClick={() => navigate("/home/wiseYogi")}
          >
            <div
              className="activity-icon icon-yoga"
              onClick={() => navigate("/home/wiseYogi")}
            >
              <img src={wiseYogi} alt="" />
            </div>
            <h4>{t("wiseYogi")}</h4>
            <p>{t("wiseYogiDesc")}</p>
            {/* <h4>Wise Yogi</h4>
            <p>Balance Mind & Body</p> */}
          </div>

          <div className="activity-card">
            <div className="activity-icon icon-health">
              <img src={health} alt="" />
            </div>
            <h4>{t("healthIsWealth")}</h4>
            <p>{t("healthDesc")}</p>
            {/* <h4>Health is Wealth</h4>
            <p>Care For Health</p> */}
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
            <h2 className="title">{t("meetKai")}</h2>
            <p className="sub-title">{t("kaiGuideDesc")}</p>
            {/* <h2 className="title">Meet Kai, your guide</h2>
            <p className="sub-title">
              We've selected a friendly companion for your journey.
            </p> */}

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
            <h2 className="title">{t("meetKai")}</h2>
            {/* <h2 className="title">Meet Kai, your guide</h2> */}
          </div>

          <div className="voice-option">
            <input type="radio" name="voice" defaultChecked />
            <span>{t("auraDefault")}</span>y{/* <span>Aura (Default)</span> */}
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


// import React from "react";
// import kaiImage from "../../assets/images/side-nav-bottom-image.png";
// import mindful from "../../assets/images/mindful.png";
// import journal from "../../assets/images/your-secret-jounal.png";
// import movie from "../../assets/images/movie.png";
// import calmMusic from "../../assets/images/clam-music.png";
// import wiseYogi from "../../assets/images/wise-yogi.png";
// import health from "../../assets/images/health-is-wealth.png";
// import offcanvasImg1 from "../../assets/images/offcanvas-image-one.svg";
// import offcanvasImg2 from "../../assets/images/offcanvas-image-two.svg";
// import playIcon from "../../assets/images/play-icon.png";
// import { Link, useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// const Home = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   const activities = [
//     { key: "mindfulGames",   descKey: "mindfulGamesDesc",  img: mindful,   route: "/home/mindfulGames",   color: "#7C3AED" },
//     { key: "secretJournal",  descKey: "secretJournalDesc", img: journal,   route: "/home/secret-journal", color: "#DB2777" },
//     { key: "movies",         descKey: "moviesDesc",         img: movie,     route: "/home/moviesHome",     color: "#EA580C" },
//     { key: "calmMusic",      descKey: "calmMusicDesc",      img: calmMusic, route: "/home/musicHome",      color: "#0891B2" },
//     { key: "wiseYogi",       descKey: "wiseYogiDesc",       img: wiseYogi,  route: "/home/wiseYogi",       color: "#059669" },
//     { key: "healthIsWealth", descKey: "healthDesc",         img: health,    route: null,                   color: "#D97706" },
//   ];

//   return (
//     <div
//     className="main-content"
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(160deg, #0f0225 0%, #1e0a4a 35%, #0f0225 100%)",
//         padding: "24px 16px 32px",
//         boxSizing: "border-box",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {/* ── Background glow blobs ── */}
//       <div style={{
//         position: "absolute", top: "-80px", left: "-60px",
//         width: "300px", height: "300px", borderRadius: "50%",
//         background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)",
//         pointerEvents: "none",
//       }} />
//       <div style={{
//         position: "absolute", top: "200px", right: "-80px",
//         width: "280px", height: "280px", borderRadius: "50%",
//         background: "radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)",
//         pointerEvents: "none",
//       }} />
//       <div style={{
//         position: "absolute", bottom: "100px", left: "20px",
//         width: "250px", height: "250px", borderRadius: "50%",
//         background: "radial-gradient(circle, rgba(109,40,217,0.3) 0%, transparent 70%)",
//         pointerEvents: "none",
//       }} />

//       {/* ── Greeting ── */}
//       <div style={{ position: "relative", zIndex: 1 }}>
//         <p style={{ color: "#c084fc", fontSize: "13px", margin: "0 0 2px", fontWeight: 400 }}>
//           Good morning,
//         </p>
//         <h2 style={{ color: "#ffffff", fontSize: "22px", fontWeight: 600, margin: "0 0 20px" }}>
//           Mahuya
//         </h2>

//         {/* ── Talk to Kai Card ── */}
//         <div
//           style={{
//             background: "rgba(139, 92, 246, 0.15)",
//             border: "1px solid rgba(167, 139, 250, 0.25)",
//             borderRadius: "20px",
//             padding: "18px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             marginBottom: "28px",
//             backdropFilter: "blur(16px)",
//             WebkitBackdropFilter: "blur(16px)",
//           }}
//         >
//           <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
//             <img
//               src={kaiImage}
//               alt="Kai"
//               style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover" }}
//             />
//             <div>
//               <h3 style={{ color: "#ffffff", fontSize: "15px", fontWeight: 600, margin: "0 0 4px" }}>
//                 {t("talkToKai")}
//               </h3>
//               <p style={{ color: "#c084fc", fontSize: "12px", margin: 0, lineHeight: 1.4 }}>
//                 {t("kaiDescription")}
//               </p>
//             </div>
//           </div>
//           <Link
//             to="/chat"
//             style={{
//               background: "linear-gradient(135deg, #7C3AED, #a855f7)",
//               color: "#ffffff",
//               padding: "8px 16px",
//               borderRadius: "20px",
//               fontSize: "12px",
//               fontWeight: 500,
//               textDecoration: "none",
//               whiteSpace: "nowrap",
//               flexShrink: 0,
//               marginLeft: "10px",
//             }}
//           >
//             {t("startConversation")}
//           </Link>
//         </div>

//         {/* ── Section Title ── */}
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
//           <h3 style={{ color: "#ffffff", fontSize: "16px", fontWeight: 600, margin: 0 }}>
//             {t("recommendedActivities")}
//           </h3>
//         </div>

//         {/* ── Activities Grid ── */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "1fr 1fr",
//             gap: "12px",
//           }}
//         >
//           {activities.map(({ key, descKey, img, route, color }) => (
//             <div
//               key={key}
//               onClick={() => route && navigate(route)}
//               style={{
//                 background: "rgba(255, 255, 255, 0.06)",
//                 border: "1px solid rgba(255, 255, 255, 0.1)",
//                 borderRadius: "16px",
//                 padding: "16px 14px",
//                 cursor: route ? "pointer" : "default",
//                 backdropFilter: "blur(12px)",
//                 WebkitBackdropFilter: "blur(12px)",
//                 transition: "transform 0.15s, background 0.15s",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = "rgba(255,255,255,0.11)";
//                 e.currentTarget.style.transform = "scale(1.02)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "rgba(255,255,255,0.06)";
//                 e.currentTarget.style.transform = "scale(1)";
//               }}
//             >
//               <div
//                 style={{
//                   width: "44px",
//                   height: "44px",
//                   borderRadius: "14px",
//                   background: `${color}22`,
//                   border: `1.5px solid ${color}55`,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   marginBottom: "10px",
//                 }}
//               >
//                 <img src={img} alt={key} style={{ width: "26px", height: "26px", objectFit: "contain" }} />
//               </div>
//               <h4 style={{ color: "#ffffff", fontSize: "13px", fontWeight: 600, margin: "0 0 4px" }}>
//                 {t(key)}
//               </h4>
//               <p style={{ color: "#a78bfa", fontSize: "11px", margin: 0, lineHeight: 1.4 }}>
//                 {t(descKey)}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ── Offcanvas 1 ── */}
//       <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight">
//         <div className="offcanvas-body">
//           <div className="text-center mb-4">
//             <h2 className="title">{t("meetKai")}</h2>
//             <p className="sub-title">{t("kaiGuideDesc")}</p>
//             <img src={offcanvasImg1} alt="" />
//           </div>
//         </div>
//       </div>

//       {/* ── Offcanvas 2 ── */}
//       <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRightSecond">
//         <div className="offcanvas-body">
//           <div className="text-center mb-4 mt-4">
//             <img src={offcanvasImg2} alt="" />
//             <h2 className="title">{t("meetKai")}</h2>
//           </div>
//           <div className="voice-option">
//             <input type="radio" name="voice" defaultChecked />
//             <span>{t("auraDefault")}</span>
//             <button>
//               <img src={playIcon} alt="" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;