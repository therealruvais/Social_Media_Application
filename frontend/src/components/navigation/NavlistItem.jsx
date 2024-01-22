import React from 'react'
import { Link } from 'react-router-dom';

const NavlistItem = ({
  item,
  navonClick,
  handleModalToggle,
  handleSearchToggle,
  setSearch,
  search,
  handleNotifyToggle,
  notify,
  setNotify,
  notifyCount,
  handleMessageToggle,
  message,
  setMessage,
  handleReadClick,
  handleThemeModal,
}) => {
  const handleClick = () => {
    if (item._id === 5 && handleModalToggle) {
      handleModalToggle();
      setSearch(false);
      setNotify(false);
      setMessage(false);
    }
    if (item._id === 6 && handleSearchToggle) {
      handleSearchToggle();
      setNotify(false);
      setMessage(false);
    }
    if (item._id === 3 && handleNotifyToggle) {
      handleNotifyToggle();
      handleReadClick();
      setSearch(false);
      setMessage(false);
    }
    if (item._id === 1) {
      setSearch(false);
      setNotify(false);
      setMessage(false);
    }
    if (item._id === 2) {
      setSearch(false);
      setNotify(false);
      setMessage(false);
    }
    if (item._id === 4 && handleMessageToggle) {
      handleMessageToggle();
      setSearch(false);
      setNotify(false);
    }
    if (item._id === 7) {
      setSearch(false);
      setNotify(false);
      setMessage(false);
    }
    if (item._id === 8 && handleThemeModal) {
      handleThemeModal()
      setSearch(false);
      setNotify(false);
      setMessage(false);
    }

    navonClick(item._id);
  };
  return (
    <li>
      <Link
        to={item.target}
        className={`navlink ${item.active ? "active" : undefined}`}
        onClick={handleClick}
      >
        <span className="nav-icon">{item.icon}</span>
        <span
          className={`nav-name ${
            search || notify || message ? "active" : undefined
          } `}
        >
          {item.name}
        </span>
      </Link>
      {item._id === 3 && notifyCount > 0 && (
        <span className="notification">{notifyCount}</span>
      )}
    </li>
  );
};

export default NavlistItem