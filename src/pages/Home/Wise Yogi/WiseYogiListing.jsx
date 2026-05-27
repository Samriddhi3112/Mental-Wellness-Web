// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchWiseYogi } from "../../../features/home/wise yogi/wiseYogiSlice";
// import { useNavigate } from "react-router-dom";
// import img from "../../../assets/images/wise-yogi-one.png"

// const WiseYogiListing = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { wiseYogi, loading } = useSelector((state) => state.wiseYogi);

//   useEffect(() => {
//     dispatch(fetchWiseYogi());
//   }, [dispatch]);

//   return (
//     <div className="main-content">
//       <div className="row wise-yogi">
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           (wiseYogi || []).map((item) => (
//             <div className="col-md-2" key={item._id}>

//               <a
//                 onClick={(e) => {
//                   e.preventDefault();
//                   navigate("/home/wiseyogiHome/wiseyogiDetail", {
//                     state: { data: item },
//                   });
//                 }}
//                 href="#"
//               >
//                 <div className="icon">
//                   <img
//                     src={item?.thumbnail || {img}}
//                     alt=""
//                   />
//                 </div>

//                 <h4>{item?.title || item?.activityName}</h4>

//                 <p>
//                   {item?.duration
//                     ? `${item.duration} min`
//                     : "10 min"}
//                 </p>
//               </a>

//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default WiseYogiListing;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWiseYogiRecommendations,
  markExerciseDone,
} from "../../../features/home/wise yogi/wiseYogiSlice";

/* ── helpers ───────────────────────────────────────────────────────── */
const fmtDuration = (min) => {
  if (!min && min !== 0) return "—";
  if (min < 1) return `${Math.round(min * 60)} sec`;
  return `${min} min`;
};

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/* ── yoga pose icons ───────────────────────────────────────────────── */
const YogaIcon = ({ index, done }) => {
  const icons = [
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key="0"
    >
      <circle cx="24" cy="10" r="5" fill="currentColor" opacity="0.9" />
      <path
        d="M24 15 L24 28 M16 20 L32 20 M24 28 L16 40 M24 28 L32 40"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>,
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key="1"
    >
      <circle cx="24" cy="10" r="5" fill="currentColor" opacity="0.9" />
      <path
        d="M24 15 L24 26 M16 19 L32 19 M24 26 Q20 34 12 38 M24 26 Q28 34 36 38 M12 38 L36 38"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>,
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key="2"
    >
      <circle cx="24" cy="10" r="5" fill="currentColor" opacity="0.9" />
      <path
        d="M24 15 L24 28 M24 28 Q14 24 10 32 M24 28 Q34 24 38 32 M10 32 Q16 36 24 34 Q32 36 38 32"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>,
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key="3"
    >
      <circle cx="24" cy="9" r="5" fill="currentColor" opacity="0.9" />
      <path
        d="M24 14 L24 27 M14 18 L34 18 M24 27 L16 40 M24 27 L32 40"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>,
  ];
  return icons[index % icons.length];
};

/* ═══════════════════════════════════════════════════════════════════ */
export default function WiseYogiListing() {
  const dispatch = useDispatch();

  // ── slice state (matches your actual slice) ──
  const { recommendations, loading, error, doneLoading } = useSelector(
    (s) => s.wiseYogi,
  );

  // const [expandedId, setExpandedId] = useState(null);
  const [completingId, setCompletingId] = useState(null);

  useEffect(() => {
    dispatch(getWiseYogiRecommendations());
  }, [dispatch]);

  // API returns array — take latest recommendation
  const recommendation = recommendations?.data?.recommendation ?? null;
  const exercises = recommendation?.exercises ?? [];
  const totalDone = exercises.filter((e) => e.done).length;
  const totalCount = exercises.length;
  const allDone = totalCount > 0 && totalDone === totalCount;
  const progressPct = totalCount
    ? Math.round((totalDone / totalCount) * 100)
    : 0;

  const handleComplete = async (exerciseId) => {
    if (!recommendation?._id || completingId) return;

    setCompletingId(exerciseId);

    try {
      await dispatch(
        markExerciseDone({
          recommendationId: recommendation._id,
          exerciseId,
          done: true,
        }),
      );
    } finally {
      setCompletingId(null);
    }
  };

  // const handleComplete = (exerciseId) => {
  //   if (!recommendation?._id || doneLoading) return;
  //   setCompletingId(exerciseId);
  //   dispatch(
  //     markExerciseDone({
  //       recommendationId: recommendation._id,
  //       exerciseId,
  //       done: true,
  //     })
  //   ).finally(() => setCompletingId(null));
  // };

  /* ── CSS ─────────────────────────────────────────────────────────── */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');
.wy-card-title-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 0.55rem;
}

.wy-card-description {
  font-size: 0.9rem;
  line-height: 1.7;
  color: #697089;
  margin-top: 0.55rem;
  max-width: 92%;
}

.wy-card-sanskrit {
  font-size: 1rem;
  font-weight: 700;
  color: #030f25;
  line-height: 1.2;
  margin-bottom: 0.1rem;
}

.wy-card-name {
  font-size: 1.18rem;
  font-weight: 650;
  color: #1f2437;
  margin: 0;
  line-height: 1.3;
}
  .wy-intro-text {
  font-size: 0.95rem;
  font-weight: 500;
  color: black;
  line-height: 1.7;
  margin: 0 0 1.4rem;
  padding: 0 0.2rem;
}
    .wy-wrap {
      // font-family: 'DM Sans', sans-serif;
      padding: 2rem 2.5rem;
      min-height: 100vh;
      background: #f4f5f9;
    }

    /* page header */
    .wy-page-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 2rem;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .wy-page-title {
      // font-family: 'Playfair Display', serif;
      font-size: 1.75rem;
      color: #1a1f36;
      margin: 0 0 0.25rem;
      line-height: 1.25;
    }
    .wy-page-sub { font-size: 0.82rem; color: #8a94ab; margin: 0; }
    .wy-date-badge {
      background: #fff;
      border: 1.5px solid #eef0f7;
      border-radius: 30px;
      padding: 0.4rem 1rem;
      font-size: 0.76rem;
      color: #8a94ab;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      box-shadow: 0 1px 4px rgba(30,40,90,0.06);
    }

    /* progress card */
    .wy-progress-card {
      background: linear-gradient(135deg, #1a1f36 0%, #2d3561 100%);
      border-radius: 16px;
      padding: 1.4rem 1.8rem;
      margin-bottom: 1.8rem;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      flex-wrap: wrap;
      box-shadow: 0 8px 30px rgba(26,31,54,0.2);
      position: relative;
      overflow: hidden;
    }
    .wy-progress-card::before {
      content: '';
      position: absolute;
      top: -30px; right: -30px;
      width: 160px; height: 160px;
      background: rgba(242,101,34,0.08);
      border-radius: 50%;
    }
    .wy-progress-ring-wrap { position: relative; flex-shrink: 0; }
    .wy-progress-ring { transform: rotate(-90deg); }
    .wy-progress-ring-bg { fill: none; stroke: rgba(255,255,255,0.1); stroke-width: 5; }
    .wy-progress-ring-fill {
      fill: none;
      stroke: #030f25;
      stroke-width: 5;
      stroke-linecap: round;
      stroke-dasharray: 163;
      stroke-dashoffset: calc(163 - (163 * var(--pct) / 100));
      transition: stroke-dashoffset 0.8s cubic-bezier(.4,0,.2,1);
    }
    .wy-ring-label {
      position: absolute; inset: 0;
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem; font-weight: 700; color: #fff;
    }
    .wy-progress-text { flex: 1; }
    .wy-progress-text h3 {
      // font-family: 'Playfair Display', serif;
      font-size: 1.15rem; color: #fff; margin: 0 0 0.3rem;
    }
    .wy-progress-text p { font-size: 0.8rem; color: rgba(255,255,255,0.55); margin: 0 0 0.8rem; }
    .wy-prog-bar-track {
      height: 5px; background: rgba(255,255,255,0.12);
      border-radius: 10px; overflow: hidden;
    }
    .wy-prog-bar-fill {
      height: 100%;
      background: linear-gradient(135deg, #462297, #7631B2);
      border-radius: 10px;
      width: calc(var(--pct) * 1%);
      transition: width 0.8s cubic-bezier(.4,0,.2,1);
    }
    .wy-all-done-badge {
      display: flex; align-items: center; gap: 0.4rem;
      background: rgba(76,175,80,0.15);
      border: 1px solid rgba(76,175,80,0.3);
      color: #81c784; padding: 0.35rem 0.9rem;
      border-radius: 30px; font-size: 0.76rem; font-weight: 600;
      margin-top: 0.6rem; width: fit-content;
    }

    /* exercise list */
    .wy-list { display: flex; flex-direction: column; gap: 1rem; }

    /* card */
    .wy-card {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 2px 12px rgba(30,40,90,0.06);
      border: 1.5px solid transparent;
      transition: border-color .25s, box-shadow .25s, transform .2s, opacity .3s;
      overflow: hidden;
      position: relative;
      border: 1px solid #030f2524;
background: linear-gradient(180deg, #ffffff 0%, #fffdfb 100%);
    }
    .wy-card:not(.wy-card--done):hover {
      border-color: 1px solid #030f2524;
      box-shadow: 0 8px 28px #030f25b0;
      transform: translateY(-2px);
    }
    .wy-card--done { opacity: 0.72; background: #fafbfe; }
    .wy-card--done .wy-card-inner { filter: grayscale(0.15); }
    .wy-card--completing { animation: wyPulse 0.6s ease; }
    @keyframes wyPulse {
      0%   { box-shadow: 0 0 0 0 rgba(242,101,34,0.35); }
      50%  { box-shadow: 0 0 0 12px rgba(242,101,34,0); transform: scale(1.008); }
      100% { box-shadow: 0 0 0 0 rgba(242,101,34,0); transform: scale(1); }
    }

    .wy-done-ribbon {
      position: absolute; top: 0; right: 0;
      background: linear-gradient(135deg, #4caf50, #66bb6a);
      color: #fff; font-size: 0.65rem; font-weight: 700;
      letter-spacing: 0.06em; padding: 4px 12px 4px 8px;
      border-bottom-left-radius: 10px;
      display: flex; align-items: center; gap: 4px;
    }

    .wy-card-inner {
  padding: 1.35rem 1.5rem 1rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

    .wy-card-icon {
      width: 52px; height: 52px; flex-shrink: 0;
      border-radius: 12px; display: flex;
      align-items: center; justify-content: center;
      background:linear-gradient(135deg, #462297, #7631B2);
      color: #030f25; transition: background .3s;
    }
    .wy-card--done .wy-card-icon {
      background: linear-gradient(135deg, #f0f4f0, #e0eee0);
      color: #66bb6a;
    }
    .wy-card-icon svg { width: 32px; height: 32px; }

    .wy-card-content { flex: 1; min-width: 0; }
    .wy-card-name {
      // font-family: 'Playfair Display', serif;
      font-size: 1.05rem; color: #1a1f36; margin: 0 0 0.4rem; line-height: 1.3;
    }
    .wy-card--done .wy-card-name { text-decoration: line-through; color: #8a94ab; }

    .wy-card-meta {
      display: flex; align-items: center; gap: 0.6rem;
      margin-bottom: 0.6rem; flex-wrap: wrap;
    }
    .wy-pill {
      display: flex; align-items: center; gap: 0.3rem;
      background: #f4f5f9; color: #6b7694;
      font-size: 0.72rem; font-weight: 500;
      padding: 3px 9px; border-radius: 20px;
    }
    .wy-pill svg { opacity: 0.6; }

    .wy-steps-toggle {
      background: none; border: none; cursor: pointer;
      // font-family: 'DM Sans', sans-serif;
      font-size: 0.78rem; font-weight: 600; color: #030f25;
      padding: 0; display: flex; align-items: center; gap: 0.3rem;
      transition: opacity .15s;
    }
    .wy-steps-toggle:hover { opacity: 0.7; }
    .wy-card--done .wy-steps-toggle { color: #8a94ab; }

    .wy-steps { overflow: hidden; max-height: 0; transition: max-height 0.35s cubic-bezier(.4,0,.2,1); }
    .wy-steps--open { max-height: 400px; }
    .wy-steps-inner {
      margin-top: 0.7rem; padding: 0.9rem 1rem;
      background: #030f25; border-radius: 10px;
      display: flex; flex-direction: column; gap: 0.55rem;
    }
    .wy-step {
      display: flex; gap: 0.7rem; align-items: flex-start;
      font-size: 0.82rem; color: #fff; line-height: 1.5;
    }
    .wy-step-num {
      width: 20px; height: 20px; background: #fff;
      border: 1.5px solid #e4e7f0; border-radius: 50%;
      font-size: 0.65rem; font-weight: 700; color: #030f25;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .wy-card--done .wy-step-num { color: #66bb6a; }

    .wy-card-actions {
  padding: 0 1.5rem 1.4rem;
  display: flex;
  justify-content: flex-end;
  margin-top: 0.2rem;
}
    .btn-complete {
      display: flex; align-items: center; gap: 0.5rem;
      background: linear-gradient(135deg, #462297, #7631B2); color: #fff; border: none;
      padding: 0.55rem 1.2rem; border-radius: 30px;
      font-size: 0.82rem; font-weight: 600; cursor: pointer;
      // font-family: 'DM Sans', sans-serif;
      box-shadow: 0 3px 10px rgba(242,101,34,0.28);
      transition: background .2s, transform .15s, box-shadow .2s;
    }
    .btn-complete:hover:not(:disabled) {
      background: linear-gradient(135deg, #462297, #7631B2); transform: translateY(-1px);
      box-shadow: 0 5px 16px rgba(242,101,34,0.35);
    }
    .btn-complete:disabled { opacity: 0.65; cursor: not-allowed; }
    .btn-complete:active:not(:disabled) { transform: scale(0.97); }

    .wy-done-label {
      display: flex; align-items: center; gap: 0.4rem;
      font-size: 0.82rem; font-weight: 600; color: #66bb6a; padding: 0.55rem 0;
    }

    /* loading */
    .wy-loading {
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 5rem 1rem; gap: 1rem;
    }
    .wy-spinner {
      width: 44px; height: 44px;
      border: 3px solid #eef0f7; border-top-color: #030f25;
      border-radius: 50%; animation: wySpin 0.8s linear infinite;
    }
    @keyframes wySpin { to { transform: rotate(360deg); } }
    .wy-loading p { font-size: 0.85rem; color: #8a94ab; margin: 0; }

    /* error */
    .wy-error { text-align: center; padding: 4rem 1rem; }
    .wy-error-icon { font-size: 2.5rem; margin-bottom: 0.8rem; }
    .wy-error h3 { font-family: 'Playfair Display', serif; color: #1a1f36; margin: 0 0 0.4rem; }
    .wy-error p { font-size: 0.82rem; color: #8a94ab; margin: 0 0 1.2rem; }
    .btn-retry {
      background: #030f25; color: #fff; border: none;
      padding: 0.6rem 1.4rem; border-radius: 10px;
      font-size: 0.88rem; font-weight: 600; cursor: pointer;
      // font-family: 'DM Sans', sans-serif;
    }

    /* empty */
    .wy-empty { text-align: center; padding: 4rem 1rem; }
    .wy-empty-icon { font-size: 2.8rem; margin-bottom: 0.8rem; }
    .wy-empty h3 { font-family: 'Playfair Display', serif; color: #1a1f36; margin: 0 0 0.4rem; }
    .wy-empty p { font-size: 0.82rem; color: #8a94ab; margin: 0; }

    /* celebration */
    .wy-celebration {
      text-align: center; padding: 1.5rem 1rem 1rem;
      background: #fff; border-radius: 16px;
      box-shadow: 0 2px 12px rgba(30,40,90,0.06);
      margin-bottom: 1rem;
      animation: wyCelebrate 0.5s ease;
    }
      
    @keyframes wyCelebrate {
      0% { opacity: 0; transform: translateY(12px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .wy-celebration-emoji { font-size: 2.5rem; display: block; margin-bottom: 0.5rem; }
    .wy-celebration h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem; color: #1a1f36; margin: 0 0 0.3rem;
    }
    .wy-celebration p { font-size: 0.82rem; color: #8a94ab; margin: 0; }

    @media (max-width: 600px) {
      .wy-wrap { padding: 1.2rem 1rem; }
      .wy-card-inner { gap: 0.8rem; }
      .wy-card-icon { width: 42px; height: 42px; }
      .wy-card-icon svg { width: 26px; height: 26px; }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="main-content">
        <div className="wy-wrap">
          {/* Page Header */}
          <div className="wy-page-header">
            <div>
              <h2 className="wy-page-title">Wise Yogi</h2>
              <p className="wy-page-sub">
                Balance your mind & body with today's personalised practice.
              </p>
            </div>
            {/* {recommendation?.generatedAt && (
              <div className="wy-date-badge">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {formatDate(recommendation.generatedAt)}
              </div>
            )} */}
          </div>

          {/* Loading state */}
          {loading && (
            <div className="wy-loading">
              <div className="wy-spinner" />
              <p>Preparing your practice…</p>
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="wy-error">
              <div className="wy-error-icon">🧘</div>
              <h3>Could not load exercises</h3>
              <p>
                {typeof error === "string"
                  ? error
                  : error?.message ||
                    "Please check your connection and try again."}
              </p>
              <button
                className="btn-retry"
                onClick={() => dispatch(getWiseYogiRecommendations())}
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && !recommendation && (
            <div className="wy-empty">
              <div className="wy-empty-icon">🧘</div>
              <h3>No practice found</h3>
              <p>
                Your personalised yoga plan will appear here once generated.
              </p>
            </div>
          )}

          {/* Main content */}
          {!loading && !error && recommendation && (
            <>
              {/* Progress Card */}
              <div
                className="wy-progress-card"
                style={{ "--pct": progressPct }}
              >
                <div className="wy-progress-ring-wrap">
                  <svg width="64" height="64" className="wy-progress-ring">
                    <circle
                      className="wy-progress-ring-bg"
                      cx="32"
                      cy="32"
                      r="26"
                    />
                    <circle
                      className="wy-progress-ring-fill"
                      cx="32"
                      cy="32"
                      r="26"
                    />
                  </svg>
                  <div className="wy-ring-label">{progressPct}%</div>
                </div>
                <div className="wy-progress-text">
                  <h3>Today's Practice</h3>
                  <p>
                    {totalDone} of {totalCount} exercises completed
                  </p>
                  <div className="wy-prog-bar-track">
                    <div
                      className="wy-prog-bar-fill"
                      style={{ "--pct": progressPct }}
                    />
                  </div>
                  {allDone && (
                    <div className="wy-all-done-badge">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Session Complete!
                    </div>
                  )}
                </div>
              </div>

              {/* Celebration */}
              {allDone && (
                <div className="wy-celebration">
                  <span className="wy-celebration-emoji">🎉</span>
                  <h3>Wonderful practice today!</h3>
                  <p>
                    You've completed all your yoga exercises. Your body and mind
                    thank you.
                  </p>
                </div>
              )}

              <h4 className="wy-intro-text">
                From the Astanga Sutra, these are the 3 most suitable small
                practices for you right now:
              </h4>

              {/* Exercise List */}
              <div className="wy-list">
                {exercises.map((ex, idx) => {
                  // const isOpen = expandedId === ex.exerciseId;
                  const isCompleting = completingId === ex.exerciseId;

                  return (
                    <div
                      key={ex.exerciseId || ex._id || idx}
                      className={[
                        "wy-card",
                        ex.done ? "wy-card--done" : "",
                        isCompleting ? "wy-card--completing" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {ex.done && (
                        <div className="wy-done-ribbon">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          DONE
                        </div>
                      )}

                      <div className="wy-card-inner">
                        {/* Icon */}
                        <div className="wy-card-icon">
                          <YogaIcon index={idx} done={ex.done} />
                        </div>

                        {/* Content */}
                        <div className="wy-card-content">
                          <div className="wy-card-title-wrap">
                            {ex.sanskrit_name?.length > 0 && (
                              <div className="wy-card-sanskrit">
                                {ex.sanskrit_name.join(", ")}
                              </div>
                            )}

                            <h3 className="wy-card-name">{ex.name}</h3>
                            {ex.description && (
                              <p className="wy-card-description">
                                {ex.description}
                              </p>
                            )}
                          </div>
                          {/* <h3 className="wy-card-name">{ex.name}</h3> */}

                          <div className="wy-card-meta">
                            <span className="wy-pill">
                              <svg
                                width="11"
                                height="11"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              {fmtDuration(ex.durationMinutes)}
                            </span>
                            <span className="wy-pill">
                              <svg
                                width="11"
                                height="11"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                              </svg>
                              {ex.steps?.length ?? 0} steps
                            </span>
                          </div>

                          {/* Steps toggle */}
                          {ex.steps?.length > 0 && (
                            <div className="wy-steps-toggle">
                              {/* <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg> */}
                              Do this Now
                            </div>
                          )}

                          {/* Steps accordion */}
                          <div className="wy-steps wy-steps--open">
                            <div className="wy-steps-inner">
                              {ex.steps?.map((step, si) => (
                                <div key={si} className="wy-step">
                                  <span className="wy-step-num">{si + 1}</span>
                                  <span>{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action row */}
                      <div className="wy-card-actions">
                        {ex.done ? (
                          <div className="wy-done-label">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                              <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            Completed
                          </div>
                        ) : (
                          <button
                            className="btn-complete"
                            onClick={() => handleComplete(ex.exerciseId)}
                            disabled={isCompleting}
                            // disabled={isCompleting || doneLoading}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {isCompleting ? "Marking…" : "Mark Complete"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
