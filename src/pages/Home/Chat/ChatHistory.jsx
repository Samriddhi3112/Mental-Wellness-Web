import React, { useEffect } from "react";
import ChatSidebar from "./ChatSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatList,
  getChatHistory,
  setChatId,
} from "../../../features/chat/chatSlice";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ChatHistory = () => {
  const dispatch = useDispatch();
  const { chatId } = useParams();
    const { t } = useTranslation();

  const {
    chatList = [],
    messages = [],
    selectedChatId,
    loading,
  } = useSelector((state) => state.chat || {});
  console.log("m", messages);
  console.log("c", chatList);

  // ✅ Load sidebar chats
  useEffect(() => {
    dispatch(getChatList());
  }, [dispatch]);

  useEffect(() => {
    if (chatId) {
      dispatch(setChatId(chatId));
      dispatch(getChatHistory(chatId));
    }
  }, [chatId, dispatch]);

  // ✅ When chat changes → load history
  //   useEffect(() => {
  //     if (selectedChatId) {
  //       dispatch(getChatHistory(selectedChatId));
  //     }
  //   }, [selectedChatId, dispatch]);

  // ✅ Sidebar click
  const handleOpenChat = (id) => {
    console.log("CLICKED ID:", id); // 👈 check
    dispatch(setChatId(id));
    dispatch(getChatHistory(id));
  };

  console.log("selectedChatId:", selectedChatId);

  return (
    <div style={{ display: "flex" }}>
      <ChatSidebar
        chatList={chatList}
        onSelectChat={handleOpenChat}
        selectedChatId={selectedChatId}
      />

      <div className="main-content">
        <div
          className="connection-container"
          style={{ backgroundImage: "url(/images/chat-bg.png)" }}
        >
          <div className="chat-messages" style={{ width: "77rem" }}>
            {messages.length === 0 ? (
              <div className="empty-chat-state">
                <div className="empty-icon">💬</div>
                <h3>{t("noChatHistoryTitle")}</h3>
                <p>{t("noChatHistoryDesc")}</p>
                {/* <h3>No Chat History</h3>
                <p>Select a chat or start a new conversation</p> */}
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`chat-row ${msg.role === "user" ? "user" : "bot"}`}
                >
                  <div className="chat-bubble">
                    <p className="chat-text">{msg.content}</p>

                    <div className="chat-meta">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
