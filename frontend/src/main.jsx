import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import Modal from "react-modal";
import UserProvider from "./context/UserDataContext.jsx";
import PostProvider from "./context/PostContext.jsx";
import NotifyProvider from "./context/NotifyContext.jsx";
import DarkmodeProvider from "./context/DarkmodeContext.jsx";

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <PostProvider>
          <NotifyProvider>
            <DarkmodeProvider>
              <App />
            </DarkmodeProvider>
          </NotifyProvider>
        </PostProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>
);
