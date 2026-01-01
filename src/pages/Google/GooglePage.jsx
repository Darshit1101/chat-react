import apiList from "../../constants/apiList";
import apiService from "../../services/apiService";
import { useAuth } from "../../stores/useAuth";
import Button from "@mui/material/Button";
import { useGoogleLogin } from "@react-oauth/google";
import React from "react";

const GooglePage = () => {
  const { setUserInfo } = useAuth();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const userInfo = await response.json();
        const obj = {
          name: userInfo.name,
          email: userInfo.email,
          googleId: userInfo.sub,
        };
        const res = await apiService(apiList.AUTH.GOOGLE_LOGIN, obj);
        if (res?.data?.require2FA) {
          setUserInfo({
            pending2FA: res?.data?.accountId,
          });
          return;
        }
        setUserInfo({
          twoFactorEnabled: res?.data?.twoFactorEnabled,
        });
      } catch (error) {
        console.error("Error fetching Google user info", error);
      }
    },
  });

  return (
    <>
      <Button
        onClick={() => handleGoogleLogin()}
        variant="contained"
        color="primary"
        startIcon={
          <img
            src="https://images.unsplash.com/photo-1706426629246-2a3c3e3e3ff2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGdvb2dsZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Google Logo"
            style={{ width: 24, height: 24, borderRadius: "50%" }}
          />
        }
      >
        Sign in with Google
      </Button>
    </>
  );
};

export default GooglePage;
