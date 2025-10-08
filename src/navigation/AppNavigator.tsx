import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Feed from './pages/Feed';
// import CreateTest from './pages/CreateTest';
// import SettingsPage from './pages/Settings';
// import Notifications from './pages/Notifications';
// import TestDetail from './pages/TestDetail';
// import BottomTabs from "../components/BottomTabs/BottomTabs";
// import Drawer from "../components/Drawer/Drawer";
import Header from "../components/Header/Header";
import TestScreen from "../screens/Exam/TestScreen";
import Home from "../screens/Home/Home";
import Profile from "../screens/Profile/Profile";

const Navigation: React.FC = () => {
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
                  <Header title="Home" />
                  <Home />
                  {/* <BottomTabs /> */}
                </>
              }
            />
            <Route
              path="/profile/:userId?"
              element={
                <>
                  <Header title="פרופיל" showBack />
                  <Profile />
                </>
              }
            />
            <Route
              path="/test/:testId"
              element={
                <>
                  <Header title="מבחן" showBack />
                  <TestScreen />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Navigation;
