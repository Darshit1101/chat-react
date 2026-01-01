import CommonModal from "../../components/Modal/Modal";
import apiList from "../../constants/apiList";
import useDeviceInfo from "../../hooks/useDeviceInfo";
import apiService from "../../services/apiService";
import { useAuth } from "../../stores/useAuth";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const Verify2FAModal = () => {
  const { deviceInfo } = useDeviceInfo();
  const [otp, setOtp] = useState("");

  const { setUserInfo, pending2FA } = useAuth();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && otp.length === 6) {
      handleVerify();
    }
  };

  const handleVerify = async () => {
    try {
      const res = await apiService(apiList.AUTH.LOGIN_VERIFY_2FA, {
        otp,
        accountId: pending2FA,
        deviceInfo,
      });
      if (res.success) {
        setOtp("");
        setUserInfo({ isLoggedIn: true, pending2FA: null });
      }
    } catch (error) {
      console.error("Failed to enable 2FA:", error);
    }
  };

  return (
    <CommonModal
      open={Boolean(pending2FA)}
      title="Enable Two-Factor Authentication"
    >
      <Box sx={{ p: 2, textAlign: "center" }}>
        <TextField
          fullWidth
          label="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          onKeyDown={handleKeyDown}
          inputProps={{
            maxLength: 6,
            style: {
              textAlign: "center",
              fontSize: 20,
              letterSpacing: 4,
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          fullWidth
          onClick={handleVerify}
          disabled={otp.length !== 6}
        >
          Enable 2FA
        </Button>
      </Box>
    </CommonModal>
  );
};

export default Verify2FAModal;
