import React, { useContext, useEffect, useRef, useState } from "react";
import "./message.css";
import Users from "../../components/message/Users";
import Messages from "../../components/message/Messages";
import { io } from "socket.io-client";
import axios from '../../axios-config'
import { UserDataContext } from "../../context/UserDataContext";

const Message = () => {
  // const [userData, setUserData] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentChats, setCurrentChats] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);

  // console.log(userData)
  const { userData } = useContext(UserDataContext);

  const socket = useRef();

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await axios.get(
          `/chat/user`,
          {
            withCredentials: true,
          }
        );
        setChats(data);
        // console.log(data)
        return data;
      } catch (error) {
        console.log(error, "cannot get users chat");
      }
    };
    getChats();
  }, [userData._id]);

  useEffect(() => {
    socket.current = io("https://pichub-socket.onrender.com");
    console.log("socket connected");
    socket.current.emit("new-user-add", userData._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [userData]);

  // sendmessage
  useEffect(() => {
    if (sendMessage !== null) {
      console.log("Sending message:");
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  //recieve message
  useEffect(() => {
    socket.current.on("received-message", (data) => {
      console.log("Received message");
      setRecieveMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== userData._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="messageSection">
      <div className="messsageCon">
        <Users
          userData={userData}
          chats={chats}
          setCurrentChats={setCurrentChats}
          checkOnlineStatus={checkOnlineStatus}
        />
        <Messages
          chat={currentChats}
          userData={userData}
          setSendMessage={setSendMessage}
          recieveMessage={recieveMessage}
        />
      </div>
    </div>
  );
};

export default Message;
