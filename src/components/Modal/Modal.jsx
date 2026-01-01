import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  IconButton,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

const CommonModal = ({
  open,
  onClose,
  title,
  children,
  maxWidth = 400,
  fullWidth = false,
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: fullWidth || isMobile ? "90%" : maxWidth,
    maxWidth: fullWidth ? "none" : maxWidth,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: isMobile ? 2 : 3,
    borderRadius: 2,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      {...props}
    >
      <Box sx={modalStyle}>
        {title && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography id="modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        <Box id="modal-description">{children}</Box>
      </Box>
    </Modal>
  );
};

export default CommonModal;
