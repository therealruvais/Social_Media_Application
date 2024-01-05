import React from "react";
import "./notification.css";
import avatar from "../../socialmedia/avatar/avatar8.jpg";

const Notification = () => {
  return (
    <div className="notifyC">
      <div className="notifyHead">
        <p
          style={{
            marginTop: 15,
            marginLeft: 15,
            fontSize: 20,
            fontWeight: 450,
          }}
        >
          Notification
        </p>
      </div>
      <div className="notifications">
        <div className="Nimg">
          <img
            src={avatar}
            alt=""
          />
          <div className="Nname">
            <span style={{ fontWeight: "bold" }}>lilly John</span>{" "}
            <span> started following you</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
