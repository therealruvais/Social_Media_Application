import React, { useEffect, useRef, useState } from "react";
import "./message.css";
import Users from "../../components/message/Users";
import Messages from "../../components/message/Messages";
import { io } from "socket.io-client";
import axios from "axios";
axios.defaults.withCredentials = true;

const Message = () => {
  const [userData, setUserData] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentChats, setCurrentChats] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);
  // console.log(recieveMessage);
  // console.log(userData)

  const socket = useRef();

  const user = async () => {
    const { data } = await axios
      .get(`http://localhost:1900/api/user/verify`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    setUserData(data.getaUser);
    return data.getaUser;
  };

  useEffect(() => {
    user();
  }, []);

  useEffect(() => {
    socket.current = io("http://localhost:8000");
    socket.current.emit("new-user-add", userData._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [userData]);

  // sendmessage
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  //recieve message
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setRecieveMessage(data);
    });
  }, []);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:1900/api/chat/user`,
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

  return (
    <div className="messageSection">
      <div className="messsageCon">
        <Users
          userData={userData}
          chats={chats}
          setCurrentChats={setCurrentChats}
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
