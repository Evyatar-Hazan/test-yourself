import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Feed from './pages/Feed';
// import CreateTest from './pages/CreateTest';
// import Profile from './pages/Profile';
// import SettingsPage from './pages/Settings';
// import Notifications from './pages/Notifications';
// import TestDetail from './pages/TestDetail';
import BottomTabs from "../components/BottomTabs/BottomTabs";
import Drawer from "../components/Drawer/Drawer";
import Header from "../components/Header/Header";
import Home from "../screens/Home/Home";

const Navigation: React.FC = () => {
  return (
    <Router>
      <div
        style={{ display: "flex", minHeight: "100vh", flexDirection: "row" }}
      >
        <Drawer />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header title="Home" />
                  <Home />
                  <BottomTabs />
                </>
              }
            />
            {/* <Route path="/" element={<><Header title="Feed" /><Feed /><BottomTabs /></>} />
            <Route path="/create" element={<><Header title="Create Test" /><CreateTest /><BottomTabs /></>} />
            <Route path="/profile" element={<><Header title="Profile" /><Profile /><BottomTabs /></>} />
            <Route path="/settings" element={<><Header title="Settings" /><SettingsPage /></>} />
            <Route path="/notifications" element={<><Header title="Notifications" /><Notifications /></>} />
            <Route path="/test/:id" element={<><Header title="Test Detail" showBack /><TestDetail /></>} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Navigation;
