import React, { useEffect, useState } from "react";
import "./editModal.css";
import Modal from "react-modal";
import axios from '../../axios-config'

const EditModal = ({ editModal, setEditModal, user, profile }) => {
  const [form, setForm] = useState({
    name: user.name,
    username: user.username,
    bio: user.bio,
    website: user.website,
  });
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const newUser = async () => {
    const { data } = await axios
      .patch(`/user/update`, {
        name: form.name,
        username: form.username,
        bio: form.bio,
        website: form.website,
      })
      .catch((err) => console.log("something went wrong", err));
    profile()
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newUser();
      setEditModal(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Modal
      style={{ overlay: { backgroundColor: "#2e2b2bc7", zIndex: 2 } }}
      className={"ProfileEditModal"}
      isOpen={editModal}
      onRequestClose={() => setEditModal(false)}
    >
      <div className="editMCon">
        <form
          className="editForm"
          onSubmit={handleSubmit}
        >
          <div>
            <h3>Change Name</h3>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <h3>Change Userame</h3>
            <input
              type="text"
              placeholder="Enter userame"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <h3>Change Bio</h3>
            <input
              type="text"
              placeholder="Bio"
              name="bio"
              value={form.bio}
              onChange={handleChange}
            />
          </div>
          <div>
            <h3>Change Website</h3>
            <input
              type="text"
              placeholder="Website"
              name="website"
              value={form.website}
              onChange={handleChange}
            />
          </div>
          <div>
            <button className="ed-button">Submit</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditModal;
