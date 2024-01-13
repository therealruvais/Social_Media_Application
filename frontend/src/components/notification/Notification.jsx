import React, { useContext, useEffect, useState } from "react";
import "./notification.css";
import { MdDelete } from "react-icons/md";

import axios from 'axios'
import { NotifyContext } from "../../context/NotifyContext";
import Notify from "./Notify";
axios.defaults.withCredentials = true;

const Notification = () => {

  const [notifyData, setNotifydata] = useState([])
  
  const getNotify = async () => {
    const { data } = await axios.get(`http://localhost:1900/api/notify/follow`, {
      withCredentials:true,
    }).catch(err => console.log(`error  fetching data`, err))
    setNotifydata(data.notifications)
    return data
  }

  useEffect(() => {
   getNotify()
  }, [])
  
  
  return (
    <div className="notifyC">
      <div className="notifyHead">
        <p
          style={{
            marginTop: 15,
            marginLeft: 15,
            fontSize: 20,
            fontWeight: 450,
          }}
        >
          Notification
        </p>
      </div>
      <div className="notifications">
        {notifyData.map((data) => (
          <Notify data={data} key={data._id} getNotify={getNotify} />
        ))}
      </div>
    </div>
  );
};

export default Notification;
