import React, { useEffect } from "react";
import ChatSidebar from "./ChatSidebar";
import avatar from "../../../assets/images/avtar-three.png";
import voiceIcon from "../../../assets/images/talk-with-voice.png";
import textIcon from "../../../assets/images/chat-to-ai.png";
import settingIcon from "../../../assets/images/setting-two.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  startChat,
  getChatHistory,
  setChatId,
  getChatList,
} from "../../../features/chat/chatSlice";
import { useTranslation } from "react-i18next";

const ChatHomeScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const chatId = useSelector((state) => state.chat.chatId);
  const chatList = useSelector((state) => state.chat.chatList);
  const messages = useSelector((state) => state.chat.messages);

  const handleStartChat = async (type) => {
    try {
      const res = await dispatch(
        startChat({
          title: "Anxiety Support",
          chatType: type,
        }),
      ).unwrap();

      const id = res?.data?.chat?._id;

      if (!id) {
        console.error("Chat ID missing");
        return;
      }

      if (type === "text") {
        navigate(`/chat-text/${id}`);
      } else {
        navigate(`/chat-voice/${id}`);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleOpenChat = (id) => {
    dispatch(setChatId(id));
    dispatch(getChatHistory(id));
  };
  // useEffect(() => {
  //   dispatch(getChatList());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getChatList());
  }, [dispatch]);

  return (
    <div style={{ display: "flex" }}>
      <ChatSidebar
        chatList={chatList}
        onSelectChat={handleOpenChat}
        selectedChatId={chatId}
      />

      <div className="main-content" style={{ marginLeft: "640px" }}>
        <div className="activities-header">
          <h3 />
          {/* <a href="#">
            <img src={settingIcon} alt="settings" /> &nbsp; Kai Settings
          </a> */}
        </div>

        <div className="connection-container">
          <div className="kai-avatar">
            <img src={avatar} alt="Kai" />
          </div>

          {!chatId ? (
            <>
              <h2>{t("howWouldYouLikeToConnect")}</h2>

              <div className="connection-options">
                <div
                  className="connection-card"
                  onClick={() => handleStartChat("voice")}
                >
                  <img src={voiceIcon} alt="voice" />
                  <h4>{t("talkWithVoice")}</h4>
                </div>

                <div
                  className="connection-card"
                  onClick={() => handleStartChat("text")}
                >
                  <img src={textIcon} alt="text" />
                  <h4>{t("chatWithText")}</h4>
                </div>
              </div>
            </>
          ) : (
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`message ${msg.type}`}>
                  {msg.text}
                </div>
              ))}
            </div>
          )}

          {/* <div className="connection-options">
            <div
              className="connection-card"
              onClick={() => handleStartChat("voice")}
            >
              <img src={voiceIcon} alt="voice" />
              <h4>Talk with Voice</h4>
            </div>

            <div
              className="connection-card"
              onClick={() => handleStartChat("text")}
            >
              <img src={textIcon} alt="text" />
              <h4>Chat with Text</h4>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChatHomeScreen;
