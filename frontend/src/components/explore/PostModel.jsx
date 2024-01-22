import React, { useState } from "react";
import Modal from "react-modal";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { LuShare2 } from "react-icons/lu";
import "./postModel.css";
import CommentS from "../modal/CommentS";

import axios  from "../../axios-config";

const PostModel = ({
  item,
  openModal,
  setOpenModal,
  commentData,
  getComments,
  postId,
  userData,
}) => {
  const [comments, setComments] = useState("");
  const postComment = async () => {
    const { data } = await axios
      .post(`/post/comment/${postId}`, {
        content: comments,
      })
      .catch((err) => console.log(`error posting comment`, err));
    getComments();
    return data;
  };
  const onPostClick = () => {
    postComment()
    setComments("");
  };

  const getTimeDifference = () => {
    const currentTime = new Date();
    const createdAtTime = new Date(item.createdAt);
    const timeDifferenceInSeconds = Math.floor(
      (currentTime - createdAtTime) / 1000
    );

    const days = Math.floor(timeDifferenceInSeconds / (3600 * 24));
    const hours = Math.floor((timeDifferenceInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
    const seconds = timeDifferenceInSeconds % 60;

    let displayTime = "";
    if (days > 0) {
      displayTime = `${days}d`;
    } else if (hours > 0) {
      displayTime = `${hours}h `;
    } else if (minutes > 0) {
      displayTime = `${minutes}m`;
    } else {
      displayTime = `${seconds}s`;
    }

    return displayTime;
  };

  const hasLiked = item.likes.some((likeId) => likeId === userData._id);


  return (
    <>
      <Modal
        style={{ overlay: { backgroundColor: "#2e2b2bc7", zIndex: 2 } }}
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        className={"modalForPost"}
      >
        <div className="modalLeft">
          <img
            className="ModalImg"
            src={item.image}
            alt=""
          />
        </div>

        <div className="ModelRight">
          <div className="MR">
            <div className="modalRightContainer">
              <div className="modalpostImg">
                <img
                  className="modalUserImg"
                  src={item.owner.image}
                  alt=""
                />
                <p>{item.owner.username}</p>
              </div>
              <div>
                <BsThreeDots />
              </div>
            </div>

            <div className="PostModel">
              <div
                style={{ marginBottom: 10 }}
                className="commentavtar"
              >
                <img
                  className="modalcommentImg"
                  src={item.owner.image}
                  alt=""
                />
                <p>
                  @{item.owner.username} <span>{item.desc}</span>
                </p>
              </div>
              {commentData.map((data) => (
                <CommentS
                  data={data}
                  key={data._id}
                  getComments={getComments}
                />
              ))}
            </div>
            <div className="lcsModalContainer">
              <div className="lslModal">
                <div className="lscmodal">
                  <div>
                    {hasLiked ? (
                      <FaHeart className="liked-icon" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </div>
                  <FaRegComment />
                  <LuShare2 />
                </div>
                <FaRegBookmark className="savemodal" />
              </div>
              <p style={{ fontWeight: "bold" }}>{item.likes.length} likes</p>
              <p style={{ fontSize: "12px", color: "#969696" }}>
                {getTimeDifference()} ago
              </p>
              <div className="modalInput">
                <input
                  className="inputModal"
                  type="text"
                  placeholder="Add a comment:)"
                  name="comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
                {comments ? (
                  <p
                    onClick={onPostClick}
                    className="post-p"
                  >
                    post
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <div style={{cursor:"pointer"}}>X</div> */}
      </Modal>
    </>
  );
};

export default PostModel;
