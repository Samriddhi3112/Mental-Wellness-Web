// import { useState } from "react";
// import { useNavigate, useDispatch } from "react-router-dom";
// import BookingConfirmedModal from "../../components/modals/BookingConfirmedModal";
// import {bookSlot, resetBookingState} from "../../features/booking/bookingSlice";

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

// const dates = [
//   { day: "Today", date: "16 Apr" },
//   { day: "Tomorrow", date: "17 Apr" },
//   { day: "Friday", date: "18 Apr" },
//   { day: "Saturday", date: "19 Apr" },
// ];

// const morningSlots = ["09:00 AM", "10:30 AM", "11:00 AM"];
// const afternoonSlots = [
//   "01:30 PM",
//   "02:00 PM",
//   "03:30 PM",
//   "04:00 PM",
//   "05:30 PM",
// ];
// const eveningSlots = ["07:00 PM", "08:30 PM"];

// export default function SelectSlot() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { bookingLoading, bookingSuccess, error } = useSelector(
//     (state) => state.booking
//   );
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedSlot, setSelectedSlot] = useState(null);
//     const [showModal, setShowModal] = useState(false);

//     useEffect(() => {
//     if (bookingSuccess) {
//       setShowModal(true);
//       dispatch(resetBookingState());
//     }
//   }, [bookingSuccess]);

//   const displayDate =
//     selectedDate === "16 Apr" ? "Today, 16 Apr 2026" : selectedDate + " 2026";

//   const handleChange = () => {
//     navigate("/therapy-session");
//   };

//   // const handleSlotBooking = () => {
//   //   if (!selectedSlot) return;

//   //   navigate("/my-consultation");
//   // };

//   return (
//     <>
//       <div className="serene-app">
//         <div className="body">
//           {/* MAIN */}
//           <main className="main-content">
//             <div className="left-col">
//               {/* Duration Banner */}
//               <div className="duration-banner">
//                 <div className="dur-left">
//                   <div className="dur-icon">
//                     <svg

//                       width="18"
//                       height="18"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="#030f25"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <circle cx="12" cy="12" r="10" />
//                       <polyline points="12 6 12 12 16 14" />
//                     </svg>
//                   </div>
//                   <div>
//                     <div className="dur-label">Selected Duration</div>
//                     <div className="dur-title">60 Minutes Session</div>
//                     <div className="dur-sub">Standard consultation length</div>
//                   </div>
//                 </div>
//                 <button className="change-btn" onClick={handleChange}>
//                   Change Duration
//                 </button>
//               </div>

//               {/* Select Date */}
//               <div className="card">
//                 <div className="card-title">Select Date</div>
//                 <div className="date-grid">
//                   {dates.map((d) => (
//                     <div
//                       key={d.date}
//                       className={`date-chip${selectedDate === d.date ? " selected" : ""}`}
//                       onClick={() => setSelectedDate(d.date)}
//                     >
//                       <div className="date-day">{d.day}</div>
//                       <div className="date-num">{d.date}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Morning Slots */}
//               <div className="slot-group">
//                 <div className="slot-group-hdr">
//                   <span className="slot-icon" style={{backgroundColor: "rgba(255, 251, 235, 1)", borderRadius:"8px"}}>☀️</span>
//                   <span className="slot-group-title">Morning Slots</span>
//                 </div>
//                 <div className="slots-row">
//                   {morningSlots.map((s) => (
//                     <button
//                       key={s}
//                       className={`slot-chip${selectedSlot === s ? " selected" : ""}`}
//                       onClick={() => setSelectedSlot(s)}
//                     >
//                       {s}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Afternoon Slots */}
//               <div className="slot-group">
//                 <div className="slot-group-hdr">
//                   <span className="slot-icon" style={{backgroundColor: "rgba(255, 247, 237, 1)", borderRadius:"8px"}}>🌤️</span>
//                   <span className="slot-group-title">Afternoon Slots</span>
//                 </div>
//                 <div className="slots-row">
//                   {afternoonSlots.map((s) => (
//                     <button
//                       key={s}
//                       className={`slot-chip${selectedSlot === s ? " selected" : ""}`}
//                       onClick={() => setSelectedSlot(s)}
//                     >
//                       {s}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Evening Slots */}
//               <div className="slot-group">
//                 <div className="slot-group-hdr">
//                   <span className="slot-icon" style={{backgroundColor: "rgba(238, 242, 255, 1)", borderRadius:"8px"}}>🌙</span>
//                   <span className="slot-group-title">Evening Slots</span>
//                 </div>
//                 <div className="slots-row">
//                   {eveningSlots.map((s) => (
//                     <button
//                       key={s}
//                       className={`slot-chip${selectedSlot === s ? " selected" : ""}`}
//                       onClick={() => setSelectedSlot(s)}
//                     >
//                       {s}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* BOOKING SUMMARY */}
//             <div className="summary-col">
//               <div className="summary-card">
//                 <div className="summary-title">Booking Summary</div>

//                 <div className="summary-row">
//                   <div className="summary-icon">
//                     <svg
//                       width="14"
//                       height="14"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="#e8501a"
//                       strokeWidth="2.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <rect x="3" y="4" width="18" height="18" rx="2" />
//                       <line x1="16" y1="2" x2="16" y2="6" />
//                       <line x1="8" y1="2" x2="8" y2="6" />
//                       <line x1="3" y1="10" x2="21" y2="10" />
//                     </svg>
//                   </div>
//                   <div>
//                     <div className="summary-field-label">Selected Date</div>
//                     <div className="summary-field-val">{displayDate}</div>
//                   </div>
//                 </div>

//                 <div className="summary-row">
//                   <div className="summary-icon">
//                     <svg
//                       width="14"
//                       height="14"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="#e8501a"
//                       strokeWidth="2.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <circle cx="12" cy="12" r="10" />
//                       <polyline points="12 6 12 12 16 14" />
//                     </svg>
//                   </div>
//                   <div>
//                     <div className="summary-field-label">Selected Time</div>
//                     <div
//                       className={`summary-field-val${!selectedSlot ? " muted" : ""}`}
//                     >
//                       {selectedSlot || "Not selected yet"}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="summary-row">
//                   <div className="summary-icon">
//                     <svg
//                       width="14"
//                       height="14"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="#e8501a"
//                       strokeWidth="2.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <rect x="5" y="2" width="14" height="20" rx="2" />
//                       <line x1="12" y1="6" x2="12" y2="10" />
//                       <line x1="10" y1="8" x2="14" y2="8" />
//                     </svg>
//                   </div>
//                   <div>
//                     <div className="summary-field-label">Duration</div>
//                     <div className="summary-field-val">60 Minutes</div>
//                   </div>
//                 </div>

//                 <hr className="divider" />

//                 <div className="fee-row">
//                   <span className="fee-label">Session Fee</span>
//                   <span className="fee-val">$80.00</span>
//                 </div>
//                 <div className="fee-row">
//                   <span className="fee-label">Platform Fee</span>
//                   <span className="fee-val">$5.00</span>
//                 </div>

//                 <hr className="divider" />

//                 <div className="total-row">
//                   <span className="total-label">Total Amount</span>
//                   <span className="total-val">$85.00</span>
//                 </div>

//                 <button
//                   className={`book-btn${selectedSlot ? " active" : ""}`}
//                   disabled={!selectedSlot}
//                   onClick={() => setShowModal(true)}
//                 >
//                   {selectedSlot ? "Confirm Booking" : "Select a time slot"}
//                 </button>

//                 <div className="secure-note">
//                   <svg
//                     width="12"
//                     height="12"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="#e8501a"
//                     strokeWidth="2.5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <circle cx="12" cy="12" r="10" />
//                     <line x1="12" y1="8" x2="12" y2="12" />
//                     <line x1="12" y1="16" x2="12.01" y2="16" />
//                   </svg>
//                   <span>Your booking is secure and protected</span>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//         {showModal && <BookingConfirmedModal onClose={() => setShowModal(false)} />}
//       </div>
//     </>
//   );
// }
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BookingConfirmedModal from "../../components/modals/BookingConfirmedModal";
import {
  bookSlot,
  resetBookingState,
  getAvailableSlots,
} from "../../features/booking/bookingSlice";

// Aaj se 4 dates generate karo
const generateDates = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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

  return Array.from({ length: 4 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dayLabel =
      i === 0 ? "Today" : i === 1 ? "Tomorrow" : days[d.getDay()];
    const dateLabel = `${d.getDate()} ${months[d.getMonth()]}`;
    // YYYY-MM-DD format for API
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const dateUtc = `${yyyy}-${mm}-${dd}`;
    return { day: dayLabel, date: dateLabel, dateUtc };
  });
};

// UTC time string ko local time mein convert karo (display ke liye)
const utcToLocal = (utcTimeStr, dateUtc) => {
  const [hours, minutes] = utcTimeStr.split(":").map(Number);
  const d = new Date(
    `${dateUtc}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00.000Z`,
  );
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// Slots ko morning/afternoon/evening mein categorize karo (local hour se)
const categorizeSlots = (slots, dateUtc) => {
  const morning = [],
    afternoon = [],
    evening = [];

  slots.forEach((slot) => {
    const [h] = slot.startTimeUtc.split(":").map(Number);
    // UTC hour ko local mein convert karo for categorization
    const d = new Date(`${dateUtc}T${String(h).padStart(2, "0")}:00:00.000Z`);
    const localHour = d.getHours();

    if (localHour < 12) morning.push(slot);
    else if (localHour < 17) afternoon.push(slot);
    else evening.push(slot);
  });

  return { morning, afternoon, evening };
};

export default function SelectSlot() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    bookingLoading,
    bookingSuccess,
    error,
    availableSlots,
    slotsLoading,
  } = useSelector((state) => state.booking);

  const dates = generateDates();
  const duration = localStorage.getItem("selectedDuration") || "60";
  const mode = localStorage.getItem("selectedMode") || "video";

  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedSlot, setSelectedSlot] = useState(null); // poora slot object
  const [showModal, setShowModal] = useState(false);

  // Date change hone par slots fetch karo
  useEffect(() => {
    dispatch(
      getAvailableSlots({
        dateUtc: selectedDate.dateUtc,
        durationMinutes: Number(duration),
      }),
    );
    setSelectedSlot(null); // slot reset karo date change par
  }, [selectedDate, dispatch, duration]);

  // Booking success hone par modal dikhao
  useEffect(() => {
    if (bookingSuccess) {
      setShowModal(true);
      dispatch(resetBookingState());
    }
  }, [bookingSuccess, dispatch]);

  const { morning, afternoon, evening } = categorizeSlots(
    availableSlots || [],
    selectedDate.dateUtc,
  );

  const displayDate =
    selectedDate.day === "Today"
      ? `Today, ${selectedDate.date} ${new Date().getFullYear()}`
      : `${selectedDate.date} ${new Date().getFullYear()}`;

  const handleChange = () => navigate("/therapy-session");

  const handleConfirmBooking = () => {
    if (!selectedSlot) return;
    localStorage.setItem("bookedDate", selectedDate.dateUtc); // "2026-06-02"
    localStorage.setItem(
      "bookedTime",
      utcToLocal(selectedSlot.startTimeUtc, selectedDate.dateUtc),
    );
    dispatch(
      bookSlot({
        slotId: selectedSlot.slotId, // actual ObjectId ✅
        dateUtc: selectedDate.dateUtc, // "YYYY-MM-DD" ✅
        mode, // localStorage se ✅
        durationMinutes: Number(duration), // localStorage se ✅
      }),
    );
  };

  // Slot buttons render karne ka helper
  const renderSlots = (slotList) => {
    if (slotsLoading) {
      return (
        <div style={{ color: "#aaa", fontSize: "13px" }}>Loading slots...</div>
      );
    }
    if (slotList.length === 0) {
      return (
        <div style={{ color: "#aaa", fontSize: "13px" }}>
          No slots available
        </div>
      );
    }
    return slotList.map((s) => (
      <button
        key={s.slotId}
        className={`slot-chip${selectedSlot?.slotId === s.slotId ? " selected" : ""}`}
        onClick={() => setSelectedSlot(s)}
      >
        {utcToLocal(s.startTimeUtc, selectedDate.dateUtc)}
      </button>
    ));
  };

  return (
    <>
      <div className="serene-app">
        <div className="body">
          <main className="main-content1">
            <div className="left-col">
              {/* Duration Banner */}
              <div className="duration-banner">
                <div className="dur-left">
                  <div className="dur-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#030f25"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <div className="dur-label">Selected Duration</div>
                    <div className="dur-title">{duration} Minutes Session</div>
                    <div className="dur-sub">Standard consultation length</div>
                  </div>
                </div>
                <button className="change-btn" onClick={handleChange}>
                  Change Duration
                </button>
              </div>

              {/* Select Date */}
              <div className="card">
                <div className="card-title">Select Date</div>
                <div className="date-grid">
                  {dates.map((d) => (
                    <div
                      key={d.date}
                      className={`date-chip${selectedDate.date === d.date ? " selected" : ""}`}
                      onClick={() => setSelectedDate(d)}
                    >
                      <div className="date-day">{d.day}</div>
                      <div className="date-num">{d.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Morning Slots */}
              <div className="slot-group">
                <div className="slot-group-hdr">
                  <span
                    className="slot-icon"
                    style={{
                      backgroundColor: "rgba(255, 251, 235, 1)",
                      borderRadius: "8px",
                    }}
                  >
                    ☀️
                  </span>
                  <span className="slot-group-title">Morning Slots</span>
                </div>
                <div className="slots-row">{renderSlots(morning)}</div>
              </div>

              {/* Afternoon Slots */}
              <div className="slot-group">
                <div className="slot-group-hdr">
                  <span
                    className="slot-icon"
                    style={{
                      backgroundColor: "rgba(255, 247, 237, 1)",
                      borderRadius: "8px",
                    }}
                  >
                    🌤️
                  </span>
                  <span className="slot-group-title">Afternoon Slots</span>
                </div>
                <div className="slots-row">{renderSlots(afternoon)}</div>
              </div>

              {/* Evening Slots */}
              <div className="slot-group">
                <div className="slot-group-hdr">
                  <span
                    className="slot-icon"
                    style={{
                      backgroundColor: "rgba(238, 242, 255, 1)",
                      borderRadius: "8px",
                    }}
                  >
                    🌙
                  </span>
                  <span className="slot-group-title">Evening Slots</span>
                </div>
                <div className="slots-row">{renderSlots(evening)}</div>
              </div>
            </div>

            {/* BOOKING SUMMARY */}
            <div className="summary-col">
              <div className="summary-card">
                <div className="summary-title">Booking Summary</div>

                <div className="summary-row">
                  <div className="summary-icon">
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
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <div className="summary-field-label">Selected Date</div>
                    <div className="summary-field-val">{displayDate}</div>
                  </div>
                </div>

                <div className="summary-row">
                  <div className="summary-icon">
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
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <div className="summary-field-label">Selected Time</div>
                    <div
                      className={`summary-field-val${!selectedSlot ? " muted" : ""}`}
                    >
                      {selectedSlot
                        ? utcToLocal(
                            selectedSlot.startTimeUtc,
                            selectedDate.dateUtc,
                          )
                        : "Not selected yet"}
                    </div>
                  </div>
                </div>

                <div className="summary-row">
                  <div className="summary-icon">
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
                      <rect x="5" y="2" width="14" height="20" rx="2" />
                      <line x1="12" y1="6" x2="12" y2="10" />
                      <line x1="10" y1="8" x2="14" y2="8" />
                    </svg>
                  </div>
                  <div>
                    <div className="summary-field-label">Duration</div>
                    <div className="summary-field-val">{duration} Minutes</div>
                  </div>
                </div>

                <hr className="divider" />

                <div className="fee-row">
                  <span className="fee-label">Session Fee</span>
                  <span className="fee-val">-</span>
                </div>
                <div className="fee-row">
                  <span className="fee-label">Platform Fee</span>
                  <span className="fee-val">-</span>
                </div>

                <hr className="divider" />

                <div className="total-row">
                  <span className="total-label">Total Amount</span>
                  <span className="total-val">-</span>
                </div>

                {error && (
                  <div
                    style={{
                      color: "#ff4d4d",
                      fontSize: "12px",
                      marginBottom: "8px",
                      textAlign: "center",
                    }}
                  >
                    {error}
                  </div>
                )}

                <button
                  className={`book-btn${selectedSlot ? " active" : ""}`}
                  disabled={!selectedSlot || bookingLoading}
                  onClick={handleConfirmBooking}
                >
                  {bookingLoading
                    ? "Booking..."
                    : selectedSlot
                      ? "Confirm Booking"
                      : "Select a time slot"}
                </button>

                <div className="secure-note">
                  <svg
                    width="12"
                    height="12"
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
                  <span>Your booking is secure and protected</span>
                </div>
              </div>
            </div>
          </main>
        </div>
        {showModal && (
          <BookingConfirmedModal onClose={() => setShowModal(false)} />
        )}
      </div>
    </>
  );
}
