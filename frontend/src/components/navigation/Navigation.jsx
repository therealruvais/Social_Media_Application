import React, { useContext, useEffect, useState } from "react";
import { NavData } from "../../data/NavData";
import "./navigation.css";
import NavlistItem from "./NavlistItem";
import CreateModal from "../createModel/CreateModal";

import axios from "../../axios-config";
import { NotifyContext } from "../../context/NotifyContext";
import ThemeModal from "../Theme/ThemeModal";

const Navigation = ({
  handleSearchToggle,
  setSearch,
  search,
  handleNotifyToggle,
  notify,
  setNotify,
  handleMessageToggle,
  message,
  setMessage,
}) => {
  const [nav, setNav] = useState(NavData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [themeModal, setThemeModal] = useState(false);
  const [notifyCount, setNotifyCount] = useState(0);

  const { notifyData } = useContext(NotifyContext);

  const isRead = async () => {
    const { data } = await axios
      .put(`/notify/read-all`)
      .catch((err) => console.log(err));

    return data;
  };

  const handleModalToggle = () => {
    setModalIsOpen(true);
  };
  const handleThemeModal = () => {
    setThemeModal(true);
  };
  const handleNavActive = (id) => {
    const newNavData = nav.map((nav) => {
      nav.active = false;
      if (nav._id === id) nav.active = true;

      return nav;
    });
    setNav(newNavData);
  };
  const user = async () => {
    const { data } = await axios
      .get(`/user/verify`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    return data.getaUser;
  };
  useEffect(() => {
    const updateNavData = async () => {
      const currentUser = await user();
      const updatedNavData = nav.map((item) => {
        if (item._id === 7) {
          item.target = `/profile/${currentUser.username}`;
          item.icon = (
            <img
              src={currentUser.image}
              alt=""
            />
          );
        }
        return item;
      });
      setNav(updatedNavData);
    };

    updateNavData();
  }, []);

  const numberOfnotification = () => {
    const unreadNotifications = notifyData.filter((item) => !item.isRead);
    setNotifyCount(unreadNotifications.length);
  };

  const handleReadClick = () => {
    isRead();
    setNotifyCount(0);
  };

  useEffect(() => {
    numberOfnotification();
  }, [notifyData]);

  return (
    <div className="sideMenu">
      <ul className="nav">
        {NavData.map((item) => (
          <NavlistItem
            key={item._id}
            item={item}
            navonClick={handleNavActive}
            handleModalToggle={handleModalToggle}
            handleThemeModal={handleThemeModal}
            handleSearchToggle={handleSearchToggle}
            setSearch={setSearch}
            search={search}
            handleNotifyToggle={handleNotifyToggle}
            notify={notify}
            setNotify={setNotify}
            handleMessageToggle={handleMessageToggle}
            message={message}
            setMessage={setMessage}
            notifyCount={notifyCount}
            handleReadClick={handleReadClick}
          />
        ))}
      </ul>
      <CreateModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
      <ThemeModal
        themeModal={themeModal}
        setThemeModal={setThemeModal}
      />
    </div>
  );
};

export default Navigation;
