import React, { useEffect, useState } from "react";
import uimg from "../../socialmedia/avatar/avatar2.jpg";
import axios from "axios"
axios.defaults.withCredentials = true;

const ConverSation = ({ data, userData, setCurrentChats }) => {
  const [chatUser, setChatUser] = useState(null);

  useEffect(() => {
    const getChatUsers = async () => {
      try {
        const chatUserId = data.members.find((id) => id !== userData._id);
        const { data: chatUserData } = await axios.get(
          `http://localhost:1900/api/user/getoneuser/${chatUserId}`,
          {
            withCredentials: true,
          }
        );

        setChatUser(chatUserData);
        // console.log(chatUserData);
      } catch (error) {
        console.log(error);
      }
    };

    getChatUsers();
  }, [data, userData]);

  return (
    <>
      <img
        src={chatUser?.image}
        alt=""
      />
      <div>
        <p style={{ fontSize: 24, marginTop: 9 }}>{chatUser?.username}</p>
        <span>online</span>
      </div>
      <div className="online"></div>
    </>
  );
};

export default ConverSation;
