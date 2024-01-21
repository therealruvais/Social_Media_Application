import React, { useEffect, useState } from "react";
import axios from '../../axios-config'

const ConverSation = ({ data, userData, online }) => {
  const [chatUser, setChatUser] = useState(null);

  useEffect(() => {
    const getChatUsers = async () => {
      try {
        const chatUserId = data?.members?.find((id) => id !== userData._id);
        const { data: chatUserData } = await axios.get(
          `/user/getoneuser/${chatUserId}`,
          {
            withCredentials: true,
          }
        );

        setChatUser(chatUserData);
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
        <p className="usersNames">{chatUser?.username}</p>
        <span className="onof">{online ? "online" : "offline"}</span>
      </div>
     {online && <div className="online"></div>}
    </>
  );
};

export default ConverSation;
