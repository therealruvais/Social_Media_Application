import React, { useContext, useEffect, useState } from "react";
import "./notification.css";
import { MdDelete } from "react-icons/md";

import axios from "axios";
import { NotifyContext } from "../../context/NotifyContext";
import Notify from "./Notify";
axios.defaults.withCredentials = true;

const Notification = () => {
  const [notifyData, setNotifydata] = useState([]);

  const getNotify = async () => {
    const { data } = await axios
      .get(`http://localhost:1900/api/notify/follow`, {
        withCredentials: true,
      })
      .catch((err) => console.log(`error  fetching data`, err));
    setNotifydata(data.notifications);
    return data;
  };

  const clearAll = async () => {
    const { data } = await axios.delete(
      `http://localhost:1900/api/notify/delete`
    ).catch(err => console.log('error clearing messsag', err))
    getNotify();
    return data
  };

  useEffect(() => {
    getNotify();
  }, []);

  const deleteAll = () => {
    clearAll().then(data => console.log(data))
  }

  return (
    <div className="notifyC">
      <div className="notifyHead">
        <p
          style={{
            fontSize: 20,
            fontWeight: 450,
          }}
        >
          Notification
        </p>
        <p
          onClick={deleteAll}
          style={{ cursor: "pointer", color: "var(--color-blue)" }}
        >
          clear all
        </p>
      </div>
      <div className="notifications">
        {notifyData.map((data) => (
          <Notify
            data={data}
            key={data._id}
            getNotify={getNotify}
          />
        ))}
      </div>
    </div>
  );
};

export default Notification;
