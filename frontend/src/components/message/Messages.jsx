import React, { useEffect, useRef, useState } from "react";
import "../../pages/messages/message.css";
import InputEmoji from "react-input-emoji";
import { format } from "timeago.js";
import axios from "axios";
axios.defaults.withCredentials = true;

const Messages = ({ chat, userData, setSendMessage, recieveMessage }) => {
  const [chatUser, setChatUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");

  const scroll = useRef();

  useEffect(() => {
    const getChatUsers = async () => {
      try {
        const chatUserId = chat?.members?.find((id) => id !== userData?._id);
        const { data: chatUserData } = await axios.get(
          `http://localhost:1900/api/user/getoneuser/${chatUserId}`,
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
  }, [chat, userData]);

  useEffect(() => {
    const getMessages = async () => {
      const { data } = await axios
        .get(`http://localhost:1900/api/message/${chat?._id}`, {
          withCredentials: true,
        })
        .catch((err) => console.log(err));
      setMessages(data);

      return data;
    };
    getMessages();
  }, [chat]);

  const onHandleChange = (newMessages) => {
    setNewMessages(newMessages);
  };

  const onSend = async (e) => {
    e.preventDefault();

    const message = {
      senderId: userData._id,
      text: newMessages,
      chatId: chat._id,
    };
    const recieverId = chat.members.find((id) => id !== userData._id);
    setSendMessage({ ...message, recieverId });

    try {
      const { data } = await axios.post(
        `http://localhost:1900/api/message`,
        message
      );
      setMessages([...messages, data]);
      setNewMessages("");
    } catch (error) {
      console.log(error);
    }
    // send to socket
  };

  useEffect(() => {
    if (recieveMessage !== null && recieveMessage.chatId === chat?._id) {
      console.log("Messages component re-rendered", recieveMessage);
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="Mesright">
      {chat ? (
        <>
          <div className="Mesrhead">
            <div className="mbodyuserim">
              <img
                src={chatUser?.image}
                alt="chat user"
              />
              <div>
                <p style={{ fontWeight: "bold" }}>{chatUser?.username}</p>
              </div>
            </div>
          </div>
          <div className="Msbody">
            {messages.map((message) => (
              <div
                ref={scroll}
                className={
                  message.senderId == userData?._id ? "userSec own" : "userSec"
                }
              >
                <span>{message.text}</span>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
          </div>
          <div className="MsInput">
            <InputEmoji
              borderColor="#9999"
              value={newMessages}
              onChange={onHandleChange}
            />
            <p onClick={onSend}>Send</p>
          </div>
        </>
      ) : (
        <span className="chatbox-empty-message">
          Tap on a chat to start conversation...
        </span>
      )}
    </div>
  );
};

export default Messages;
