import React, { useEffect, useState } from "react";
import axios from "axios"
axios.defaults.withCredentials = true;

const ConverSation = ({ data, userData, online }) => {
  const [chatUser, setChatUser] = useState(null);

  useEffect(() => {
    const getChatUsers = async () => {
      try {
        const chatUserId = data?.members?.find((id) => id !== userData._id);
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
        <span>{online ? "online" : "offline"}</span>
      </div>
     {online && <div className="online"></div>}
    </>
  );
};

export default ConverSation;
