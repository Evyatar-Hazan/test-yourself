import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import { useTranslationTyped } from "../hooks/useTranslationTyped";
import CreateTest from "../screens/CreateTest/CreateTest";
import TestScreen from "../screens/Exam/TestScreen";
import Home from "../screens/Home/Home";
import ForgotPassword from "../screens/Login/ForgotPassword";
import Login from "../screens/Login/Login";
import ResetPassword from "../screens/Login/ResetPassword";
import Signup from "../screens/Login/Signup";
import VerifyEmail from "../screens/Login/VerifyEmail";
import Profile from "../screens/Profile/Profile";
import TestDetailPage from "../screens/TestDetail/TestDetailPage";

const Navigation: React.FC = () => {
  const { t } = useTranslationTyped();
  return (
    <Router>
      <div
        style={{ display: "flex", minHeight: "100vh", flexDirection: "row" }}
      >
        {/* <Drawer /> */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header title={t("home.title")} />
                  <Home />
                  {/* <BottomTabs /> */}
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <Header title={t("navigation.profile")} showBack />
                  <Profile />
                </>
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <>
                  <Header title={t("navigation.profile")} showBack />
                  <Profile />
                </>
              }
            />
            <Route
              path="/exam/:testId"
              element={
                <>
                  <Header title={t("exam.test")} showBack />
                  <TestScreen />
                </>
              }
            />
            <Route
              path="/test/:testId"
              element={
                <>
                  <TestDetailPage />
                </>
              }
            />
            <Route
              path="/create-test"
              element={
                <>
                  <Header title={t("navigation.createTest")} showBack />
                  <CreateTest />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Navigation;
