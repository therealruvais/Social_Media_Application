import React, { useEffect, useState } from "react";
import "./App.css";
import SideBar from "./pages/sidebar/SideBar";
import Home from "./pages/home/Home";
import Explore from "./pages/explore/Explore";
import Message from "./pages/messages/Message";
import Profile from "./pages/profile/Profile";
import { Routes, Route, useLocation } from "react-router-dom";
import TextProvider from "./context/TextContext";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import { PacmanLoader } from "react-spinners";

const App = () => {
  const location = useLocation();
  const hideSideBar =
    location.pathname === "/" || location.pathname === "/signup";
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 4000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <PacmanLoader
          color="#36d7b7"
          size={35}
          loading={loading}
        />
      </div>
    );
  }
  
  return (
    <div className="App">
      {!hideSideBar && <SideBar />}
      <TextProvider>
        <div className="Pages">
          <Routes>
            <Route
              path="/home"
              element={<Home />}
            />
            <Route
              path="/explore"
              element={<Explore />}
            />
            <Route
              path="/message"
              element={<Message />}
            />

            <Route
              path="/profile/:username"
              element={<Profile />}
            />
            <Route
              path="/"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
          </Routes>
        </div>
      </TextProvider>
    </div>
  );
};

export default App;
