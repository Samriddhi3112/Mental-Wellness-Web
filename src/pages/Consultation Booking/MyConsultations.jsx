// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getMyBookings } from "../../features/booking/bookingSlice";

// const KaiSVG = () => (
//   <svg width="48" height="48" viewBox="0 0 80 80" fill="none">
//     <circle cx="40" cy="40" r="40" fill="#e8f0ff" />
//     <ellipse cx="40" cy="68" rx="22" ry="18" fill="#5c8af0" />
//     <ellipse cx="40" cy="30" rx="13" ry="13" fill="#f4c7a0" />
//     <ellipse cx="34" cy="27" rx="3" ry="4" fill="#2a1a0e" opacity="0.85" />
//     <ellipse cx="46" cy="27" rx="3" ry="4" fill="#2a1a0e" opacity="0.85" />
//     <path
//       d="M35 35 Q40 39 45 35"
//       stroke="#c97b5a"
//       strokeWidth="1.5"
//       strokeLinecap="round"
//       fill="none"
//     />
//     <path
//       d="M28 20 Q35 12 52 20"
//       stroke="#2a3a6e"
//       strokeWidth="3"
//       strokeLinecap="round"
//       fill="#3a5acc"
//       opacity="0.8"
//     />
//   </svg>
// );

// const IconCal = ({ color = "#1db96a" }) => (
//   <svg
//     width="18"
//     height="18"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke={color}
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="3" y="4" width="18" height="18" rx="2" />
//     <line x1="16" y1="2" x2="16" y2="6" />
//     <line x1="8" y1="2" x2="8" y2="6" />
//     <line x1="3" y1="10" x2="21" y2="10" />
//   </svg>
// );
// const IconCheck = () => (
//   <svg
//     width="18"
//     height="18"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#5a6080"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
//     <polyline points="22 4 12 14.01 9 11.01" />
//   </svg>
// );
// const IconX = () => (
//   <svg
//     width="18"
//     height="18"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#e8501a"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="10" />
//     <line x1="15" y1="9" x2="9" y2="15" />
//     <line x1="9" y1="9" x2="15" y2="15" />
//   </svg>
// );
// const IconClock = ({ color = "#6b7280" }) => (
//   <svg
//     width="13"
//     height="13"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke={color}
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="5" y="2" width="14" height="20" rx="2" />
//     <line x1="12" y1="6" x2="12" y2="10" />
//     <line x1="10" y1="8" x2="14" y2="8" />
//   </svg>
// );
// const IconVideo = () => (
//   <svg
//     width="13"
//     height="13"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#6b7280"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polygon points="23 7 16 12 23 17 23 7" />
//     <rect x="1" y="5" width="15" height="14" rx="2" />
//   </svg>
// );
// const IconPhone = () => (
//   <svg
//     width="13"
//     height="13"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#6b7280"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.35 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
//   </svg>
// );
// const IconNotes = () => (
//   <svg
//     width="13"
//     height="13"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#6b7280"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//     <polyline points="14 2 14 8 20 8" />
//     <line x1="16" y1="13" x2="8" y2="13" />
//     <line x1="16" y1="17" x2="8" y2="17" />
//   </svg>
// );
// const IconRefresh = () => (
//   <svg
//     width="13"
//     height="13"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#e8501a"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polyline points="1 4 1 10 7 10" />
//     <path d="M3.51 15a9 9 0 1 0 .49-4.5" />
//   </svg>
// );
// const IconCam = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#fff"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polygon points="23 7 16 12 23 17 23 7" />
//     <rect x="1" y="5" width="15" height="14" rx="2" />
//   </svg>
// );

// const formatTime = (utcString) => {
//   if (!utcString) return "--";
//   return new Date(utcString).toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//     timeZone: "UTC",
//   });
// };

// const formatDate = (utcString) => {
//   if (!utcString) return "--";
//   const d = new Date(utcString);
//   const months = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];
//   // const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const today = new Date();
//   const tomorrow = new Date();
//   tomorrow.setDate(today.getDate() + 1);
//   if (d.toDateString() === today.toDateString()) return "Today";
//   if (d.toDateString() === tomorrow.toDateString()) return "Tomorrow";
//   return `${months[d.getUTCMonth()]} ${d.getUTCDate()}`;
// };

// const getBadgeClass = (status) => {
//   if (status === "pending_assignment" || status === "assigned")
//     return "upcoming";
//   if (status === "completed") return "completed";
//   if (status === "cancelled") return "cancelled";
//   return "upcoming";
// };

// const getBadgeLabel = (status) => {
//   if (status === "pending_assignment" || status === "assigned")
//     return "UPCOMING";
//   if (status === "completed") return "COMPLETED";
//   if (status === "cancelled") return "CANCELLED";
//   return status.toUpperCase();
// };

// export default function MyConsultations() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { bookings, loading } = useSelector((state) => state.booking?.bookings);
//   console.log("BOOK", bookings);

//   useEffect(() => {
//     dispatch(getMyBookings({ page: 1, limit: 20 }));
//   }, [dispatch]);

//   const upcoming =
//     bookings?.filter(
//       (b) => b.status === "pending_assignment" || b.status === "assigned",
//     ) || [];
//   const completed = bookings?.filter((b) => b.status === "completed") || [];
//   const cancelled = bookings?.filter((b) => b.status === "cancelled") || [];

//   return (
//     <>
//       <div className="serene-app">
//         <div className="body">
//           <main className="main-content1" style={{ display: "block" }}>
//             <div className="stats-grid">
//               <div className="stat-card">
//                 <div className="stat-icon green">
//                   <IconCal color="#1db96a" />
//                 </div>
//                 <div className="stat-num">{upcoming.length}</div>
//                 <div className="stat-label">Upcoming Sessions</div>
//               </div>
//               <div className="stat-card">
//                 <div className="stat-icon dark">
//                   <IconCheck />
//                 </div>
//                 <div className="stat-num">{completed.length}</div>
//                 <div className="stat-label">Completed Sessions</div>
//               </div>
//               <div className="stat-card">
//                 <div className="stat-icon red">
//                   <IconX />
//                 </div>
//                 <div className="stat-num">{cancelled.length}</div>
//                 <div className="stat-label">Cancelled Sessions</div>
//               </div>
//             </div>

//             {/* ALL SESSIONS */}
//             <div className="sessions-header">
//               <div className="sessions-title">All Sessions</div>
//               {/* <button className="book-new-btn" onClick={() => navigate("/therapy-session")}>
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//                   <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
//                 </svg>
//                 Book New
//               </button> */}
//             </div>

//             {loading ? (
//               <div
//                 style={{
//                   color: "#9ca3af",
//                   textAlign: "center",
//                   padding: "40px",
//                 }}
//               >
//                 Loading sessions...
//               </div>
//             ) : bookings?.length === 0 ? (
//               <div
//                 style={{
//                   color: "#9ca3af",
//                   textAlign: "center",
//                   padding: "40px",
//                 }}
//               >
//                 No sessions found
//               </div>
//             ) : (
//               <div className="sessions-grid">
//                 {bookings?.map((booking) => {
//                   const isUpcoming =
//                     booking.status === "pending_assignment" ||
//                     booking.status === "assigned";
//                   const isCancelled = booking.status === "cancelled";
//                   const isCompleted = booking.status === "completed";

//                   return (
//                     <div
//                       className="session-card"
//                       key={booking._id}
//                       onClick={() =>
//                         navigate(`/booking-details/${booking._id}`)
//                       }
//                     >
//                       {/* Badge */}
//                       <div className={`badge ${getBadgeClass(booking.status)}`}>
//                         {isUpcoming && (
//                           <svg
//                             width="10"
//                             height="10"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="#fff"
//                             strokeWidth="3"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <circle cx="12" cy="12" r="10" />
//                             <polyline points="12 6 12 12 16 14" />
//                           </svg>
//                         )}
//                         {isCompleted && (
//                           <svg
//                             width="10"
//                             height="10"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="#fff"
//                             strokeWidth="3"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <polyline points="20 6 9 17 4 12" />
//                           </svg>
//                         )}
//                         {isCancelled && (
//                           <svg
//                             width="10"
//                             height="10"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="#fff"
//                             strokeWidth="3"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <line x1="18" y1="6" x2="6" y2="18" />
//                             <line x1="6" y1="6" x2="18" y2="18" />
//                           </svg>
//                         )}
//                         {getBadgeLabel(booking.status)}
//                       </div>

//                       <div className="session-date">
//                         {formatDate(booking.startAt)}
//                       </div>
//                       <div
//                         className={`session-time${!isUpcoming ? " dark" : ""}`}
//                       >
//                         {formatTime(booking.startAt)}
//                       </div>

//                       <div className="session-meta">
//                         <div className="meta-item">
//                           <IconClock
//                             color={isUpcoming ? "#6b7280" : "#6b7280"}
//                           />
//                           {booking.durationMinutes} Minutes
//                         </div>
//                         <div className="meta-item">
//                           {booking.mode === "video" ? (
//                             <IconVideo />
//                           ) : (
//                             <IconPhone />
//                           )}
//                           {booking.mode === "video"
//                             ? "Video Call"
//                             : "Voice Call"}
//                         </div>
//                       </div>

//                       {/* Actions */}
//                       {isUpcoming && (
//                         <div className="session-actions">
//                           <button
//                             className="btn-join"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               navigate(`/booking-details/${booking._id}`);
//                             }}
//                           >
//                             <IconCam /> Join Session
//                           </button>
//                         </div>
//                       )}
//                       {isCompleted && (
//                         <div className="session-actions">
//                           <button
//                             className="btn-join"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               navigate("/therapy-session");
//                             }}
//                           >
//                             <IconRefresh /> Book Again
//                           </button>
//                         </div>
//                       )}
//                       {isCancelled && booking.cancellationReason && (
//                         <div className="cancelled-note">
//                           <svg
//                             width="14"
//                             height="14"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="#e8501a"
//                             strokeWidth="2.5"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <circle cx="12" cy="12" r="10" />
//                             <line x1="12" y1="8" x2="12" y2="12" />
//                             <line x1="12" y1="16" x2="12.01" y2="16" />
//                           </svg>
//                           {booking.cancellationReason}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </>
//   );
// }
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getBookingSummary,
//   getMyBookings,
// } from "../../features/booking/bookingSlice";
// import CancelBookingModal from "../../components/modals/CancelBookingModal";
// import { useTranslation } from "react-i18next";
// import BookingCancelledModal from "../../components/modals/BookingCancelledModal";

// const IconCal = ({ color = "#1db96a" }) => (
//   <svg
//     width="18"
//     height="18"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke={color}
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="3" y="4" width="18" height="18" rx="2" />
//     <line x1="16" y1="2" x2="16" y2="6" />
//     <line x1="8" y1="2" x2="8" y2="6" />
//     <line x1="3" y1="10" x2="21" y2="10" />
//   </svg>
// );
// const IconCheck = () => (
//   <svg
//     width="18"
//     height="18"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#5a6080"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
//     <polyline points="22 4 12 14.01 9 11.01" />
//   </svg>
// );
// const IconX = () => (
//   <svg
//     width="18"
//     height="18"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#e8501a"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="10" />
//     <line x1="15" y1="9" x2="9" y2="15" />
//     <line x1="9" y1="9" x2="15" y2="15" />
//   </svg>
// );
// const IconClock = ({ color = "#6b7280" }) => (
//   <svg
//     width="13"
//     height="13"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke={color}
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="5" y="2" width="14" height="20" rx="2" />
//     <line x1="12" y1="6" x2="12" y2="10" />
//     <line x1="10" y1="8" x2="14" y2="8" />
//   </svg>
// );
// const IconVideo = () => (
//   <svg
//     width="13"
//     height="13"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#6b7280"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polygon points="23 7 16 12 23 17 23 7" />
//     <rect x="1" y="5" width="15" height="14" rx="2" />
//   </svg>
// );
// const IconPhone = () => (
//   <svg
//     width="13"
//     height="13"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#6b7280"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.35 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
//   </svg>
// );
// const IconRefresh = () => (
//   <svg
//     width="13"
//     height="13"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#e8501a"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polyline points="1 4 1 10 7 10" />
//     <path d="M3.51 15a9 9 0 1 0 .49-4.5" />
//   </svg>
// );
// const IconCam = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#fff"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polygon points="23 7 16 12 23 17 23 7" />
//     <rect x="1" y="5" width="15" height="14" rx="2" />
//   </svg>
// );
// const IconCancel = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#fff"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="10" />
//     <line x1="15" y1="9" x2="9" y2="15" />
//     <line x1="9" y1="9" x2="15" y2="15" />
//   </svg>
// );

// const formatTime = (utcString) => {
//   if (!utcString) return "--";
//   return new Date(utcString).toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//     timeZone: "UTC",
//   });
// };

// const formatDate = (utcString, t) => {
//   if (!utcString) return "--";
//   const d = new Date(utcString);
//   const months = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];
//   const today = new Date();
//   const tomorrow = new Date();
//   tomorrow.setDate(today.getDate() + 1);
//   if (d.toDateString() === today.toDateString()) return t("today");
//   if (d.toDateString() === tomorrow.toDateString()) return t("tomorrow");
//   return `${months[d.getUTCMonth()]} ${d.getUTCDate()}`;
// };

// const getBadgeClass = (status) => {
//   if (status === "pending_assignment" || status === "assigned")
//     return "upcoming";
//   if (status === "completed") return "completed";
//   if (status === "cancelled") return "cancelled";
//   return "upcoming";
// };

// const getBadgeLabel = (status, t) => {
//   if (status === "pending_assignment" || status === "assigned")
//     return t("upcoming").toUpperCase();
//   if (status === "completed") return t("completed").toUpperCase();
//   if (status === "cancelled") return t("cancelled").toUpperCase();
//   return status.toUpperCase();
// };

// export default function MyConsultations() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { t } = useTranslation();
//   const { bookings, loading } = useSelector((state) => state.booking?.bookings);
//   const { upcoming, completed, cancelled } = useSelector(
//     (state) => state.booking.summary,
//   );
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [successData, setSuccessData] = useState(null);

//   const filteredBookings =
//     bookings?.filter((b) => {
//       if (activeFilter === "all") return true;
//       if (activeFilter === "upcoming")
//         return b.status === "pending_assignment" || b.status === "assigned";
//       if (activeFilter === "completed") return b.status === "completed";
//       if (activeFilter === "cancelled") return b.status === "cancelled";
//       return true;
//     }) || [];

//   const [cancelModalBookingId, setCancelModalBookingId] = useState(null);

//   useEffect(() => {
//     dispatch(getMyBookings({ page: 1, limit: 20 }));
//     dispatch(getBookingSummary());
//   }, [dispatch]);
//   // const upcoming =
//   //   bookings?.filter(
//   //     (b) => b.status === "pending_assignment" || b.status === "assigned",
//   //   ) || [];
//   // const completed = bookings?.filter((b) => b.status === "completed") || [];
//   // const cancelled = bookings?.filter((b) => b.status === "cancelled") || [];

//   const handleCancelSuccess = (data) => {
//     setCancelModalBookingId(null); // cancel modal close
//     setSuccessData(data);
//     setShowSuccessModal(true); // success modal open

//     dispatch(getMyBookings({ page: 1, limit: 20 }));
//     dispatch(getBookingSummary());
//   };

//   return (
//     <>
//       <div className="serene-app">
//         <div className="body">
//           <main className="main-content1" style={{ display: "block" }}>
//             {/* Stats */}
//             <div className="stats-grid">
//               <div className="stat-card">
//                 <div className="stat-icon green">
//                   <IconCal color="#1db96a" />
//                 </div>
//                 <div className="stat-num">{upcoming}</div>
//                 <div className="stat-label">{t("upcomingSessions")}</div>
//               </div>
//               <div className="stat-card">
//                 <div className="stat-icon dark">
//                   <IconCheck />
//                 </div>
//                 <div className="stat-num">{completed}</div>
//                 <div className="stat-label">{t("completedSessions")}</div>
//               </div>
//               <div className="stat-card">
//                 <div className="stat-icon red">
//                   <IconX />
//                 </div>
//                 <div className="stat-num">{cancelled}</div>
//                 <div className="stat-label">{t("cancelledSessions")}</div>
//               </div>
//             </div>

//             {/* All Sessions */}
//             <div className="sessions-header">
//               <div className="sessions-title">{t("allSessions")}</div>

//               <div className="filter-tabs">
//                 {[
//                   { key: "all", label: t("all") },
//                   { key: "upcoming", label: t("upcoming") },
//                   { key: "completed", label: t("completed") },
//                   { key: "cancelled", label: t("cancelled") },
//                 ].map(({ key, label }) => (
//                   <button
//                     key={key}
//                     className={`filter-tab ${activeFilter === key ? "active" : ""}`}
//                     onClick={() => setActiveFilter(key)}
//                   >
//                     {label}
//                   </button>
//                 ))}
//               </div>
//               {/* <div className="sessions-title">All Sessions</div> */}
//             </div>

//             {loading ? (
//               <div
//                 style={{
//                   color: "#9ca3af",
//                   textAlign: "center",
//                   padding: "40px",
//                 }}
//               >
//                 {loading ? t("loadingSessions") : t("noSessionsFound")}
//               </div>
//             ) : filteredBookings?.length === 0 ? (
//               <div
//                 style={{
//                   color: "#9ca3af",
//                   textAlign: "center",
//                   padding: "40px",
//                 }}
//               >
//                 {t("noSessionsFound")}
//               </div>
//             ) : (
//               <div className="sessions-grid">
//                 {filteredBookings?.map((booking) => {
//                   const isPending = booking.status === "pending_assignment";
//                   const isAssigned = booking.status === "assigned";
//                   const isCompleted = booking.status === "completed";
//                   const isCancelled = booking.status === "cancelled";

//                   return (
//                     <div
//                       className="session-card"
//                       key={booking._id}
//                       onClick={() =>
//                         navigate(
//                           `/my-consultation/booking-details/${booking._id}`,
//                         )
//                       }
//                     >
//                       {/* Badge */}
//                       <div className={`badge ${getBadgeClass(booking.status)}`}>
//                         {(isPending || isAssigned) && (
//                           <svg
//                             width="10"
//                             height="10"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="#fff"
//                             strokeWidth="3"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <circle cx="12" cy="12" r="10" />
//                             <polyline points="12 6 12 12 16 14" />
//                           </svg>
//                         )}
//                         {isCompleted && (
//                           <svg
//                             width="10"
//                             height="10"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="#fff"
//                             strokeWidth="3"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <polyline points="20 6 9 17 4 12" />
//                           </svg>
//                         )}
//                         {isCancelled && (
//                           <svg
//                             width="10"
//                             height="10"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="#fff"
//                             strokeWidth="3"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <line x1="18" y1="6" x2="6" y2="18" />
//                             <line x1="6" y1="6" x2="18" y2="18" />
//                           </svg>
//                         )}
//                         {getBadgeLabel(booking.status, t)}
//                       </div>

//                       <div className="session-date">
//                         {formatDate(booking.startAt, t)}
//                       </div>
//                       <div
//                         className={`session-time${!(isPending || isAssigned) ? " dark" : ""}`}
//                       >
//                         {formatTime(booking.startAt)}
//                       </div>

//                       <div className="session-meta">
//                         <div className="meta-item">
//                           <IconClock color="#6b7280" />
//                           {booking.durationMinutes} {t("minutes")}
//                         </div>
//                         <div className="meta-item">
//                           {booking.mode === "video" ? (
//                             <IconVideo />
//                           ) : (
//                             <IconPhone />
//                           )}
//                           {booking.mode === "video"
//                             ? t("videoCall")
//                             : t("voiceCall")}
//                         </div>
//                       </div>

//                       {/* ── pending_assignment: Cancel button ── */}
//                       {isPending && (
//                         <div className="session-actions">
//                           <button
//                             className="btn-cancel"
//                             style={{ width: "100%" }}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setCancelModalBookingId(booking._id);
//                             }}
//                           >
//                             <IconCancel /> {t("cancelBooking")}
//                           </button>
//                         </div>
//                       )}

//                       {/* ── assigned: Join Session (not functional yet) ── */}
//                       {isAssigned && (
//                         <div className="session-actions">
//                           <button
//                             className="btn-join"
//                             onClick={(e) => e.stopPropagation()}
//                           >
//                             <IconCam /> {t("joinSession")}
//                           </button>
//                         </div>
//                       )}

//                       {/* ── completed: Book Again ── */}
//                       {isCompleted && (
//                         <div className="session-actions">
//                           <button
//                             className="btn-join"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               navigate("/my-consultation/therapy-session");
//                             }}
//                           >
//                             <IconRefresh /> {t("bookAgain")}
//                           </button>
//                         </div>
//                       )}

//                       {/* ── cancelled: show reason ── */}
//                       {isCancelled && booking.cancellationReason && (
//                         <div className="cancelled-note">
//                           <svg
//                             width="14"
//                             height="14"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="#e8501a"
//                             strokeWidth="2.5"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <circle cx="12" cy="12" r="10" />
//                             <line x1="12" y1="8" x2="12" y2="12" />
//                             <line x1="12" y1="16" x2="12.01" y2="16" />
//                           </svg>
//                           {booking.cancellationReason}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </main>
//         </div>
//       </div>

//       {cancelModalBookingId && (
//         <CancelBookingModal
//           bookingId={cancelModalBookingId}
//           onClose={() => setCancelModalBookingId(null)}
//           onCancelSuccess={handleCancelSuccess}
//         />
//       )}
//       {showSuccessModal && (
//         <BookingCancelledModal
//           booking={successData?.booking}
//           cancellationReason={successData?.cancellationReason}
//           onClose={() => setShowSuccessModal(false)}
//         />
//       )}
//     </>
//   );
// }

//-----------------------
// Updated MyConsultations.jsx — sirf relevant changes dikhaye hain
// Apni existing file mein ye changes karo:

// ── 1. Imports mein add karo ─────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookingSummary,
  getMyBookings,
} from "../../features/booking/bookingSlice";
import {
  getCallInfo,
  setActiveBooking,
  resetCallState,
} from "../../features/call/callSlice"; // ← NEW
import CancelBookingModal from "../../components/modals/CancelBookingModal";
import BookingCancelledModal from "../../components/modals/BookingCancelledModal";
import CallScreen from "../Call/CallScreen"; // ← NEW
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

// ... (apne saare Icon components waise hi rakhein) ...

export default function MyConsultations() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { bookings, loading } = useSelector((state) => state.booking?.bookings);
  const { upcoming, completed, cancelled } = useSelector(
    (state) => state.booking.summary,
  );

  const IconCal = ({ color = "#1db96a" }) => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
  const IconCheck = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#5a6080"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
  const IconX = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#e8501a"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
  const IconClock = ({ color = "#6b7280" }) => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="6" x2="12" y2="10" />
      <line x1="10" y1="8" x2="14" y2="8" />
    </svg>
  );
  const IconVideo = () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6b7280"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  );
  const IconPhone = () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6b7280"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.35 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
  const IconRefresh = () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#e8501a"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-4.5" />
    </svg>
  );
  const IconCam = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  );
  const IconCancel = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );

  const getBadgeClass = (status) => {
    if (status === "pending_assignment" || status === "assigned")
      return "upcoming";
    if (status === "completed") return "completed";
    if (status === "cancelled") return "cancelled";
    return "upcoming";
  };

  const getBadgeLabel = (status, t) => {
    if (status === "pending_assignment" || status === "assigned")
      return t("upcoming").toUpperCase();
    if (status === "completed") return t("completed").toUpperCase();
    if (status === "cancelled") return t("cancelled").toUpperCase();
    return status.toUpperCase();
  };

  const formatTime = (utcString) => {
    if (!utcString) return "--";
    const d = new Date(utcString);
    const h = d.getUTCHours();
    const m = d.getUTCMinutes();
    const ampm = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${String(hour).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
  };

  const formatDate = (utcString, t) => {
    if (!utcString) return "--";
    const d = new Date(utcString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    if (d.toDateString() === today.toDateString()) return t("today");
    if (d.toDateString() === tomorrow.toDateString()) return t("tomorrow");
    return `${months[d.getUTCMonth()]} ${d.getUTCDate()}`;
  };

  // IST to UTC convert
  // const istToUtc = (timeStr) => {
  //   const [h, m] = timeStr.split(":").map(Number);
  //   let utcH = h - 5;
  //   let utcM = m - 30;
  //   if (utcM < 0) {
  //     utcM += 60;
  //     utcH -= 1;
  //   }
  //   if (utcH < 0) utcH += 24;
  //   return `${String(utcH).padStart(2, "0")}:${String(utcM).padStart(2, "0")}`;
  // };
  // "16:40" IST → "11:10" UTC
  // ── NEW: call state ──────────────────────────────────────────────────────
  const { callInfo, callInfoLoading } = useSelector((state) => state.call);
  const [activeCallBookingId, setActiveCallBookingId] = useState(null); // call screen show karne ke liye
  const [joiningBookingId, setJoiningBookingId] = useState(null); // loading state per card
  // ─────────────────────────────────────────────────────────────────────────

  const [activeFilter, setActiveFilter] = useState("all");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [cancelModalBookingId, setCancelModalBookingId] = useState(null);

  const filteredBookings =
    bookings?.filter((b) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "upcoming")
        return b.status === "pending_assignment" || b.status === "assigned";
      if (activeFilter === "completed") return b.status === "completed";
      if (activeFilter === "cancelled") return b.status === "cancelled";
      return true;
    }) || [];

  useEffect(() => {
    dispatch(getMyBookings({ page: 1, limit: 20 }));
    dispatch(getBookingSummary());
  }, [dispatch]);

  const handleCancelSuccess = (data) => {
    setCancelModalBookingId(null);
    setSuccessData(data);
    setShowSuccessModal(true);
    dispatch(getMyBookings({ page: 1, limit: 20 }));
    dispatch(getBookingSummary());
  };

  // ── NEW: Join Session handler ─────────────────────────────────────────────
  // MyConsultations.jsx mein sirf handleJoinSession replace karo
  // react-toastify import bhi add karo file ke top pe:
  // import { toast } from "react-toastify";

  const handleJoinSession = async (e, bookingId) => {
    e.stopPropagation();
    setJoiningBookingId(bookingId);
    try {
      const result = await dispatch(
        getCallInfo({ bookingId, isAdmin: false }),
      ).unwrap();
      const info = result.data || result;

      if (!info.canJoin) {
        // joinWindow.from UTC se time nikalo
        const d = new Date(info.joinWindow?.from);
        const h = d.getUTCHours();
        const m = d.getUTCMinutes();
        const ampm = h >= 12 ? "PM" : "AM";
        const hour = h % 12 || 12;
        const fromTime = `${String(hour).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;

        // Kitni der baad open hoga — user-friendly message
        const nowUTC = Date.now();
        const windowStartUTC = new Date(info.joinWindow?.from).getTime();
        const diffMs = windowStartUTC - nowUTC;
        const diffMins = Math.ceil(diffMs / 60000);

        if (diffMins > 0) {
          toast.warning(
            `Session ${diffMins} minute${diffMins > 1 ? "s" : ""} mein available hogi. Join window: ${fromTime}`,
            { position: "top-center", autoClose: 4000 },
          );
        } else {
          toast.info(
            `Join window closes at ${fromTime}. Session already ended.`,
            { position: "top-center", autoClose: 4000 },
          );
        }
        return;
      }

      // canJoin true — CallScreen open karo
      dispatch(setActiveBooking(bookingId));
      setActiveCallBookingId(bookingId);
    } catch (err) {
      const msg = err?.message || "Call join karne mein error aayi";

      if (
        msg?.toLowerCase().includes("not assigned") ||
        msg?.toLowerCase().includes("expert not assigned")
      ) {
        toast.warning(
          "Counselor abhi assign nahi hua. Thodi der mein try karein.",
          {
            position: "top-center",
            autoClose: 4000,
          },
        );
      } else if (msg?.toLowerCase().includes("cancelled")) {
        toast.error("Ye booking cancel ho chuki hai.", {
          position: "top-center",
          autoClose: 4000,
        });
      } else if (msg?.toLowerCase().includes("already ended")) {
        toast.info("Ye session already khatam ho chuka hai.", {
          position: "top-center",
          autoClose: 4000,
        });
      } else {
        toast.error(msg, { position: "top-center", autoClose: 4000 });
      }
    } finally {
      setJoiningBookingId(null);
    }
  };

  // handleCallEnd same rahega:
  const handleCallEnd = () => {
    setActiveCallBookingId(null);
    dispatch(resetCallState());
    dispatch(getMyBookings({ page: 1, limit: 20 }));
    dispatch(getBookingSummary());
  };
  // const handleJoinSession = async (e, bookingId) => {
  //   e.stopPropagation();
  //   setJoiningBookingId(bookingId);

  //   try {
  //     const result = await dispatch(
  //       getCallInfo({ bookingId, isAdmin: false }),
  //     ).unwrap();
  //     const info = result.data || result;

  //     if (!info.canJoin) {
  //       console.log("Current time UTC:", new Date().toISOString());
  //       console.log("canJoin:", info.canJoin);
  //       console.log("joinWindow:", info.joinWindow);
  //       const d = new Date(info.joinWindow?.from);
  //       const h = d.getUTCHours();
  //       const m = d.getUTCMinutes();
  //       const ampm = h >= 12 ? "PM" : "AM";
  //       const hour = h % 12 || 12;
  //       const from = `${String(hour).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
  //       alert(
  //         `Session abhi join nahi ho sakta. Join window starts at: ${from}`,
  //       );
  //       return;
  //     }

  //     dispatch(setActiveBooking(bookingId));
  //     setActiveCallBookingId(bookingId);
  //   } catch (err) {
  //     const msg = err?.message || "Call join karne mein error aayi";
  //     // Error handling:
  //     if (msg?.toLowerCase().includes("not assigned")) {
  //       alert(t("waitingForCounselor") || "Counselor abhi assign nahi hua");
  //     } else if (msg?.toLowerCase().includes("cancelled")) {
  //       alert(t("bookingCancelled") || "Ye booking cancel ho chuki hai");
  //     } else {
  //       alert(msg);
  //     }
  //   } finally {
  //     setJoiningBookingId(null);
  //   }
  // };

  // ── NEW: Call end handler ─────────────────────────────────────────────────
  // const handleCallEnd = () => {
  //   setActiveCallBookingId(null);
  //   dispatch(resetCallState());
  //   dispatch(getMyBookings({ page: 1, limit: 20 }));
  //   dispatch(getBookingSummary());
  // };
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      <div className="serene-app">
        <div className="body">
          <main className="main-content1" style={{ display: "block" }}>
            {/* Stats — same as before */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon green">
                  <IconCal color="#1db96a" />
                </div>
                <div className="stat-num">{upcoming}</div>
                <div className="stat-label">{t("upcomingSessions")}</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon dark">
                  <IconCheck />
                </div>
                <div className="stat-num">{completed}</div>
                <div className="stat-label">{t("completedSessions")}</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon red">
                  <IconX />
                </div>
                <div className="stat-num">{cancelled}</div>
                <div className="stat-label">{t("cancelledSessions")}</div>
              </div>
            </div>

            {/* All Sessions header */}
            <div className="sessions-header">
              <div className="sessions-title">{t("allSessions")}</div>
              <div className="filter-tabs">
                {[
                  { key: "all", label: t("all") },
                  { key: "upcoming", label: t("upcoming") },
                  { key: "completed", label: t("completed") },
                  { key: "cancelled", label: t("cancelled") },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    className={`filter-tab ${activeFilter === key ? "active" : ""}`}
                    onClick={() => setActiveFilter(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div
                style={{
                  color: "#9ca3af",
                  textAlign: "center",
                  padding: "40px",
                }}
              >
                {t("loadingSessions")}
              </div>
            ) : filteredBookings?.length === 0 ? (
              <div
                style={{
                  color: "#9ca3af",
                  textAlign: "center",
                  padding: "40px",
                }}
              >
                {t("noSessionsFound")}
              </div>
            ) : (
              <div className="sessions-grid">
                {filteredBookings?.map((booking) => {
                  const isPending = booking.status === "pending_assignment";
                  const isAssigned = booking.status === "assigned";
                  const isCompleted = booking.status === "completed";
                  const isCancelled = booking.status === "cancelled";
                  const isJoiningThis = joiningBookingId === booking._id; // ← NEW

                  return (
                    <div
                      className="session-card"
                      key={booking._id}
                      onClick={() =>
                        navigate(
                          `/my-consultation/booking-details/${booking._id}`,
                        )
                      }
                    >
                      {/* Badge */}
                      <div className={`badge ${getBadgeClass(booking.status)}`}>
                        {/* ... same SVG icons as before ... */}
                        {getBadgeLabel(booking.status, t)}
                      </div>

                      <div className="session-date">
                        {formatDate(booking.startAt, t)}
                      </div>
                      <div
                        className={`session-time${!(isPending || isAssigned) ? " dark" : ""}`}
                      >
                        {formatTime(booking.startAt)}
                      </div>

                      <div className="session-meta">
                        <div className="meta-item">
                          <IconClock color="#6b7280" />
                          {booking.durationMinutes} {t("minutes")}
                        </div>
                        <div className="meta-item">
                          {booking.mode === "video" ? (
                            <IconVideo />
                          ) : (
                            <IconPhone />
                          )}
                          {booking.mode === "video"
                            ? t("videoCall")
                            : t("voiceCall")}
                        </div>
                      </div>

                      {/* pending: Cancel */}
                      {isPending && (
                        <div className="session-actions">
                          <button
                            className="btn-cancel"
                            style={{ width: "100%" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCancelModalBookingId(booking._id);
                            }}
                          >
                            <IconCancel /> {t("cancelBooking")}
                          </button>
                        </div>
                      )}

                      {/* ── UPDATED: assigned → Join Session (ab functional!) ── */}
                      {isAssigned && (
                        <div className="session-actions">
                          <button
                            className="btn-join"
                            disabled={isJoiningThis}
                            onClick={(e) => handleJoinSession(e, booking._id)}
                          >
                            {isJoiningThis ? (
                              <>
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#fff"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                >
                                  <line x1="12" y1="2" x2="12" y2="6" />
                                  <line x1="12" y1="18" x2="12" y2="22" />
                                  <line
                                    x1="4.93"
                                    y1="4.93"
                                    x2="7.76"
                                    y2="7.76"
                                  />
                                  <line
                                    x1="16.24"
                                    y1="16.24"
                                    x2="19.07"
                                    y2="19.07"
                                  />
                                  <line x1="2" y1="12" x2="6" y2="12" />
                                  <line x1="18" y1="12" x2="22" y2="12" />
                                  <line
                                    x1="4.93"
                                    y1="19.07"
                                    x2="7.76"
                                    y2="16.24"
                                  />
                                  <line
                                    x1="16.24"
                                    y1="7.76"
                                    x2="19.07"
                                    y2="4.93"
                                  />
                                </svg>
                                {t("connecting") || "Connecting..."}
                              </>
                            ) : (
                              <>
                                <IconCam /> {t("joinSession")}
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {/* completed: Book Again */}
                      {isCompleted && (
                        <div className="session-actions">
                          <button
                            className="btn-join"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/my-consultation/therapy-session");
                            }}
                          >
                            <IconRefresh /> {t("bookAgain")}
                          </button>
                        </div>
                      )}

                      {/* cancelled: reason */}
                      {isCancelled && booking.cancellationReason && (
                        <div className="cancelled-note">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#e8501a"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                          {booking.cancellationReason}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modals */}
      {cancelModalBookingId && (
        <CancelBookingModal
          bookingId={cancelModalBookingId}
          onClose={() => setCancelModalBookingId(null)}
          onCancelSuccess={handleCancelSuccess}
        />
      )}
      {showSuccessModal && (
        <BookingCancelledModal
          booking={successData?.booking}
          cancellationReason={successData?.cancellationReason}
          onClose={() => setShowSuccessModal(false)}
        />
      )}

      {/* ── NEW: Call Screen overlay ── */}
      {activeCallBookingId && (
        <CallScreen
          bookingId={activeCallBookingId}
          isAdmin={false}
          onCallEnd={handleCallEnd}
        />
      )}
    </>
  );
}
