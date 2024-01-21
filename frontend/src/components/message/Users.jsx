import React from 'react'
import "../../pages/messages/message.css";
import { FaRegEdit } from "react-icons/fa";
import ConverSation from './ConverSation';

const Users = ({ userData, chats, setCurrentChats, checkOnlineStatus }) => {
  return (
    <div className="Mesleft">
      <div className="Meshead">
        <h3>{userData.username}</h3>
        <FaRegEdit className='edit-i' style={{ fontSize: 26, cursor: "pointer" }} />
      </div>
      <div className="Mesusers">
        {chats.map((chat) => (
          <div
            className="muserim"
            style={{ cursor: "pointer" }}
            onClick={() => setCurrentChats(chat)}
            key={chat?._id}
          >
            <ConverSation
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