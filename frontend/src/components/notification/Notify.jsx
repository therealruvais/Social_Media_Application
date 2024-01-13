import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import axios from "axios";


const Notify = ({ data, getNotify }) => {
  const [notifyId, setNotifyId] = useState(data._id);

  const deleteNot = async () => {
    const { data } = await axios
      .delete(`http://localhost:1900/api/notify/delete/${notifyId}`)
          .catch((err) => console.log(err, `cannot delete notification`));
      getNotify();
    return data;
  };

  const onDeleteClick = () => {
    setNotifyId(data._id);
    deleteNot();
  };

  return (
    <div className="Nimg">
      <img
        src={data.image}
        alt=""
      />
      <div className="Nname">
        <span style={{ fontWeight: "bold" }}>{data.username}</span>{" "}
        <span> {data.actionType}</span>
      </div>
          <div
              style={{ cursor: 'pointer' }} onClick={onDeleteClick}>
        <MdDelete />
      </div>
    </div>
  );
};

export default Notify