import React from "react";
import Modal from "react-modal";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { LuShare2 } from "react-icons/lu";
import "./commentModel.css";
const CommentModal = ({
  modalIsOpen,
  setModalIsOpen,
  item,
  like,
  likeToggle,
  getTimeDifference,
}) => {
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
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
            
            <div className="commentModal">
              <div className="commentavtar">
                <img
                  className="modalcommentImg"
                  src={item.owner.image}
                  alt=""
                />
                <p>
                  @{item.owner.username} <span>{item.desc}</span>
                </p>
                <p style={{ alignSelf: "center", cursor: "pointer" }}>
                  <FaRegHeart />
                </p>
              </div>
              <div className="commentreply">
                <p>2d</p>
                <p>11 likes</p>
                <p>reply</p>
              </div>
            </div>
            <div className="lcsModalContainer">
              <div className="lslModal">
                <div className="lscmodal">
                  <div
                    className="k"
                    onClick={likeToggle}
                  >
                    {like ? (
                      <FaHeart style={{ color: "red" }} />
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
                />
                <p className="post-p">post</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CommentModal;
