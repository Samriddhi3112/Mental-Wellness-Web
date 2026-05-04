import React, { useState } from "react";
import logo from "../../../assets/images/logo-2.svg";
import searchIcon from "../../../assets/images/search-normal.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ChatSidebar = ({ chatList = [], onSelectChat, selectedChatId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const safeChatList = Array.isArray(chatList) ? chatList : [];

  const filteredChats = safeChatList.filter((chat) =>
    (chat?.title || "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="sidebar">
      {/* ✅ Logo */}
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      {/* ✅ Search */}
      <div className="search-box">
        <img src={searchIcon} alt="search" />
        <input
          type="text"
          placeholder={t("searchChatPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ✅ Chat List */}
      <div className="recent-chats">
        <h5>{t("recentChats")}</h5>

        {filteredChats.length === 0 ? (
          <p style={{ padding: "10px", fontSize: "14px", color: "white" }}>
            No chats found
          </p>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat._id}
              className={`chat-item ${
                selectedChatId === chat._id ? "active" : ""
              }`}
              onClick={() => {
                onSelectChat && onSelectChat(chat._id);
                navigate(`/chat-history/${chat._id}`);
              }}
            >
              <div className="chat-title">{chat.title || "Untitled Chat"}</div>

              <small className="chat-time">
                {new Date(chat.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
