import React, { useEffect, useState } from "react";
import { Snackbar, SnackbarContent, styled } from "@mui/material";

const NotificationContent = styled(SnackbarContent)(({ theme }) => ({
  background: "#4CAF50",
  color: "white",
  textAlign: "center",
  minWidth: "fit-content",
  borderRadius: "5px",
}));

const LikesNotification = ({ message, onClose }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(true);
  }, [message]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    onClose();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <NotificationContent message={message} />
    </Snackbar>
  );
};

export default LikesNotification;
