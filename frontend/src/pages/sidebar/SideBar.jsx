import React, { useState } from "react";
import "./sidebar.css";
import Navigation from "../../components/navigation/Navigation";
import SearchComponent from "../../components/Search/SearchComponent";
import logo from "../../socialmedia/Logo.png";
import Notification from "../../components/notification/Notification";

const SideBar = () => {
  const [search, setSearch] = useState(false);
  const [notify, setNotify] = useState(false);
  const handleNotifyToggle = () => {
    setNotify(!notify);
  };
  const handleSearchToggle = () => {
    setSearch(!search);
  };
  return (
    <div className={`sidebar ${search || notify ? "active" : undefined} `}>
      <div className="SidebarHead">
        <div>
          {search || notify ? (
            <img
              className="LogoImg"
              src={logo}
              alt=""
            />
          ) : (
            <h2 style={{ marginLeft: 13 }}>
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
