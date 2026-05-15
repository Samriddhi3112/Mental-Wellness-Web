import React, { useEffect } from "react";
import { getTermsConditions } from "../../features/services/serviceSlice";
import { useDispatch, useSelector } from "react-redux";

const LoginTermsOfServices = () => {
  const dispatch = useDispatch();
  const { termsConditions, loading } = useSelector(
    (state) => state.services || {},
  );
  console.log(termsConditions);

  useEffect(() => {
    dispatch(getTermsConditions());
  }, []);

  return (
    <div>
      <div className="main-content-login">
        <div className="document-container">
          <div className="document-card">
            <div className="document-header">
              <div className="document-label">Agreement</div>
              <h1 className="document-title">
                {termsConditions?.data.title || "Privacy Policy"}
              </h1>
              <div className="document-date">
                Last updated on{" "}
                {termsConditions?.data.updatedAt
                  ? new Date(termsConditions.data.updatedAt).toLocaleDateString()
                  : "-"}
              </div>
            </div>
            <div className="document-section">
              <p className="section-content">{termsConditions?.data.content || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h3 className="offcanvas-title" id="offcanvasRightLabel" />
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <div className="px-4">
            <div className="text-center mb-4">
              <p className="mini-sub-title mb-4 pb-3">Your Companion</p>
              <h2 className="title">Meet Kai, your guide</h2>
              <p className="sub-title">
                We've selected a friendly companion for your journey. You can
                change this anytime in settings.
              </p>
              <img src="images/offcanvas-image-one.svg" alt />
            </div>
          </div>
        </div>
        <div className="notification-footer border-top">
          <div className="text-center">
            <button
              className="btn-primary-orange mb-3"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRightSecond"
              aria-controls="offcanvasRight"
            >
              Continue
            </button>
            <button className="btn-secondary">Change Avatar</button>
          </div>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasRightSecond"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h3 className="offcanvas-title" id="offcanvasRightLabel" />
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <div className="px-2">
            <div className="text-center mb-4 mt-4">
              <img src="images/offcanvas-image-two.svg" alt />
              <h2 className="title">Meet Kai, your guide</h2>
              <p className="sub-title">
                Customize your companion's voice and language.
              </p>
            </div>
            <form>
              {/* Voice Selection */}
              <div className="mb-4">
                <label className="form-label">Companion's Voice</label>
                <div className="voice-option active">
                  <div className="d-flex align-items-center gap-3">
                    <input
                      type="radio"
                      name="voice"
                      defaultValue="aura"
                      defaultChecked
                      className="form-check-input m-0"
                      style={{ cursor: "pointer" }}
                    />
                    <span>Aura (Default)</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#FF5722",
                    }}
                  >
                    <img src="images/play-icon.png" alt />
                  </button>
                </div>
                <div className="voice-option">
                  <div className="d-flex align-items-center gap-3">
                    <input
                      type="radio"
                      name="voice"
                      defaultValue="echo"
                      className="form-check-input m-0"
                      style={{ cursor: "pointer" }}
                    />
                    <span>Echo</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#FF5722",
                    }}
                  >
                    <img src="images/play-icon.png" alt />
                  </button>
                </div>
                <div className="voice-option">
                  <div className="d-flex align-items-center gap-3">
                    <input
                      type="radio"
                      name="voice"
                      defaultValue="nova"
                      className="form-check-input m-0"
                      style={{ cursor: "pointer" }}
                    />
                    <span>Nova</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#FF5722",
                    }}
                  >
                    <img src="images/play-icon.png" alt />
                  </button>
                </div>
              </div>
              {/* Language Selection */}
              <div className="mb-4">
                <label className="form-label">Language</label>
                <select className="form-control">
                  <option selected>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Hindi</option>
                </select>
              </div>
              {/* Background Music Toggle */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center form-control">
                  <div>
                    <div className="form-label mb-1">Background Music</div>
                    <small className="text-muted" style={{ fontSize: 13 }}>
                      Calm music during sessions
                    </small>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="bgMusic"
                      defaultChecked
                      style={{ width: 50, height: 26, cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="notification-footer border-top">
          <div className="text-center">
            <button type="button" className="btn-primary-orange">
              Save &amp; Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTermsOfServices;
// import React, { useEffect } from "react";
// import { getTermsConditions } from "../../features/services/serviceSlice";
// import { useDispatch, useSelector } from "react-redux";

// const LoginTermsOfServices = () => {
//   const dispatch = useDispatch();
//   const { termsConditions, loading } = useSelector(
//     (state) => state.services || {},
//   );

//   useEffect(() => {
//     dispatch(getTermsConditions());
//   }, []);

//   const data = termsConditions?.data;

//   const css = `
//     @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500;600&display=swap');

//     .tos-wrap {
//       font-family: 'DM Sans', sans-serif;
//       min-height: 100vh;
//       background: #f4f5f9;
//       display: flex;
//       align-items: flex-start;
//       justify-content: center;
//       padding: 3rem 1.5rem;
//     }

//     /* ── card ── */
//     .tos-card {
//       background: #fff;
//       border-radius: 20px;
//       box-shadow: 0 4px 32px rgba(26,31,54,0.10);
//       width: 100%;
//       max-width: 760px;
//       overflow: hidden;
//     }

//     /* ── hero header ── */
//     .tos-hero {
//       background: linear-gradient(135deg, #1a1f36 0%, #2d3561 100%);
//       padding: 2.5rem 2.5rem 2rem;
//       position: relative;
//       overflow: hidden;
//     }
//     .tos-hero::before {
//       content: '';
//       position: absolute;
//       top: -40px; right: -40px;
//       width: 200px; height: 200px;
//       background: rgba(242,101,34,0.08);
//       border-radius: 50%;
//     }
//     .tos-hero::after {
//       content: '';
//       position: absolute;
//       bottom: -60px; left: -30px;
//       width: 160px; height: 160px;
//       background: rgba(255,255,255,0.03);
//       border-radius: 50%;
//     }
//     .tos-badge {
//       display: inline-flex;
//       align-items: center;
//       gap: 0.4rem;
//       background: rgba(242,101,34,0.15);
//       border: 1px solid rgba(242,101,34,0.3);
//       color: #ff8c42;
//       font-size: 0.72rem;
//       font-weight: 600;
//       letter-spacing: 0.06em;
//       text-transform: uppercase;
//       padding: 4px 12px;
//       border-radius: 20px;
//       margin-bottom: 1rem;
//     }
//     .tos-title {
//       font-family: 'Playfair Display', serif;
//       font-size: 1.9rem;
//       color: #fff;
//       margin: 0 0 0.8rem;
//       line-height: 1.25;
//       position: relative;
//     }
//     .tos-meta {
//       display: flex;
//       align-items: center;
//       gap: 1.2rem;
//       flex-wrap: wrap;
//     }
//     .tos-meta-item {
//       display: flex;
//       align-items: center;
//       gap: 0.4rem;
//       font-size: 0.76rem;
//       color: rgba(255,255,255,0.5);
//     }
//     .tos-meta-item svg { opacity: 0.6; }

//     /* ── content area ── */
//     .tos-body {
//       padding: 2rem 2.5rem 2.5rem;
//     }

//     /* ── loading ── */
//     .tos-loading {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       justify-content: center;
//       padding: 4rem 1rem;
//       gap: 1rem;
//     }
//     .tos-spinner {
//       width: 40px; height: 40px;
//       border: 3px solid #eef0f7;
//       border-top-color: #f26522;
//       border-radius: 50%;
//       animation: tosSpin 0.8s linear infinite;
//     }
//     @keyframes tosSpin { to { transform: rotate(360deg); } }
//     .tos-loading p { font-size: 0.84rem; color: #8a94ab; margin: 0; }

//     /* ── prose content ── */
//     .tos-content {
//       font-size: 0.92rem;
//       color: #4a5270;
//       line-height: 1.85;
//       white-space: pre-wrap;
//       word-break: break-word;
//     }

//     /* ── empty ── */
//     .tos-empty {
//       text-align: center;
//       padding: 3rem 1rem;
//       color: #8a94ab;
//       font-size: 0.88rem;
//     }

//     /* ── footer strip ── */
//     .tos-footer {
//       border-top: 1px solid #f0f1f8;
//       padding: 1.2rem 2.5rem;
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       gap: 1rem;
//       flex-wrap: wrap;
//       background: #fafbfe;
//     }
//     .tos-footer-note {
//       display: flex;
//       align-items: center;
//       gap: 0.4rem;
//       font-size: 0.75rem;
//       color: #b0b8d0;
//     }
//     .tos-footer-logo {
//       font-family: 'Playfair Display', serif;
//       font-size: 0.9rem;
//       color: #c8cfe0;
//       letter-spacing: 0.02em;
//     }

//     /* ── offcanvas overrides (Serene theme) ── */
//     .offcanvas {
//       border-left: none !important;
//       border-radius: 20px 0 0 20px;
//       box-shadow: -8px 0 40px rgba(26,31,54,0.15);
//       font-family: 'DM Sans', sans-serif;
//       max-width: 400px;
//     }
//     .offcanvas-header {
//       padding: 1.2rem 1.5rem 0;
//       border-bottom: none;
//     }
//     .offcanvas-body { padding: 1rem 1.5rem; }

//     .oc-section { text-align: center; padding: 1.5rem 0.5rem; }
//     .oc-chip {
//       display: inline-block;
//       background: #fff4ee;
//       color: #f26522;
//       font-size: 0.72rem;
//       font-weight: 600;
//       letter-spacing: 0.05em;
//       text-transform: uppercase;
//       padding: 4px 12px;
//       border-radius: 20px;
//       margin-bottom: 1rem;
//     }
//     .oc-title {
//       font-family: 'Playfair Display', serif;
//       font-size: 1.3rem;
//       color: #1a1f36;
//       margin: 0 0 0.6rem;
//     }
//     .oc-sub {
//       font-size: 0.82rem;
//       color: #8a94ab;
//       line-height: 1.6;
//       margin: 0 0 1.5rem;
//     }
//     .oc-img { max-width: 180px; width: 100%; margin: 0 auto 1.5rem; display: block; }

//     /* voice options */
//     .oc-voice-option {
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       padding: 0.75rem 1rem;
//       border: 1.5px solid #eef0f7;
//       border-radius: 10px;
//       margin-bottom: 0.5rem;
//       cursor: pointer;
//       transition: border-color .18s, background .18s;
//       font-size: 0.88rem;
//       color: #3a4060;
//     }
//     .oc-voice-option:hover { border-color: #f2652244; background: #fff9f6; }
//     .oc-voice-option.active { border-color: #f26522; background: #fff4ee; }
//     .oc-voice-left { display: flex; align-items: center; gap: 0.7rem; }
//     .oc-voice-left input[type="radio"] { accent-color: #f26522; width: 16px; height: 16px; cursor: pointer; }
//     .oc-play-btn {
//       background: none; border: none; cursor: pointer;
//       padding: 4px; border-radius: 6px;
//       transition: background .15s;
//       display: flex; align-items: center;
//     }
//     .oc-play-btn:hover { background: #f0f1f6; }
//     .oc-play-btn img { width: 20px; height: 20px; }

//     /* form controls */
//     .oc-label {
//       display: block;
//       font-size: 0.78rem;
//       font-weight: 600;
//       color: #5a6282;
//       margin-bottom: 0.5rem;
//       letter-spacing: 0.03em;
//       text-transform: uppercase;
//     }
//     .oc-select {
//       width: 100%;
//       border: 1.5px solid #e4e7f0;
//       border-radius: 10px;
//       padding: 0.65rem 0.9rem;
//       font-size: 0.88rem;
//       font-family: 'DM Sans', sans-serif;
//       color: #1a1f36;
//       background: #fafbfe;
//       outline: none;
//       cursor: pointer;
//       transition: border-color .18s;
//       appearance: none;
//       background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24' stroke='%238a94ab' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
//       background-repeat: no-repeat;
//       background-position: right 0.9rem center;
//       padding-right: 2.2rem;
//     }
//     .oc-select:focus { border-color: #f26522; }

//     .oc-toggle-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       border: 1.5px solid #e4e7f0;
//       border-radius: 10px;
//       padding: 0.75rem 1rem;
//       background: #fafbfe;
//     }
//     .oc-toggle-label { font-size: 0.88rem; color: #1a1f36; font-weight: 500; margin-bottom: 0.15rem; }
//     .oc-toggle-sub { font-size: 0.75rem; color: #8a94ab; }
//     .oc-toggle-row .form-check-input { width: 46px; height: 24px; cursor: pointer; }
//     .oc-toggle-row .form-check-input:checked { background-color: #f26522; border-color: #f26522; }

//     /* offcanvas footer */
//     .oc-footer {
//       padding: 1rem 1.5rem 1.5rem;
//       border-top: 1px solid #f0f1f8;
//       display: flex;
//       flex-direction: column;
//       gap: 0.6rem;
//       align-items: center;
//     }
//     .oc-btn-primary {
//       width: 100%;
//       background: #f26522;
//       color: #fff;
//       border: none;
//       padding: 0.75rem 1.5rem;
//       border-radius: 12px;
//       font-size: 0.92rem;
//       font-weight: 600;
//       cursor: pointer;
//       font-family: 'DM Sans', sans-serif;
//       box-shadow: 0 4px 14px rgba(242,101,34,0.3);
//       transition: background .2s, transform .15s;
//     }
//     .oc-btn-primary:hover { background: #d9551a; transform: translateY(-1px); }
//     .oc-btn-secondary {
//       width: 100%;
//       background: #f0f1f6;
//       color: #5a6282;
//       border: none;
//       padding: 0.7rem 1.5rem;
//       border-radius: 12px;
//       font-size: 0.88rem;
//       font-weight: 600;
//       cursor: pointer;
//       font-family: 'DM Sans', sans-serif;
//       transition: background .15s;
//     }
//     .oc-btn-secondary:hover { background: #e4e7f0; }

//     @media (max-width: 600px) {
//       .tos-hero { padding: 2rem 1.5rem 1.5rem; }
//       .tos-body { padding: 1.5rem; }
//       .tos-footer { padding: 1rem 1.5rem; }
//       .tos-title { font-size: 1.5rem; }
//       .offcanvas { max-width: 100%; border-radius: 20px 20px 0 0; }
//     }
//   `;

//   return (
//     <>
//       <style>{css}</style>

//       {/* ── Main document page ── */}
//       <div className="tos-wrap">
//         <div className="tos-card">
//           {/* Hero header */}
//           <div className="tos-hero">
//             <div className="tos-badge">
//               <svg
//                 width="10"
//                 height="10"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2.5"
//               >
//                 <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//                 <polyline points="14 2 14 8 20 8" />
//               </svg>
//               Legal Agreement
//             </div>
//             <h1 className="tos-title">{data?.title || "Terms of Service"}</h1>
//             <div className="tos-meta">
//               <span className="tos-meta-item">
//                 <svg
//                   width="12"
//                   height="12"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <rect x="3" y="4" width="18" height="18" rx="2" />
//                   <line x1="16" y1="2" x2="16" y2="6" />
//                   <line x1="8" y1="2" x2="8" y2="6" />
//                   <line x1="3" y1="10" x2="21" y2="10" />
//                 </svg>
//                 Last updated:{" "}
//                 {data?.updatedAt
//                   ? new Date(data.updatedAt).toLocaleDateString("en-IN", {
//                       day: "numeric",
//                       month: "long",
//                       year: "numeric",
//                     })
//                   : "—"}
//               </span>
//               <span className="tos-meta-item">
//                 <svg
//                   width="12"
//                   height="12"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <circle cx="12" cy="12" r="10" />
//                   <line x1="12" y1="8" x2="12" y2="12" />
//                   <line x1="12" y1="16" x2="12.01" y2="16" />
//                 </svg>
//                 Please read carefully before proceeding
//               </span>
//             </div>
//           </div>

//           {/* Body */}
//           <div className="tos-body">
//             {loading ? (
//               <div className="tos-loading">
//                 <div className="tos-spinner" />
//                 <p>Loading document…</p>
//               </div>
//             ) : data?.content ? (
//               <div className="tos-content">{data.content}</div>
//             ) : (
//               <div className="tos-empty">No content available.</div>
//             )}
//           </div>

//           {/* Footer */}
//           <div className="tos-footer">
//             <span className="tos-footer-note">
//               <svg
//                 width="13"
//                 height="13"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
//                 <path d="M7 11V7a5 5 0 0 1 10 0v4" />
//               </svg>
//               Your data is secure and protected
//             </span>
//             <span className="tos-footer-logo">Serene</span>
//           </div>
//         </div>
//       </div>

//       {/* ── Offcanvas 1 — Meet Kai ── */}
//       <div
//         className="offcanvas offcanvas-end"
//         tabIndex={-1}
//         id="offcanvasRight"
//         aria-labelledby="offcanvasRightLabel"
//       >
//         <div className="offcanvas-header">
//           <h3 className="offcanvas-title" id="offcanvasRightLabel" />
//           <button
//             type="button"
//             className="btn-close"
//             data-bs-dismiss="offcanvas"
//             aria-label="Close"
//           />
//         </div>
//         <div className="offcanvas-body">
//           <div className="oc-section">
//             <span className="oc-chip">Your Companion</span>
//             <h2 className="oc-title">Meet Kai, your guide</h2>
//             <p className="oc-sub">
//               We've selected a friendly companion for your journey.
//               <br />
//               You can change this anytime in settings.
//             </p>
//             <img
//               src="images/offcanvas-image-one.svg"
//               alt="Kai companion"
//               className="oc-img"
//             />
//           </div>
//         </div>
//         <div className="oc-footer">
//           <button
//             className="oc-btn-primary"
//             type="button"
//             data-bs-toggle="offcanvas"
//             data-bs-target="#offcanvasRightSecond"
//             aria-controls="offcanvasRight"
//           >
//             Continue
//           </button>
//           <button className="oc-btn-secondary">Change Avatar</button>
//         </div>
//       </div>

//       {/* ── Offcanvas 2 — Customize Kai ── */}
//       <div
//         className="offcanvas offcanvas-end"
//         tabIndex={-1}
//         id="offcanvasRightSecond"
//         aria-labelledby="offcanvasRightSecondLabel"
//       >
//         <div className="offcanvas-header">
//           <h3 className="offcanvas-title" id="offcanvasRightSecondLabel" />
//           <button
//             type="button"
//             className="btn-close"
//             data-bs-dismiss="offcanvas"
//             aria-label="Close"
//           />
//         </div>
//         <div className="offcanvas-body">
//           <div className="oc-section" style={{ paddingBottom: "0.5rem" }}>
//             <img
//               src="images/offcanvas-image-two.svg"
//               alt="Customize Kai"
//               className="oc-img"
//             />
//             <h2 className="oc-title">Customize your Kai</h2>
//             <p className="oc-sub" style={{ marginBottom: "0" }}>
//               Set your companion's voice and language preferences.
//             </p>
//           </div>

//           {/* Voice Selection */}
//           <div style={{ marginBottom: "1.2rem" }}>
//             <label className="oc-label">Companion's Voice</label>
//             {[
//               { value: "aura", label: "Aura (Default)", defaultChecked: true },
//               { value: "echo", label: "Echo" },
//               { value: "nova", label: "Nova" },
//             ].map((v) => (
//               <div
//                 key={v.value}
//                 className={`oc-voice-option${v.defaultChecked ? " active" : ""}`}
//               >
//                 <div className="oc-voice-left">
//                   <input
//                     type="radio"
//                     name="voice"
//                     value={v.value}
//                     defaultChecked={v.defaultChecked}
//                   />
//                   <span>{v.label}</span>
//                 </div>
//                 <button type="button" className="oc-play-btn">
//                   <img src="images/play-icon.png" alt="play" />
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Language */}
//           <div style={{ marginBottom: "1.2rem" }}>
//             <label className="oc-label">Language</label>
//             <select className="oc-select" defaultValue="English (US)">
//               <option>English (US)</option>
//               <option>Spanish</option>
//               <option>French</option>
//               <option>German</option>
//               <option>Hindi</option>
//             </select>
//           </div>

//           {/* Background Music */}
//           <div style={{ marginBottom: "1rem" }}>
//             <div className="oc-toggle-row">
//               <div>
//                 <div className="oc-toggle-label">Background Music</div>
//                 <div className="oc-toggle-sub">Calm music during sessions</div>
//               </div>
//               <div className="form-check form-switch mb-0">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   id="bgMusic"
//                   defaultChecked
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="oc-footer">
//           <button type="button" className="oc-btn-primary">
//             Save &amp; Continue
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LoginTermsOfServices;
