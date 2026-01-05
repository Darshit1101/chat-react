import { alpha, Box, Dialog, IconButton, Stack, useTheme } from "@mui/material";
import { X } from "lucide-react";

function Modal({ open, onClose, children, maxWidth = "sm", sx = {}, ...rest }) {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          padding: 0,
          ...sx,
        },
        "& .MuiDialog-paper": {
          boxShadow: theme.customShadows.soft,
          margin: 0,
          width: "calc(100% - 24px)",
        },
        "& .MuiBackdrop-root": {
          backgroundColor: alpha(theme.palette.background.default, 0.7),
          backdropFilter: `blur(${theme.blur.md})`,
          borderRadius: theme.shape.borderRadius,
        },
      }}
      {...rest}
    >
      <Box sx={{ padding: "6px", background: "transparent" }}>
        <Stack
          alignItems={"flex-start"}
          sx={{
            background: theme.palette.background.blur,
            padding: "20px",
            boxShadow: theme.customShadows.soft,
            position: "relative",
            borderRadius: "4px",
          }}
        >
          <IconButton
            sx={{
              alignSelf: "end",
              padding: 0,
              position: "fixed",
              zIndex: 100,
            }}
            onClick={() => onClose()}
          >
            <X strokeWidth={2.3} color={theme.palette.text.secondary} />
          </IconButton>
          {children}
        </Stack>
      </Box>
    </Dialog>
  );
}

export default Modal;
