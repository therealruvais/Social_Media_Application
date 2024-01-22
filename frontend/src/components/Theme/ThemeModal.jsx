import React, { useContext } from "react";
import Modal from "react-modal";
import "./themeModal.css";
import { DarkContext } from "../../context/DarkmodeContext";

const ThemeModal = ({ themeModal, setThemeModal }) => {
  const { setDark } = useContext(DarkContext);
  return (
    <Modal
      style={{ overlay: { backgroundColor: "#2e2b2bc7", zIndex: 2 } }}
      className={"ThemeModal"}
      isOpen={themeModal}
      onRequestClose={() => setThemeModal(false)}
    >
      <div className="themeMC">
        <div>
          <button onClick={() => setDark(false)}>🌞 Light</button>
        </div>
        <div>
          <button onClick={() => setDark(true)}>🌝 Dark</button>
        </div>
      </div>
    </Modal>
  );
};

export default ThemeModal;
