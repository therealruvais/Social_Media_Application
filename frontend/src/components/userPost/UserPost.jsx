import React, { useContext, useEffect, useState } from "react";
import "../postCard/postCard.css";
import PostEditModal from "./PostEditModal";

import axios from "axios";
axios.defaults.withCredentials = true;

const UserPost = ({ data, userPostdata }) => {
  const [openPostModal, setOpenPostModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [postId, setPostId] = useState(null);

  const user = async () => {
    const { data } = await axios
      .get(`http://localhost:1900/api/user/verify`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    setUserData(data.getaUser);
    return data.getaUser;
  };

  useEffect(() => {
    user();
  }, []);

  const handleImageClick = (postId) => {
    setPostId(postId);
    setOpenPostModal(true);
  };

  return (
    <>
      <div className="editImgC">
        <img
          className="editImg"
          style={{ cursor: "pointer" }}
          src={data.image}
          alt=""
          onClick={() => handleImageClick(data._id)}
        />
      </div>

      {userData?._id == data?.owner?._id ? (
        <PostEditModal
          data={data}
          openPostModal={openPostModal}
          setOpenPostModal={setOpenPostModal}
          postId={postId}
          userPostdata={userPostdata}
        />
      ) : undefined}
    </>
  );
};

export default UserPost;
