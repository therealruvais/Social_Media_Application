import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import Modal from "react-modal";
import UserProvider from "./context/UserDataContext.jsx";
import PostProvider from "./context/PostContext.jsx";

Modal.setAppElement("#root");
Modal.defaultStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0.349)";
Modal.defaultStyles.overlay.zIndex = 2;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <PostProvider>
          <App />
        </PostProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>
);
