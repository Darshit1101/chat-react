import { VITE_BACKEND_URL } from "../constants/environment";
import { io } from "socket.io-client";

export const socket = io(VITE_BACKEND_URL, {
  withCredentials: true,
  transports: ["websocket"],
});
