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
import { useTranslation } from "react-i18next";

/* ── helpers ───────────────────────────────────────────────────────── */
const fmtDuration = (min) => {
  if (!min && min !== 0) return "—";
  if (min < 1) return `${Math.round(min * 60)} sec`;
  return `${min} min`;
};

// const formatDate = (iso) =>
//   new Date(iso).toLocaleDateString("en-IN", {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });

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
  const { t } = useTranslation
  ();

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

  return (
    <>
      <div className="main-content">
        <div className="wy-wrap">
          {/* Page Header */}
          <div className="wy-page-header">
            <div>
              <h2 className="wy-page-title">{t("wiseYogi")}</h2>
              <p className="wy-page-sub">
                {t("wiseYogiSubtitle")}
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
              <p>{t("preparingPractice")}</p>
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="wy-error">
              <div className="wy-error-icon">🧘</div>
              <h3>{t("couldNotLoadExercises")}</h3>
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
                {t("tryAgain")}
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && !recommendation && (
            <div className="wy-empty">
              <div className="wy-empty-icon">🧘</div>
              <h3>{t("noPracticeFound")}</h3>
              <p>
                {t("noPracticeFoundDesc")}
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
                  <h3>{t("todaysPractice")}</h3>
                  {/* <p>
                    {totalDone} of {totalCount} exercises completed
                  </p> */}
                  <p>{t("exercisesCompleted", { done: totalDone, total: totalCount })}</p>
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
                      {t("sessionComplete")}
                    </div>
                  )}
                </div>
              </div>

              {/* Celebration */}
              {allDone && (
                <div className="wy-celebration">
                  <span className="wy-celebration-emoji">🎉</span>
                  <h3>{t("wonderfulPracticeToday")}</h3>
                  <p>
                    {t("practiceCompleteDesc")}
                  </p>
                </div>
              )}

              <h4 className="wy-intro-text">
                {t("astangaIntro")}
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
                          {t("done")}
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
                              {ex.steps?.length ?? 0} {t("steps")}
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
                              {t("doThisNow")}
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
                            {t("completed")}
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
                            {isCompleting ? t("marking") : t("markComplete")}
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
