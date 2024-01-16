import React from 'react'
import InputEmoji from "react-input-emoji";


const ChatBox = () => {
    
  return (
    <>
      <div className="Msbody">
        <div className="userSec own">
          <span>hi</span>
          <span>jusnow</span>
        </div>
      </div>
      <div className="MsInput">
        <InputEmoji borderColor="#9999" />
        <p>Send</p>
      </div>
    </>
  );
}

export default ChatBox