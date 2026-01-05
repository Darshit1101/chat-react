import { socket } from "../../configs/socket";
import apiList from "../../constants/apiList";
import apiService from "../../services/apiService";
import { useAuth } from "../../stores/useAuth";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

const Chat = () => {
  const { id: currentUserId } = useAuth();
  const receiverId = "69578c872823487b38ee726c";
  // const receiverId = "69566926acee7e8abf6cf390";

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
      { _id: Date.now().toString(), senderId: currentUserId, message },
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
          <Avatar />
          <Typography variant="h6">Chat</Typography>
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
              typeof m.senderId === "object" ? m.senderId._id : m.senderId;

            const isMe = String(senderId) === String(currentUserId);

            return (
              <Box
                key={m._id}
                sx={{
                  display: "flex",
                  justifyContent: isMe ? "flex-end" : "flex-start",
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
                    maxWidth: "70%",
                    px: 1,
                    py: 1,
                    borderRadius: 3,
                    bgcolor: isMe ? "primary.main" : "white",
                    color: isMe ? "white" : "black",
                    boxShadow: 1,
                  }}
                >
                  <Typography variant="body1">{m.message}</Typography>
                </Box>

                {isMe && (
                  <Avatar sx={{ ml: 1, bgcolor: "primary.main" }}>
                    {m?.senderId?.fullName?.slice(0, 2).toUpperCase()}
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
            p: 2,
            borderTop: "1px solid #eee",
            display: "flex",
            gap: 1,
          }}
        >
          <TextField
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={!message.trim()}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat;
