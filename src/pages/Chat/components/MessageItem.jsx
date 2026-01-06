import formatDateTime from "../../../utils/formatDateTime";
import { Avatar, Box, Typography } from "@mui/material";

const MessageItem = ({ message, isMe, currentUserName }) => {
  return (
    <Box
      key={message._id}
      sx={{
        display: "flex",
        justifyContent: isMe ? "flex-end" : "flex-start",
        alignItems: "center",
        mb: 1.5,
      }}
    >
      {!isMe && (
        <Avatar sx={{ mr: 1 }}>
          {message?.senderId?.fullName?.slice(0, 2).toUpperCase()}
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
        <Typography variant="body2">{message.message}</Typography>

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
          {formatDateTime(message.createdAt)}
        </Typography>
      </Box>

      {isMe && (
        <Avatar sx={{ ml: 1, bgcolor: "primary.main" }}>
          {currentUserName?.slice(0, 2).toUpperCase()}
        </Avatar>
      )}
    </Box>
  );
};

export default MessageItem;
