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
  setNotify
}) => {
  const handleClick = () => {
    if (item._id === 5 && handleModalToggle) {
      handleModalToggle();
      setSearch(false);
      setNotify(false)
    } if (item._id === 6 && handleSearchToggle) {
      handleSearchToggle();
      setNotify(false)
    } if (item._id === 3 && handleNotifyToggle) {
      handleNotifyToggle()
      setSearch(false)
    }
    if (item._id === 1) {
      setSearch(false)
      setNotify(false)
    }
    if (item._id === 2) {
      setSearch(false)
      setNotify(false)
    }
    if (item._id === 4) {
      setSearch(false)
      setNotify(false)
    }
    if (item._id === 7) {
      setSearch(false)
      setNotify(false)
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
        <span className={`nav-name ${search || notify ? "active" : undefined} `}>
          {item.name}
        </span>
      </Link>
    </li>
  );
};

export default NavlistItem