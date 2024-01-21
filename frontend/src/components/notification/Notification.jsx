import React, { useContext, useEffect, useState } from "react";
import "./notification.css";

import axios from '../../axios-config'
import Notify from "./Notify";

const Notification = () => {
  const [notifyData, setNotifydata] = useState([]);

  const getNotify = async () => {
    const { data } = await axios
      .get(`/notify/follow`, {
        withCredentials: true,
      })
      .catch((err) => console.log(`error  fetching data`, err));
    setNotifydata(data.notifications);
    return data;
  };

  const clearAll = async () => {
    const { data } = await axios.delete(
      `/notify/delete`
    ).catch(err => console.log('error clearing messsag', err))
    getNotify();
    return data
  };

  useEffect(() => {
    getNotify();
  }, []);

  const deleteAll = () => {
    clearAll().then(data => console.log(data.msg))
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
