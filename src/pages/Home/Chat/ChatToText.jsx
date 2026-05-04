import React, { useEffect, useState } from "react";
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
  // const [tempMessages, setTempMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const {
    chatList = [],
    messages = [],
    tempMessages = [],
    selectedChatId,
    loading,
  } = useSelector((state) => state.chat || {});
  const allMessages = [...messages, ...tempMessages].sort(
  (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
);

  // ✅ set active chat + load history
  useEffect(() => {
    if (chatId) {
      dispatch(setChatId(chatId));
      dispatch(getChatHistory(chatId));
    }
  }, [chatId]);

  // useEffect(() => {
  //   if (messages.length > 0) {
  //     setTempMessages([]);
  //   }
  // }, [messages]);

  // ✅ load sidebar chats
  useEffect(() => {
    dispatch(getChatList());
  }, [dispatch]);

  // ✅ send message
  // const handleSend = () => {
  //   if (!input.trim() || !chatId) return;

  //   const tempId = Date.now();

  //   const langCode = localStorage.getItem("lang") || "en";
  //   const language = languageMap[langCode] || "english";

  //   const tempMessage = {
  //     _id: tempId,
  //     role: "user",
  //     content: input,
  //     createdAt: new Date().toISOString(),
  //     status: "sending",
  //   };

  //   // 👇 instant UI
  //   dispatch(addTempMessage(tempMessage));

  //   dispatch(
  //     sendMessage({
  //       chatId,
  //       message: input,
  //       language,
  //       tempId,
  //     }),
  //   );

  //   setInput("");
  // };

  const handleSend = () => {
  if (!input.trim() || !chatId) return;

  const tempId = Date.now();
  const botTempId = tempId + "_bot";

  const langCode = localStorage.getItem("lang") || "en";
  const language = languageMap[langCode] || "english";

  // ✅ user message (right side)
  dispatch(addTempMessage({
    _id: tempId,
    role: "user",
    content: input,
    createdAt: new Date().toISOString(),
    status: "sending",
  }));

  // ✅ bot typing (...) (left side)
  dispatch(addTempMessage({
    _id: botTempId,
    role: "bot",
    content: "...",
    status: "typing",
    createdAt: new Date().toISOString(),
  }));

  // ✅ API call
  dispatch(sendMessage({
    chatId,
    message: input,
    language,
    tempId,
    botTempId, // 👈 IMPORTANT
  }));

  setInput("");
};

  // ✅ sidebar click chat
  const handleOpenChat = (id) => {
    dispatch(setChatId(id));
    dispatch(getChatHistory(id));
  };

  const languageMap = {
    en: "english",
    hi: "hindi",
    bn: "bengali",
    or: "odia",
    as: "assamese",
    ml: "malayalam",
    ta: "tamil",
  };

  return (
    <div style={{ display: "flex" }}>
      {/* ================= SIDEBAR ================= */}
      <ChatSidebar
        chatList={chatList}
        onSelectChat={handleOpenChat}
        selectedChatId={selectedChatId}
      />

      {/* ================= MAIN CHAT ================= */}
      <div className="main-content">
        <div
          className="connection-container"
          style={{ backgroundImage: "url(/images/chat-bg.png)" }}
        >
          {/* ================= MESSAGES ================= */}
          <div className="chat-messages">
            {!Array.isArray(messages) || messages.length === 0 ? (
              <div className="empty-chat-state">
                <div className="empty-icon">💬</div>
                <h2>{t("startConversationTitle")}</h2>
                <p>{t("startConversationDesc")}</p>
                {/* <h2>Start a Conversation</h2>
                <p>Type your message to begin chatting</p> */}
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
          <span className="message-time">
            {new Date(msg.createdAt).toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
})
            )}
          </div>
          {/* <p
            className={`message-text ${msg.status === "typing" ? "typing" : ""}`}
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
          </p> */}
          {/* ================= INPUT ================= */}
          <div className="chat-input-container">
            <div className="chat-input-wrapper">
              <input
                type="text"
                className="chat-input"
                placeholder="Type message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
              />

              <div className="input-actions">
                <button className="input-btn" onClick={handleSend}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatToText;
