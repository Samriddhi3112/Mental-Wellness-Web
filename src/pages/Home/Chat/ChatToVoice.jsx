// import React, { useEffect, useState } from "react";
// import ChatSidebar from "./ChatSidebar";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getChatList,
//   getChatHistory,
//   sendMessage,
//   setChatId,
// } from "../../../features/chat/chatSlice";
// import { useParams } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// const ChatToVoice = () => {
//   const dispatch = useDispatch();
//   const { chatId } = useParams();
//   const { t } = useTranslation();
//   const [isListening, setIsListening] = useState(false);
//   const [recognition, setRecognition] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [tempMessages, setTempMessages] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);

//   const [input, setInput] = useState("");

//   const {
//     chatList = [],
//     messages = [],
//     selectedChatId,
//     loading,
//   } = useSelector((state) => state.chat || {});

//   const languageMap = {
//     en: "english",
//     hi: "hindi",
//     bn: "bengali",
//     or: "odia",
//     as: "assamese",
//     ml: "malayalam",
//     ta: "tamil",
//   };

//   // ✅ set active chat + load history
//   useEffect(() => {
//     if (chatId) {
//       dispatch(setChatId(chatId));
//       dispatch(getChatHistory(chatId));
//     }
//   }, [chatId]);

//   // ✅ load sidebar chats
//   useEffect(() => {
//     dispatch(getChatList());
//   }, [dispatch]);

//   // ✅ send message
//   const handleSend = () => {
//     if (!input.trim() || !chatId) return;

//     const langCode = localStorage.getItem("lang") || "en";
//     const language = languageMap[langCode] || "english";

//     dispatch(
//       sendMessage({
//         chatId,
//         message: input,
//         language,
//       }),
//     );

//     setInput("");
//   };

//   const SpeechRecognition =
//     window.SpeechRecognition || window.webkitSpeechRecognition;

//   // ✅ sidebar click chat
//   const handleOpenChat = (id) => {
//     dispatch(setChatId(id));
//     dispatch(getChatHistory(id));
//   };

//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Speech Recognition not supported");
//       return;
//     }

//     const recog = new SpeechRecognition();
//     recog.continuous = false;
//     recog.interimResults = false;
//     recog.lang = "en-US";

//     recog.onstart = () => setIsListening(true);

//     recog.onend = () => {
//       setIsListening(false);
//       setShowModal(false); // 👈 close after end
//     };

//     recog.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setInput(transcript);
//     };

//     setRecognition(recog);

//     // ❌ REMOVE THIS
//     // recog.start();
//   }, []);

//   const handleMicClick = () => {
//     if (!recognition) return;

//     if (!isListening) {
//       setShowModal(true); // 👈 FORCE OPEN
//       recognition.start();
//     } else {
//       recognition.stop();
//       setShowModal(false);
//     }
//   };
//   console.log("isListening:", isListening);
//   console.log("recognition:", recognition);

//   return (
//     <div>
//       {/* ================= SIDEBAR ================= */}
//       <ChatSidebar
//         chatList={chatList}
//         onSelectChat={handleOpenChat}
//         selectedChatId={selectedChatId}
//       />

//       {/* ================= MAIN CHAT ================= */}
//       <div className="main-content">
//         <div
//           className="connection-container"
//           style={{ backgroundImage: "url(/images/chat-bg.png)" }}
//         >
//           {/* ================= MESSAGES ================= */}
//           <div className="chat-messages">
//             {!Array.isArray(messages) || messages.length === 0 ? (
//               <div className="empty-chat-state">
//                 <div className="empty-icon">💬</div>
//                 {/* <h2>Start a Conversation</h2> */}
//                 <h2>{t("startConversationTitle")}</h2>
//                 <p>{t("startConversationSpeak")}</p>
//               </div>
//             ) : (
//               messages.map((msg, index) => {
//                 const isValidDate =
//                   msg?.createdAt && !isNaN(new Date(msg.createdAt));

//                 return (
//                   <div
//                     key={msg._id || index}
//                     className={`message ${
//                       msg.role === "user" ? "user" : "bot"
//                     }`}
//                   >
//                     <div className="message-content">
//                       <p className="message-text">
//                         {msg.content || msg.text || "No message"}
//                       </p>

//                       {isValidDate && (
//                         <span className="message-time">
//                           {new Date(msg.createdAt).toLocaleString()}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//           {/* ================= INPUT ================= */}
//           <div className="chat-input-container">
//             <div className="chat-input-wrapper">
//               <input
//                 type="text"
//                 className="chat-input"
//                 placeholder="Type or speak your message..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") handleSend();
//                 }}
//               />

//               <button
//                 className={`mic-btn ${isListening ? "active" : ""}`}
//                 onClick={handleMicClick}
//               >
//                 <span className="mic-icon">🎤</span>
//               </button>

//               <button className="send-btn" onClick={handleSend}>
//                 ➤
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       {showModal && (
//         <div className="voice-overlay">
//           <h1>LISTENING UI</h1>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatToVoice;

//-------------------------------------------

// import React, { useEffect, useState } from "react";
// import ChatSidebar from "./ChatSidebar";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getChatList,
//   getChatHistory,
//   sendMessage,
//   setChatId,
//   addTempMessage,
// } from "../../../features/chat/chatSlice";
// import { useParams } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// const ChatToVoice = () => {
//   const dispatch = useDispatch();
//   const { chatId } = useParams();
//   const { t } = useTranslation();

//   const [isListening, setIsListening] = useState(false);
//   const [recognition, setRecognition] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [input, setInput] = useState("");

//   const {
//     chatList = [],
//     messages = [],
//     tempMessages = [],
//     selectedChatId,
//   } = useSelector((state) => state.chat || {});

//   const allMessages = [...messages, ...tempMessages].sort(
//     (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
//   );

//   const languageMap = {
//     en: "english",
//     hi: "hindi",
//     bn: "bengali",
//     or: "odia",
//     as: "assamese",
//     ml: "malayalam",
//     ta: "tamil",
//   };

//   // ================= LOAD CHAT =================
//   useEffect(() => {
//     if (chatId) {
//       dispatch(setChatId(chatId));
//       dispatch(getChatHistory(chatId));
//     }
//   }, [chatId]);

//   useEffect(() => {
//     dispatch(getChatList());
//   }, [dispatch]);

//   // ================= SEND MESSAGE =================
//   const handleSend = () => {
//     if (!input.trim() || !chatId) return;

//     const tempId = Date.now();
//     const botTempId = tempId + "_bot";

//     const langCode = localStorage.getItem("lang") || "en";
//     const language = languageMap[langCode] || "english";

//     // 👤 user message
//     dispatch(
//       addTempMessage({
//         _id: tempId,
//         role: "user",
//         content: input,
//         createdAt: new Date().toISOString(),
//         status: "sending",
//       })
//     );

//     // 🤖 bot typing message
//     dispatch(
//       addTempMessage({
//         _id: botTempId,
//         role: "bot",
//         content: "...",
//         createdAt: new Date().toISOString(),
//         status: "typing",
//       })
//     );

//     dispatch(
//       sendMessage({
//         chatId,
//         message: input,
//         language,
//         tempId,
//         botTempId,
//       })
//     );

//     setInput("");
//   };

//   // ================= CHAT OPEN =================
//   const handleOpenChat = (id) => {
//     dispatch(setChatId(id));
//     dispatch(getChatHistory(id));
//   };

//   // ================= SPEECH RECOGNITION =================
//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) return;

//     const recog = new SpeechRecognition();
//     recog.continuous = false;
//     recog.interimResults = false;
//     recog.lang = "en-US";

//     recog.onstart = () => setIsListening(true);

//     recog.onend = () => {
//       setIsListening(false);
//       setShowModal(false);
//     };

//     recog.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setInput(transcript);
//     };

//     setRecognition(recog);
//   }, []);

//   const handleMicClick = () => {
//     if (!recognition) return;

//     if (!isListening) {
//       setShowModal(true);
//       recognition.start();
//     } else {
//       recognition.stop();
//       setShowModal(false);
//     }
//   };

//   return (
//     <div>
//       {/* ================= SIDEBAR ================= */}
//       <ChatSidebar
//         chatList={chatList}
//         onSelectChat={handleOpenChat}
//         selectedChatId={selectedChatId}
//       />

//       {/* ================= MAIN CHAT ================= */}
//       <div className="main-content">
//         <div
//           className="connection-container"
//           style={{ backgroundImage: "url(/images/chat-bg.png)" }}
//         >
//           {/* ================= MESSAGES ================= */}
//           <div className="chat-messages">
//             {!Array.isArray(messages) || messages.length === 0 ? (
//               <div className="empty-chat-state">
//                 <div className="empty-icon">💬</div>
//                 <h2>{t("startConversationTitle")}</h2>
//                 <p>{t("startConversationSpeak")}</p>
//               </div>
//             ) : (
//               allMessages.map((msg, index) => {
//                 const isValidDate =
//                   msg?.createdAt && !isNaN(new Date(msg.createdAt));

//                 return (
//                   <div
//                     key={msg._id || index}
//                     className={`message ${
//                       msg.role === "user" ? "user" : "bot"
//                     } ${msg.status === "sending" ? "temp" : ""}`}
//                   >
//                     <div className="message-content">
//                       <p
//                         className={`message-text ${
//                           msg.status === "typing" ? "typing" : ""
//                         }`}
//                       >
//                         {msg.status === "typing" ? (
//                           <>
//                             <span>.</span>
//                             <span>.</span>
//                             <span>.</span>
//                           </>
//                         ) : (
//                           msg.content || msg.text || "No message"
//                         )}
//                       </p>

//                       {isValidDate && (
//                         <span className="message-time">
//                           {new Date(msg.createdAt).toLocaleString()}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>

//           {/* ================= INPUT ================= */}
//           <div className="chat-input-container">
//             <div className="chat-input-wrapper">
//               <input
//                 type="text"
//                 className="chat-input"
//                 placeholder="Type or speak your message..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") handleSend();
//                 }}
//               />

//               <button
//                 className={`mic-btn ${isListening ? "active" : ""}`}
//                 onClick={handleMicClick}
//               >
//                 🎤
//               </button>

//               <button className="send-btn" onClick={handleSend}>
//                 ➤
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= VOICE MODAL ================= */}
//       {showModal && (
//         <div className="voice-overlay">
//           <h1>LISTENING...</h1>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatToVoice;

import React, { useEffect, useRef, useState } from "react";
import ChatSidebar from "./ChatSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatList,
  getChatHistory,
  sendMessage,
  setChatId,
  addTempMessage,
} from "../../../features/chat/chatSlice";

import { synthesizeSpeech } from "../../../features/chat/chatSlice";

import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ChatToVoice = () => {
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const { t } = useTranslation();

  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");

  // ✅ duplicate speech avoid krne ke liye
  const spokenMessagesRef = useRef(new Set());

  const {
    chatList = [],
    messages = [],
    tempMessages = [],
    selectedChatId,
  } = useSelector((state) => state.chat || {});

  const allMessages = [...messages, ...tempMessages].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  );

  const languageMap = {
    en: "english",
    hi: "hindi",
    bn: "bengali",
    or: "odia",
    as: "assamese",
    ml: "malayalam",
    ta: "tamil",
  };

  // ================= LOAD CHAT =================
  useEffect(() => {
    if (chatId) {
      dispatch(setChatId(chatId));
      dispatch(getChatHistory(chatId));
    }
  }, [chatId]);

  useEffect(() => {
    dispatch(getChatList());
  }, [dispatch]);

  // ================= TEXT TO SPEECH =================
  useEffect(() => {
    if (!allMessages.length) return;

    const lastMessage = allMessages[allMessages.length - 1];

    // ✅ sirf bot message bole
    if (lastMessage?.role !== "bot") return;

    // ✅ typing state skip
    if (lastMessage?.status === "typing") return;

    // ✅ duplicate speech avoid
    if (spokenMessagesRef.current.has(lastMessage._id)) return;

    const speakMessage = async () => {
      try {
        spokenMessagesRef.current.add(lastMessage._id);

        const response = await dispatch(
          synthesizeSpeech({
            text: lastMessage.content || lastMessage.text,
            target_language_code: "hi-IN",
            speaker: "shubh",
            output_audio_codec: "mp3",
          }),
        ).unwrap();

        console.log("TTS RESPONSE =>", response);

        // ✅ base64 audio extract
        const audioBase64 =
          response?.data?.audioBase64 || response?.data?.audios?.[0];

        if (!audioBase64) {
          console.log("No audio found");
          return;
        }

        // ✅ mp3 base64 ko playable audio banana
        const audioSrc = `data:audio/mp3;base64,${audioBase64}`;

        const audio = new Audio(audioSrc);

        audio.play().catch((err) => {
          console.log("Audio play error:", err);
        });
      } catch (error) {
        console.log("TTS Error:", error);
      }
    };

    speakMessage();
  }, [allMessages, dispatch]);

  // ================= SEND MESSAGE =================
  const handleSend = () => {
    if (!input.trim() || !chatId) return;

    const tempId = Date.now();
    const botTempId = tempId + "_bot";

    const langCode = localStorage.getItem("lang") || "en";
    const language = languageMap[langCode] || "english";

    // 👤 user message
    dispatch(
      addTempMessage({
        _id: tempId,
        role: "user",
        content: input,
        createdAt: new Date().toISOString(),
        status: "sending",
      }),
    );

    // 🤖 bot typing
    dispatch(
      addTempMessage({
        _id: botTempId,
        role: "bot",
        content: "...",
        createdAt: new Date().toISOString(),
        status: "typing",
      }),
    );

    dispatch(
      sendMessage({
        chatId,
        message: input,
        language,
        tempId,
        botTempId,
      }),
    );

    setInput("");
  };

  // ================= CHAT OPEN =================
  const handleOpenChat = (id) => {
    dispatch(setChatId(id));
    dispatch(getChatHistory(id));
  };

  // ================= SPEECH RECOGNITION =================
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recog = new SpeechRecognition();
    recog.continuous = false;
    recog.interimResults = false;
    recog.lang = "en-US";

    recog.onstart = () => setIsListening(true);

    recog.onend = () => {
      setIsListening(false);
      setShowModal(false);
    };

    recog.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    setRecognition(recog);
  }, []);

  const handleMicClick = () => {
    if (!recognition) return;

    if (!isListening) {
      setShowModal(true);
      recognition.start();
    } else {
      recognition.stop();
      setShowModal(false);
    }
  };

  return (
    <div>
      <ChatSidebar
        chatList={chatList}
        onSelectChat={handleOpenChat}
        selectedChatId={selectedChatId}
      />

      <div
        className="main-content"
        style={{
          padding: "10px",
          width: "-webkit-fill-available",
          marginTop: "67px",
          height: "auto",
          minHeight: "calc(100vh - 67px)",
        }}
      >
        <div
          className="connection-container"
          style={{
            backgroundImage: "url(/images/chat-bg.png)",
            display: "flex",
            flexDirection: "column",

            overflow: "hidden",
          }}
        >
          {/* ================= MESSAGES ================= */}
          <div
            className="chat-messages"
            style={{
              flex: 1,
              overflowY: "auto",
              // padding: "16px 0",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              minHeight: "calc(-160px + 100vh)",
              maxHeight: "calc(100vh - 160px)",
            }}
          >
            {!Array.isArray(messages) || messages.length === 0 ? (
              <div className="empty-chat-state">
                <div className="empty-icon">💬</div>
                <h2>{t("startConversationTitle")}</h2>
                <p>{t("startConversationSpeak")}</p>
              </div>
            ) : (
              allMessages.map((msg, index) => {
                const isValidDate =
                  msg?.createdAt && !isNaN(new Date(msg.createdAt));

                return (
                  <div
                    key={msg._id || index}
                    className={`message ${
                      msg.role === "user" ? "user" : "bot"
                    } ${msg.status === "sending" ? "temp" : ""}`}
                  >
                    <div className="message-content">
                      <p
                        className={`message-text ${
                          msg.status === "typing" ? "typing" : ""
                        }`}
                      >
                        {msg.status === "typing" ? (
                          <>
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                          </>
                        ) : (
                          msg.content || msg.text || "No message"
                        )}
                      </p>

                      {isValidDate && (
                        <span
                          className="message-time"
                          style={{
                            display: "block",
                            fontSize: "10px",
                            marginTop: "4px",
                            opacity: 0.65,
                          }}
                        >
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* ================= INPUT ================= */}
          <div className="chat-input-container">
            <div className="chat-input-wrapper">
              <input
                type="text"
                className="chat-input"
                placeholder="Type or speak your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
              />

              <button
                className={`mic-btn ${isListening ? "active" : ""}`}
                onClick={handleMicClick}
              >
                🎤
              </button>

              <button
                className="send-btn"
                style={{ backgroundColor: "#030f25" }}
                onClick={handleSend}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= VOICE MODAL ================= */}
      {showModal && (
        <div className="voice-overlay">
          <h1>LISTENING...</h1>
        </div>
      )}
    </div>
  );
};

export default ChatToVoice;
