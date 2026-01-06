import MessageItem from "./MessageItem";
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

const MessageList = ({ messages, currentUserId, currentUserName }) => {
  const bottomRef = useRef(null);

  // 🔹 AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
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
          <MessageItem
            key={m._id}
            message={m}
            isMe={isMe}
            currentUserName={currentUserName}
          />
        );
      })}
      <div ref={bottomRef} />
    </Box>
  );
};

export default MessageList;
