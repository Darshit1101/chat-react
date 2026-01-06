import Button from "../../components/global/buttons/Button";
import { socket } from "../../configs/socket";
import apiList from "../../constants/apiList";
import apiService from "../../services/apiService";
import { useAuth } from "../../stores/useAuth";
import formatDateTime from "../../utils/formatDateTime";
import {
  Avatar,
  Box,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { id: currentUserId, fullName: currentUserName } = useAuth();
  const { receiverId } = useParams();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  // 🔹 AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  // 🔹 RECEIVE MESSAGE
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

  // 🔹 SEND MESSAGE
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
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid #eee",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar sx={{ mr: 1 }}>
            {currentUserName?.slice(0, 2).toUpperCase()}
          </Avatar>
          <Typography variant="h6">{currentUserName}</Typography>
        </Box>

        {/* MESSAGES */}
        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            overflowY: "auto",
            bgcolor: "#f9f9f9",
          }}
        >
          {messages.map((m) => {
            const senderId =
              typeof m?.senderId === "object" ? m?.senderId?._id : m?.senderId;

            const isMe = String(senderId) === String(currentUserId);

            return (
              <Box
                key={m._id}
                sx={{
                  display: "flex",
                  justifyContent: isMe ? "flex-end" : "flex-start",
                  alignItems: "center",
                  mb: 1.5,
                }}
              >
                {!isMe && (
                  <Avatar sx={{ mr: 1 }}>
                    {m?.senderId?.fullName?.slice(0, 2).toUpperCase()}
                  </Avatar>
                )}

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isMe ? "flex-end" : "flex-start",
                    maxWidth: "70%",
                    px: 1.5,
                    py: 1,
                    borderRadius: 3,
                    bgcolor: isMe ? "primary.main" : "white",
                    color: isMe ? "white" : "black",
                    boxShadow: 1,
                  }}
                >
                  {/* MESSAGE TEXT */}
                  <Typography variant="body1">{m.message}</Typography>

                  {/* MESSAGE TIME */}
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      mt: 0.5,
                      textAlign: "right",
                      color: isMe ? "rgba(255,255,255,0.7)" : "gray",
                    }}
                  >
                    {formatDateTime(m.createdAt)}
                  </Typography>
                </Box>

                {isMe && (
                  <Avatar sx={{ ml: 1, bgcolor: "primary.main" }}>
                    {currentUserName?.slice(0, 2).toUpperCase()}
                  </Avatar>
                )}
              </Box>
            );
          })}
          <div ref={bottomRef} />
        </Box>

        {/* INPUT */}
        <Box
          sx={{
            p: 1,
            borderTop: "1px solid #eee",
            display: "flex",
            gap: 1,
          }}
        >
          <TextField
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage} disabled={!message.trim()}>
            Send
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat;
