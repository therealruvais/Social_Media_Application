import React, { useContext } from "react";
import "./logoname.css";
import { ClipLoader } from "react-spinners";
import { UserDataContext } from "../../context/UserDataContext";
import { useNavigate, } from "react-router-dom";
import axios from "../../axios-config";

const LogoName = () => {
   const navigate = useNavigate();
    const logOut = async () => {
      const { data } = await axios
        .post(`/user/logout`)
        .catch((err) => console.log("error logging Out", err));
      console.log(data.msg);
      return data;
    };

    const handleLogout = () => {
      logOut().then(() => navigate("/"));
    };

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
      <div onClick={handleLogout} className="switchAc">
        <p style={{cursor:'pointer'}}>Log Out</p>
      </div>
    </div>
  );
};

export default LogoName;
