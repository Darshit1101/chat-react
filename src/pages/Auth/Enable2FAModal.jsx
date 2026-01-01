import CommonModal from "../../components/Modal/Modal";
import apiList from "../../constants/apiList";
import useDeviceInfo from "../../hooks/useDeviceInfo";
import apiService from "../../services/apiService";
import { useAuth } from "../../stores/useAuth";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Enable2FAModal = () => {
  const { deviceInfo } = useDeviceInfo();
  const [otp, setOtp] = useState("");
  const [qrData, setQrData] = useState(null);
  const { twoFactorEnabled, setUserInfo } = useAuth();

  useEffect(() => {
    const handleEnable2FA = async () => {
      try {
        const res = await apiService(apiList.AUTH.ENABLE_2FA);
        if (res.success) {
          setQrData(res);
        }
      } catch (error) {
        console.error("Failed to enable 2FA:", error);
      }
    };
    if (twoFactorEnabled === false) {
      handleEnable2FA();
    }
  }, [twoFactorEnabled]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && otp.length === 6) {
      handleVerify();
    }
  };

  const handleVerify = async () => {
    try {
      const res = await apiService(apiList.AUTH.VERIFY_2FA, {
        otp,
        deviceInfo,
      });
      if (res.success) {
        setOtp("");
        setQrData(null);
        setUserInfo({ twoFactorEnabled: true, isLoggedIn: true });
      }
    } catch (error) {
      console.error("Failed to enable 2FA:", error);
    }
  };

  return (
    <CommonModal
      open={twoFactorEnabled === false}
      title="Enable Two-Factor Authentication"
    >
      {qrData?.data?.qrCode && (
        <Stack spacing={2}>
          <Typography variant="body1" color="text.secondary">
            Scan this QR code with Google Authenticator
          </Typography>

          <Box display="flex" justifyContent="center">
            <img
              src={qrData.data?.qrCode}
              alt="2FA QR Code"
              style={{ width: 180, height: 180, borderRadius: 8 }}
            />
          </Box>

          <Typography
            variant="body2"
            fontWeight={600}
            textAlign="center"
            sx={{ wordBreak: "break-all" }}
          >
            Secret Key: {qrData.data.secret}
          </Typography>
        </Stack>
      )}

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

export default Enable2FAModal;

// import React from "react";

// const Enable2FAModal = () => {
//   return <div>Enable2FAModal</div>;
// };

// export default Enable2FAModal;
