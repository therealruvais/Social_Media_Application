import React, { useEffect, useRef, useState } from "react";
import "../../pages/messages/message.css";
import InputEmoji from "react-input-emoji";
import { format } from "timeago.js";
import axios from "../../axios-config";
import { BsMessenger } from "react-icons/bs";


const Messages = ({
  chat,
  userData,
  setSendMessage,
  recieveMessage,
 
}) => {
  const [chatUser, setChatUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");

  const scroll = useRef();

  useEffect(() => {
    const getChatUsers = async () => {
      try {
        const chatUserId = chat?.members?.find((id) => id !== userData?._id);
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
  }, [chat, userData]);

  useEffect(() => {
    const getMessages = async () => {
      const { data } = await axios
        .get(`/message/${chat?._id}`, {
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
        `/message`,
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
    if (recieveMessage !== null && recieveMessage?.chatId === chat?._id) {
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const clearMessages = async () => {
    try {
      const { data } = await axios.delete(
        `/message/delete/${chat?._id}`
      );
      console.log(data)
      setMessages([])
    } catch (error) {
      console.error("Error clearing messages:", error.message);
    }
  }

  const handleDelete = () => {
    clearMessages()
  }

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
            <div>
              <p
                onClick={handleDelete}
                className="clearMsg"
                style={{ color: "var(--color-blue)" }}
              >
                Clear all
              </p>
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
              className="msginp"
              borderColor="#9999"
              value={newMessages}
              onChange={onHandleChange}
            />
            <p onClick={onSend}>Send</p>
          </div>
        </>
      ) : (
        <div className="chatbox">
          <div>
            <BsMessenger className="chatImg" />
          </div>
          <span style={{ alignSelf: "center", fontWeight: "bold" }}>
            Tap on a chat to start conversation...
          </span>
        </div>
      )}
    </div>
  );
};

export default Messages;
