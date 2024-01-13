import React from "react";
import "./message.css";
import { FaRegEdit } from "react-icons/fa";
import uimg from "../../socialmedia/avatar/avatar2.jpg";

const Message = () => {
  return (
    <div className="messageSection">
      <div className="messsageCon">
        <div className="Mesleft">
          <div className="Meshead">
            <h3 style={{ fontSize: 26 }}>ruvais</h3>
            <FaRegEdit style={{ fontSize: 26, cursor: "pointer" }} />
          </div>
          <div className="Mesusers">
            <div className="muserim">
              <img
                src={uimg}
                alt=""
              />
              <div>
                <p style={{ fontSize: 24, marginTop: 9 }}>zoya</p>
              </div>
            </div>
          </div>
        </div>
        <div className="Mesright">
          <div className="Mesrhead">
            <div className="mbodyuserim">
              <img
                src={uimg}
                alt=""
              />
              <div>
                <p style={{fontWeight:'bold'}} >zoya</p>
              </div>
            </div>
          </div>
          <div className="Msbody"></div>
          <div className="MsInput">hi</div>
        </div>
      </div>
    </div>
  );
};

export default Message;
