import React, { useContext, useEffect, useState } from 'react'
import "../../pages/messages/message.css";
import { FaRegEdit } from "react-icons/fa";
import uimg from "../../socialmedia/avatar/avatar2.jpg";
import axios from 'axios';
import ConverSation from './ConverSation';
axios.defaults.withCredentials = true

const Users = ({ userData, chats, setCurrentChats, checkOnlineStatus }) => {
  return (
    <div className="Mesleft">
      <div className="Meshead">
        <h3 style={{ fontSize: 26 }}>{userData.username}</h3>
        <FaRegEdit style={{ fontSize: 26, cursor: "pointer" }} />
      </div>
      <div className="Mesusers">
        {chats.map((chat) => (
          <div
            className="muserim"
            style={{ cursor: "pointer" }}
            onClick={() => setCurrentChats(chat)}
          >
            <ConverSation
              key={chat._id}
              data={chat}
              userData={userData}
              online={checkOnlineStatus(chat)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users