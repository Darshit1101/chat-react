import { socket } from "../../configs/socket";
import apiList from "../../constants/apiList";
import apiService from "../../services/apiService";
import { useAuth } from "../../stores/useAuth";
import ChatHeader from "./components/ChatHeader";
import MessageInput from "./components/MessageInput";
import MessageList from "./components/MessageList";
import { Container, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { id: currentUserId, fullName: currentUserName } = useAuth();
  const { receiverId } = useParams();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  //fetch chat history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await apiService({
          ...apiList.CHAT.GET_HISTORY,
          url: apiList.CHAT.GET_HISTORY.url.replace(":receiverId", receiverId),
        });

        if (res.success) {
          setMessages(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
      }
    };

    fetchHistory();
  }, [receiverId]);

  //  RECEIVE MESSAGE
  useEffect(() => {
    const handler = (msg) => {
      setMessages((prev) => {
        if (prev.some((m) => String(m._id) === String(msg._id))) {
          return prev;
        }
        return [...prev, msg];
      });
    };

    socket.off("receive_message");
    socket.on("receive_message", handler);

    return () => socket.off("receive_message", handler);
  }, []);

  //  SEND MESSAGE
  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send_message", {
      to: receiverId,
      message,
    });

    setMessages((prev) => [
      ...prev,
      {
        _id: Date.now().toString(),
        senderId: currentUserId,
        message,
        createdAt: new Date(),
      },
    ]);

    setMessage("");
  };

  return (
    <Container maxWidth="sm" sx={{ height: "85vh", py: 2 }}>
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
        }}
      >
        {/* HEADER */}
        <ChatHeader currentUserName={currentUserName} />

        {/* MESSAGES */}
        <MessageList
          messages={messages}
          currentUserId={currentUserId}
          currentUserName={currentUserName}
        />

        {/* INPUT */}
        <MessageInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </Paper>
    </Container>
  );
};

export default Chat;
