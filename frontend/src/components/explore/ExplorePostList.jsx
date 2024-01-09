import React, { useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import PostModel from "./postModel";

const ExplorePostList = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);
  const postToggle = () => {
    setOpenModal(true);
  };
  return (
    <>
      <div
        onClick={postToggle}
        className="exploreImg"
      >
        <img
          className="explore"
          src={item.image}
          alt=""
        />

        <div className="iconContainer">
          <div className="likeIcon">
            <p>
              <FaHeart />
            </p>
            <p>{item.likes.length}</p>
          </div>
          <div className="commentIcon">
            <p>
              <FaComment />
            </p>
            <p>{ item.comments.length}</p>
          </div>
        </div>
      </div>
      <PostModel
        item={item}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default ExplorePostList;
