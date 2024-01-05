import React, { useContext, useEffect, useState } from "react";
import { NavData } from "../../data/NavData";
import "./navigation.css";
import NavlistItem from "./NavlistItem";
import CreateModal from "../createModel/CreateModal";

import axios from "axios";
axios.defaults.withCredentials = true;

const Navigation = ({
  handleSearchToggle,
  setSearch,
  search,
  handleNotifyToggle,
  notify,
  setNotify,
}) => {
  const [nav, setNav] = useState(NavData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleModalToggle = () => {
    setModalIsOpen(true);
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
      .get(`http://localhost:1900/api/user/verify`, {
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

  return (
    <div className="sideMenu">
      <ul className="nav">
        {NavData.map((item) => (
          <NavlistItem
            key={item._id}
            item={item}
            navonClick={handleNavActive}
            handleModalToggle={handleModalToggle}
            handleSearchToggle={handleSearchToggle}
            setSearch={setSearch}
            search={search}
            handleNotifyToggle={handleNotifyToggle}
            notify={notify}
            setNotify={setNotify}
          />
        ))}
      </ul>
      <CreateModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
};

export default Navigation;
