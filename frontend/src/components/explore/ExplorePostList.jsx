import React, { useEffect, useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import PostModel from "./PostModel";
import axios from '../../axios-config'


const ExplorePostList = ({ item, userData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [postId, setPostId] = useState(item._id);

  const getComments = async () => {
    const { data } = await axios
      .get(`/post/getcomments/${postId}`, {
        withCredentials: true,
      })
      .catch((err) => console.log(`error feching comment data`, err));
    setCommentData(data.comments);
    return data;
  };

  useEffect(() => {
    getComments();
  }, []);

  const postToggle = () => {
    setPostId(item._id);
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
            <p>{item.comments.length}</p>
          </div>
        </div>
      </div>
      <PostModel
        item={item}
        openModal={openModal}
        setOpenModal={setOpenModal}
        commentData={commentData}
        getComments={getComments}
        postId={postId}
        userData={userData}
      />
    </>
  );
};

export default ExplorePostList;
