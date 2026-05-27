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

// const ChatToText = () => {
//   const dispatch = useDispatch();
//   const { chatId } = useParams();

//   const { t } = useTranslation();
//   const [input, setInput] = useState("");
//   // const [tempMessages, setTempMessages] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);

//   const {
//     chatList = [],
//     messages = [],
//     tempMessages = [],
//     selectedChatId,
//     loading,
//   } = useSelector((state) => state.chat || {});
//   const allMessages = [...messages, ...tempMessages].sort(
//     (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
//   );

//   // ✅ set active chat + load history
//   useEffect(() => {
//     if (chatId) {
//       dispatch(setChatId(chatId));
//       dispatch(getChatHistory(chatId));
//     }
//   }, [chatId]);

//   // useEffect(() => {
//   //   if (messages.length > 0) {
//   //     setTempMessages([]);
//   //   }
//   // }, [messages]);

//   // ✅ load sidebar chats
//   useEffect(() => {
//     dispatch(getChatList());
//   }, [dispatch]);

//   // ✅ send message
//   // const handleSend = () => {
//   //   if (!input.trim() || !chatId) return;

//   //   const tempId = Date.now();

//   //   const langCode = localStorage.getItem("lang") || "en";
//   //   const language = languageMap[langCode] || "english";

//   //   const tempMessage = {
//   //     _id: tempId,
//   //     role: "user",
//   //     content: input,
//   //     createdAt: new Date().toISOString(),
//   //     status: "sending",
//   //   };

//   //   // 👇 instant UI
//   //   dispatch(addTempMessage(tempMessage));

//   //   dispatch(
//   //     sendMessage({
//   //       chatId,
//   //       message: input,
//   //       language,
//   //       tempId,
//   //     }),
//   //   );

//   //   setInput("");
//   // };

//   const handleSend = () => {
//     if (!input.trim() || !chatId) return;

//     const tempId = Date.now();
//     const botTempId = tempId + "_bot";

//     const langCode = localStorage.getItem("lang") || "en";
//     const language = languageMap[langCode] || "english";

//     // ✅ user message (right side)
//     dispatch(
//       addTempMessage({
//         _id: tempId,
//         role: "user",
//         content: input,
//         createdAt: new Date().toISOString(),
//         status: "sending",
//       }),
//     );

//     // ✅ bot typing (...) (left side)
//     dispatch(
//       addTempMessage({
//         _id: botTempId,
//         role: "bot",
//         content: "...",
//         status: "typing",
//         createdAt: new Date().toISOString(),
//       }),
//     );

//     // ✅ API call
//     dispatch(
//       sendMessage({
//         chatId,
//         message: input,
//         language,
//         tempId,
//         botTempId, // 👈 IMPORTANT
//       }),
//     );

//     setInput("");
//   };

//   // ✅ sidebar click chat
//   const handleOpenChat = (id) => {
//     dispatch(setChatId(id));
//     dispatch(getChatHistory(id));
//   };

//   const languageMap = {
//     en: "english",
//     hi: "hindi",
//     bn: "bengali",
//     or: "odia",
//     as: "assamese",
//     ml: "malayalam",
//     ta: "tamil",
//   };

//   return (
//     <div style={{ display: "flex" }}>
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
//                 <p>{t("startConversationDesc")}</p>
//                 {/* <h2>Start a Conversation</h2>
//                 <p>Type your message to begin chatting</p> */}
//               </div>
//             ) : (
//               allMessages.map((msg, index) => {
//   const isValidDate = msg?.createdAt && !isNaN(new Date(msg.createdAt));

//   return (
//     <div
//       key={msg._id || index}
//       className={`message ${msg.role === "user" ? "user" : "bot"} ${msg.status === "sending" ? "temp" : ""}`}
//     >
//       <div className="message-content">
//         <p className={`message-text ${msg.status === "typing" ? "typing" : ""}`}>
//           {msg.status === "typing" ? (
//             <><span></span><span></span><span></span></>
//           ) : (
//             msg.content || msg.text || "No message"
//           )}
//         </p>
//         {isValidDate && (
//           <span className="message-time">
//             {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//           </span>
//         )}
//       </div>
//     </div>
//   );
// })
//             )}
//           </div>
//           {/* <p
//             className={`message-text ${msg.status === "typing" ? "typing" : ""}`}
//           >
//             {msg.status === "typing" ? (
//               <>
//                 <span>.</span>
//                 <span>.</span>
//                 <span>.</span>
//               </>
//             ) : (
//               msg.content || msg.text || "No message"
//             )}
//           </p> */}
//           {/* ================= INPUT ================= */}
//           <div className="chat-input-container">
//             <div className="chat-input-wrapper">
//               <input
//                 type="text"
//                 className="chat-input"
//                 placeholder="Type message..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") handleSend();
//                 }}
//               />

//               <div className="input-actions">
//                 <button className="input-btn" onClick={handleSend}>
//                   Send
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatToText;

import React, { useEffect, useState, useRef } from "react";
import ChatSidebar from "./ChatSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatList,
  getChatHistory,
  sendMessage,
  setChatId,
  addTempMessage,
} from "../../../features/chat/chatSlice";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ChatToText = () => {
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  

  const {
    chatList = [],
    messages = [],
    tempMessages = [],
    selectedChatId,
    loading,
  } = useSelector((state) => state.chat || {});

  const allMessages = [...messages, ...tempMessages].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  );

  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [allMessages]);

  useEffect(() => {
    if (chatId) {
      dispatch(setChatId(chatId));
      dispatch(getChatHistory(chatId));
    }
  }, [chatId]);

  useEffect(() => {
    dispatch(getChatList());
  }, [dispatch]);

  const languageMap = {
    en: "english",
    hi: "hindi",
    bn: "bengali",
    or: "odia",
    as: "assamese",
    ml: "malayalam",
    ta: "tamil",
  };

  const handleSend = () => {
    if (!input.trim() || !chatId) return;

    const tempId = Date.now();
    const botTempId = tempId + "_bot";
    const langCode = localStorage.getItem("lang") || "en";
    const language = languageMap[langCode] || "english";

    dispatch(
      addTempMessage({
        _id: tempId,
        role: "user",
        content: input,
        createdAt: new Date().toISOString(),
        status: "sending",
      }),
    );

    dispatch(
      addTempMessage({
        _id: botTempId,
        role: "bot",
        content: "...",
        status: "typing",
        createdAt: new Date().toISOString(),
      }),
    );

    dispatch(
      sendMessage({ chatId, message: input, language, tempId, botTempId }),
    );
    setInput("");
  };

  const handleOpenChat = (id) => {
    dispatch(setChatId(id));
    dispatch(getChatHistory(id));
  };

  return (
    <div>
      {/* SIDEBAR */}
      <ChatSidebar
        chatList={chatList}
        onSelectChat={handleOpenChat}
        selectedChatId={selectedChatId}
      />

      {/* MAIN CHAT */}
      <div className="main-content" style={{padding: 0,width: "-webkit-fill-available"}}>
        <div
          className="connection-container"
          style={{
            backgroundImage: "url(/images/chat-bg.png)",
            display: "flex",
            flexDirection: "column",
            height: "87vh",
            overflow: "hidden",
          }}
        >
          {/* MESSAGES */}
          <div
            className="chat-messages"
            style={{
              flex: 1,
              overflowY: "auto",
              // padding: "16px 0",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              minHeight: 0,
            }}
          >
            {allMessages.length === 0 ? (
              <div className="empty-chat-state">
                <div className="empty-icon">💬</div>
                <h2>{t("startConversationTitle")}</h2>
                <p>{t("startConversationDesc")}</p>
              </div>
            ) : (
              allMessages.map((msg, index) => {
                const isUser = msg.role === "user";
                const isTyping = msg.status === "typing";
                const isValidDate =
                  msg?.createdAt && !isNaN(new Date(msg.createdAt));

                return (
                  <div
                    key={msg._id || index}
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: isUser ? "flex-end" : "flex-start",
                      padding: "2px 20px",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "60%",
                        minWidth: "60px",
                        padding: "10px 14px",
                        borderRadius: isUser
                          ? "16px 16px 4px 16px"
                          : "16px 16px 16px 4px",
                        fontSize: "14px",
                        lineHeight: "1.55",
                        wordBreak: "break-word",
                        boxSizing: "border-box",
                        background: isUser ? "#030f25" : "rgb(97 135 246)",
                        color: isUser ? "#ffffff" : "#1a1a2e",
                        // border: isUser ? "none" : "1px solid #e4e6ea",
                        border:"1px solid #fff",
                      }}
                    >
                      {/* Message text / typing dots */}
                      {isTyping ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            minHeight: "18px",
                          }}
                        >
                          {[0, 0.2, 0.4].map((delay, i) => (
                            <span
                              key={i}
                              style={{
                                display: "inline-block",
                                width: "7px",
                                height: "7px",
                                borderRadius: "50%",
                                background: "#999",
                                animation: `typingBounce 1.2s ${delay}s infinite`,
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <p style={{ margin: 0, padding: 0 , textAlign: "left"}}>
                          {msg.content || msg.text || "No message"}
                        </p>
                      )}

                      {/* Timestamp */}
                      {isValidDate && !isTyping && (
                        <span
                          style={{
                            display: "block",
                            fontSize: "10px",
                            marginTop: "4px",
                            opacity: 0.65,
                            textAlign: isUser ? "right" : "left",
                            color: isUser ? "#ffffff" : "#030f25",
                          }}
                        >
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div ref={messagesEndRef} />

          {/* INPUT */}
          <div
            style={{
              padding: "12px 16px",
              background: "rgb(3 15 37)",
              borderTop: "1px solid #e4e6ea",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#f0f2f5",
                borderRadius: "24px",
                padding: "6px 6px 6px 16px",
              }}
            >
              <input
                type="text"
                placeholder="Type message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                style={{
                  flex: 1,
                  border: "none",
                  background: "transparent",
                  fontSize: "14px",
                  outline: "none",
                  color: "#1a1a2e",
                }}
              />
              <button
                onClick={handleSend}
                style={{
                  background: "rgb(3 15 37)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  cursor: "pointer",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Typing animation keyframes */}
      <style>{`
        @keyframes typingBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ChatToText;
