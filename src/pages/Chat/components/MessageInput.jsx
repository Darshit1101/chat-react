import Button from "../../../components/global/buttons/Button";
import { Box, TextField } from "@mui/material";
import { SendHorizontal } from "lucide-react";

const MessageInput = ({ message, setMessage, sendMessage }) => {
  return (
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
        <SendHorizontal />
      </Button>
    </Box>
  );
};

export default MessageInput;
