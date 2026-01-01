import "./App.css";
import apiList from "./constants/apiList";
import Header from "./layouts/header/Header";
import ChatPage from "./pages/Chat/ChatPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import TestPage from "./pages/Test/TestPage";
import apiService from "./services/apiService";
import { useAuth } from "./stores/useAuth";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";

const LoggedInProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const LoggedOutProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

function App() {
  const { isLoggedIn, setUserInfo } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) return;

    const sync2FAStatus = async () => {
      try {
        const res = await apiService(apiList.AUTH.SYNC);
        if (res.success) {
          setUserInfo({
            email: res?.data?.email,
            id: res?.data?._id,
            ...res.data,
          });
        }
      } catch (error) {
        console.error("Failed to sync 2FA status:", error);
      }
    };

    sync2FAStatus();
  }, [isLoggedIn]);

  return (
    <>
      <Router>
        {isLoggedIn && <Header />}
        <Routes>
          <Route element={<LoggedOutProtectedRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route element={<LoggedInProtectedRoute />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
