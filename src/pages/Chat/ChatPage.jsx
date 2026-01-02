import { socket } from "../../configs/socket";
import { useAuth } from "../../stores/useAuth";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
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
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Chat
        </Typography>

        <List>
          {messages.map((m) => (
            <ListItem key={m._id}>
              <ListItemText
                primary={
                  <b>
                    {String(m.senderId) === String(currentUserId)
                      ? "You"
                      : "Them"}
                    :
                  </b>
                }
                secondary={m.message}
              />
            </ListItem>
          ))}
        </List>

        <Box display="flex" gap={1} mt={2}>
          <TextField
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat;
