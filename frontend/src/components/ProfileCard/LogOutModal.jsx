import React from "react";
import "./logOutModal.css";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const LogOutModal = ({ logoutModal, setLogoutModal }) => {
    const navigate = useNavigate()

    const logOut = async () => {
        const { data } = await axios.post(
          `http://localhost:1900/api/user/logout`
        ).catch((err) => console.log('error logging Out', err))
        console.log(data)
        return data
    }

    const handleLogout = () => {
        logOut().then(() => navigate("/"))
    }

  return (
    <Modal
      className={"LogOutModal"}
      isOpen={logoutModal}
      onRequestClose={() => setLogoutModal(false)}
    >
      <div className="logMC">
        <div>
          <button onClick={handleLogout} >Log Out</button>
        </div>
        <div>
          <button onClick={() =>setLogoutModal(false)} >Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;
