import React, { useContext } from "react";
import "./logoname.css";
import {ClipLoader} from "react-spinners";
import { UserDataContext } from "../../context/UserDataContext";


const LogoName = () => {
  const { userData } = useContext(UserDataContext);
  if (!userData) {
    // Show a spinner while userData is loading
    return (
      <div className="loading-spinner">
        <ClipLoader
          color="#36d7b7"
          size={15}
          loading={!userData}
        />
      </div>
    );
  }
  return (
    <div className="LogoName">
      <div>
        <img
          src={userData.image}
          alt=""
        />
      </div>
      <div className="webname">
        <h4>
          <i>{userData.name}</i>
        </h4>
        <span>@{userData.username}</span>
      </div>
      <div className="switchAc">
        <p>Switch</p>
      </div>
    </div>
  );
};

export default LogoName;
