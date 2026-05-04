import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../utils/config";
import { FaBullseye } from "react-icons/fa6";

// ================= START CHAT =================
export const startChat = createAsyncThunk(
  "chat/startChat",
  async ({ title, chatType }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${credAndUrl.BASE_URL}/gemini/chat/start`,
        { title, chatType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ================= SEND MESSAGE =================
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (
    { chatId, message, language, tempId },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${credAndUrl.BASE_URL}/gemini/chat`,
        {
          chatId,
          message,
          language,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      return res.data;
    } catch (error) {
      // 👇 mark failed
      dispatch(
        updateTempMessage({
          tempId,
          newMessage: {
            _id: tempId,
            role: "user",
            content: message,
            status: "failed",
          },
        }),
      );

      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ================= GET CHAT LIST =================
export const getChatList = createAsyncThunk(
  "chat/getChatList",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${credAndUrl.BASE_URL}/gemini/chat/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res", res);

      // 🔥 IMPORTANT FIX
      return res.data.data.chats || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ================= GET CHAT HISTORY =================
export const getChatHistory = createAsyncThunk(
  "chat/getChatHistory",
  async (chatId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${credAndUrl.BASE_URL}/gemini/chat/${chatId}/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ================= SLICE =================
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatId: null,
    chats: [],
    messages: [],
    chatList: [],
    isTyping: false,
    selectedChatId: null,
    loading: false,
    error: null,
  },
  reducers: {
    setChatId: (state, action) => {
      state.selectedChatId = action.payload;
    },
    clearChat: (state) => {
      state.messages = [];
      state.chatId = null;
    },

    addTempMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    updateTempMessage: (state, action) => {
      const { tempId, newMessage } = action.payload;

      const index = state.messages.findIndex((msg) => msg._id === tempId);

      if (index !== -1) {
        state.messages[index] = newMessage;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // START CHAT
      .addCase(startChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(startChat.fulfilled, (state, action) => {
        state.loading = false;

        // 🔥 IMPORTANT: correct response path
        state.chatId = action.payload?.data?.chat?._id || null;

        console.log("REDUX CHAT ID:", state.chatId);
      })
      .addCase(startChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SEND MESSAGE
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.isTyping = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const botTempId = action.meta.arg.botTempId;
        const response = action.payload?.data?.response;

        // ✅ remove typing message (...)
        state.messages = state.messages.filter((msg) => msg._id !== botTempId);

        // ✅ add bot response
        state.messages.push({
          _id: Date.now(),
          role: "bot", // 🔥 IMPORTANT FIX
          content: response || "No response",
          createdAt: new Date().toISOString(),
        });

        state.isTyping = false;
        state.loading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        const botTempId = action.meta.arg.botTempId;

        // remove typing if API fails
        state.messages = state.messages.filter((msg) => msg._id !== botTempId);

        state.loading = false;
        state.isTyping = false;
      })

      // CHAT HISTORY
      // .addCase(getChatHistory.fulfilled, (state, action) => {
      //   state.messages = action.payload || [];
      // })
      .addCase(getChatList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChatList.fulfilled, (state, action) => {
        state.chatList = action.payload; // ✅ correct
      })
      .addCase(getChatList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getChatHistory.fulfilled, (state, action) => {
        const msgs =
          action.payload?.data?.messages || action.payload?.messages || [];

        state.messages = Array.isArray(msgs) ? msgs : [];
      });
  },
});

export const { setChatId, clearChat, addTempMessage, updateTempMessage } =
  chatSlice.actions;
export default chatSlice.reducer;
