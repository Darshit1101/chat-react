import { Avatar, Box, Typography } from "@mui/material";

const ChatHeader = ({ currentUserName }) => {
  return (
    <Box
      sx={{
        p: 1,
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
  );
};

export default ChatHeader;
