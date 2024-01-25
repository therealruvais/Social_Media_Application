import React, { useContext, useEffect, useRef, useState } from "react";
import "./profileCard.css";
import { IoSettingsOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import axios from 'axios'
axios.defaults.withCredentials = true;
import EditModal from "./EditModal";
import LogOutModal from "./LogOutModal";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({
  username,
  userPostData,
  user,
  profile,
  profileData,
  setProfileData,
}) => {
  const [userData, setUserData] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [recieverId, setRecieverId] = useState(user._id);
  const fileRef = useRef();
  const navigate = useNavigate();

  const uploadToCloudinary = async (imageFile) => {
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "socialmedia");
    data.append("cloud_name", "ddwuuorpm");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/ddwuuorpm/image/upload",
        data,
        { withCredentials: false }
      );
      return response.data.url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw new Error("Failed to upload image to Cloudinary");
    }
  };

  const sendImageUrlToBackend = async (imageUrl) => {
    try {
      const response = await axios.put(
        `https://encouraging-erin-neckerchief.cyclic.app/api/user/updateimg`,
        { imageUrl }
      );
      console.log("Image URL updated successfully:", response.data);

      setProfileData((prevProfileData) => {
        const updatedData = prevProfileData.map((profile) => {
          if (profile.username === username) {
            return { ...profile, image: imageUrl };
          }
          return profile;
        });
        return updatedData;
      });
    } catch (error) {
      console.error("Error updating image URL:", error);
    }
  };

  const onHandleChange = async (e) => {
    const selectedImage = e.target.files[0];
    try {
      const imageUrl = await uploadToCloudinary(selectedImage);
      sendImageUrlToBackend(imageUrl);
    } catch (error) {
      console.log(`error handling image upload`, err);
    }
  };

  const users = async () => {
    const { data } = await axios
      .get(`https://encouraging-erin-neckerchief.cyclic.app/api/user/verify`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    return data.getaUser;
  };

  const followUnfollow = async () => {
    const { data } = await axios
      .put(
        `https://encouraging-erin-neckerchief.cyclic.app/api/user/followunfollow/${username}`
      )
      .catch((err) => console.log("error following user", err));
    return data;
  };

  const onHandleClick = () => {
    const updatedProfileData = profileData.map((profile) => {
      if (profile.username === username) {
        const updatedFollowers = profile.followers.some(
          (follower) => follower._id === userData._id
        )
          ? profile.followers.filter(
              (follower) => follower._id !== userData._id
            )
          : [...profile.followers, { _id: userData._id }];

        return {
          ...profile,
          followers: updatedFollowers,
        };
      }
      return profile;
    });

    setProfileData(updatedProfileData);

    // Send request to server
    followUnfollow()
      .then((data) => console.log(data))
      .catch((error) => {
        // Revert UI changes if there's an error
        setProfileData(profileData);
        console.error("Error:", error);
      });
  };

  const createChat = async () => {
    const { data } = await axios
      .post(`https://encouraging-erin-neckerchief.cyclic.app/api/chat`, {
        senderId: userData?._id,
        recieverId: recieverId,
      })
      .catch((err) => console.log(err));
    console.log(data);
    if (data.msg === "success" || "exists") {
      navigate("/message");
    }
    return data;
  };

  const onMessageClick = () => {
    setRecieverId(user._id);
    createChat();
  };

  useEffect(() => {
    users().then((data) => setUserData(data));
  }, [username]);

  return (
    <div
      className="proCard"
      key={user?._id}
    >
      <div className="profileImg">
        <div className="proImgSec">
          <img
            src={user.image}
            alt=""
            onClick={() => fileRef.current.click()}
          />
          {userData?.username === user.username ? (
            <input
              type="file"
              ref={fileRef}
              onChange={onHandleChange}
              style={{ display: "none" }}
            />
          ) : undefined}
        </div>
      </div>
      <div className="proName">
        <div className="userName">
          <p style={{ fontSize: "22px" }}>{user.username}</p>
          {userData?.username === user.username ? (
            <>
              <button
                className="ed-button"
                onClick={() => setEditModal(true)}
              >
                Edit Profile
              </button>
              <button className="ed-button"> View archives</button>
              <p style={{ fontSize: 22, cursor: "pointer" }}>
                <IoSettingsOutline onClick={() => setLogoutModal(true)} />
              </p>
            </>
          ) : (
            <>
              {user?.followers?.some(
                (follower) => follower?._id === userData?._id
              ) ? (
                <button
                  onClick={onHandleClick}
                  className="ed-button"
                >
                  Following
                </button>
              ) : (
                <button
                  onClick={onHandleClick}
                  className="ed-button"
                >
                  Follow
                </button>
              )}
              <button
                onClick={onMessageClick}
                className="ed-button"
              >
                Message
              </button>
              <p style={{ fontSize: 22, cursor: "pointer" }}>
                <BsThreeDots />
              </p>
            </>
          )}
        </div>
        <div className="followernum">
          <p>
            <span style={{ fontWeight: "bold" }}>{userPostData.length}</span>{" "}
            posts
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>{user.followers.length}</span>{" "}
            followers
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>{user.following.length}</span>{" "}
            following
          </p>
        </div>
        <div className="userN">
          <p style={{ fontWeight: "bold", fontSize: "18px" }}>{user.name}</p>
        </div>
        <div className="Bio">
          <p>{user.bio}</p>
        </div>
        <div className="Bio">
          {user.website !== "" ? (
            <p>
              <a
                style={{ textDecoration: "none", color: "var(--color-blue)" }}
                href={`${user.website}`}
                target="_blank"
              >
                Website 🌎
              </a>
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
      <EditModal
        editModal={editModal}
        setEditModal={setEditModal}
        user={user}
        profile={profile}
      />
      <LogOutModal
        logoutModal={logoutModal}
        setLogoutModal={setLogoutModal}
      />
    </div>
  );
};

export default ProfileCard;
