import React, { useEffect, useState } from "react";
import "./sidebar.css";
import Navigation from "../../components/navigation/Navigation";
import SearchComponent from "../../components/Search/SearchComponent";
import logo from "../../socialmedia/Logo.png";
import Notification from "../../components/notification/Notification";
import { useLocation, useParams } from "react-router-dom";

const SideBar = () => {
  const [search, setSearch] = useState(false);
  const [notify, setNotify] = useState(false);
  const [message, setMessage] = useState(false);
   const { mesage } = useParams();
  const location = useLocation();
  
  useEffect(() => {
     const isMessagePage = location.pathname.includes("message");
     const isMessageParam = mesage === "message";
     setMessage(isMessagePage || isMessageParam);
     localStorage.setItem(
       "messageState",
       JSON.stringify(isMessagePage || isMessageParam)
     );
  },[mesage,location])

  const handleMessageToggle = () => {
    setMessage(!message)
    localStorage.setItem("messageState", JSON.stringify(!message));
  }

  const handleNotifyToggle = () => {
    setNotify(!notify);
  };
  const handleSearchToggle = () => {
    setSearch(!search);
  };
  return (
    <div className={`sidebar ${search || notify ? "active" : undefined} ${message?"message":undefined} `}>
      <div className="SidebarHead">
        <div>
          {search || notify || message ? (
            <img
              className="LogoImg"
              src={logo}
              alt=""
            />
          ) : (
            <h2 className="appName" style={{ marginLeft: 13 }}>
              <i>PicHub</i>
            </h2>
          )}
        </div>
        <Navigation
          handleSearchToggle={handleSearchToggle}
          setSearch={setSearch}
          search={search}
          setNotify={setNotify}
          notify={notify}
          handleNotifyToggle={handleNotifyToggle}
          handleMessageToggle={handleMessageToggle}
          setMessage={setMessage}
          message={message}
        />
      </div>
      <div className={`Searchbar ${search || notify ? undefined : "active"}`}>
        {search && <SearchComponent handleSearchToggle={handleSearchToggle} />}
        {notify && <Notification />}
      </div>
    </div>
  );
};

export default SideBar;
