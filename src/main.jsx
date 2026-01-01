import "./index.css";
import App from "./App.jsx";
import { VITE_GOOGLE_CLIENT_ID } from "./constants/environment.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <>
    <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </>
);
