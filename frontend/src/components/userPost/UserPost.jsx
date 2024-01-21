import React, {  useState } from "react";
import "../postCard/postCard.css";
import PostEditModal from "./PostEditModal";


const UserPost = ({ data, userPostdata,userData }) => {
  const [openPostModal, setOpenPostModal] = useState(false);
  const [postId, setPostId] = useState(null);

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
