import { socket } from "../../configs/socket";
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
import { useEffect, useState } from "react";

const Chat = () => {
  const { id: currentUserId } = useAuth();
  const receiverId = "69578c872823487b38ee726c";

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // RECEIVE MESSAGE (ONLY ONE EVENT)
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

  // SEND MESSAGE (OPTIMISTIC UI)
  const sendMessage = () => {
    if (!message.trim()) return;

    const tempMessage = {
      _id: Date.now(), // temporary id
      senderId: currentUserId,
      receiverId,
      message,
    };

    setMessages((prev) => [...prev, tempMessage]);

    socket.emit("send_message", {
      to: receiverId,
      message,
    });

    setMessage("");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        py: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Chat
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            mb: 2,
          }}
        >
          {messages.map((m) => {
            const isMe = String(m.senderId) === String(currentUserId);
            return (
              <Box
                key={m._id}
                display="flex"
                justifyContent={isMe ? "flex-end" : "flex-start"}
                mb={1}
              >
                {!isMe && (
                  <Avatar sx={{ bgcolor: "secondary.main", mr: 1 }}>T</Avatar>
                )}
                <Box
                  sx={{
                    maxWidth: "70%",
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: isMe ? "primary.main" : "grey.300",
                    color: isMe ? "white" : "black",
                  }}
                >
                  <Typography variant="body1">{m.message}</Typography>
                </Box>
                {isMe && (
                  <Avatar sx={{ bgcolor: "primary.main", ml: 1 }}>Y</Avatar>
                )}
              </Box>
            );
          })}
        </Box>

        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
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
