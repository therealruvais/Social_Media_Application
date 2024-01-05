import React from "react";
import Modal from "react-modal";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { LuShare2 } from "react-icons/lu";
import "./postModel.css";
const PostModel = ({ item, openModal, setOpenModal }) => {
  return (
    <>
      <Modal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        className={"modalForPost"}
      >
        <div className="modalLeft">
          <img
            className="ModalImg"
            src={item.postImg}
            alt=""
          />
        </div>

        <div className="ModelRight">
          <div className="MR">
            <div className="modalRightContainer">
              <div className="modalpostImg">
                <img
                  className="modalUserImg"
                  src={item.userImg}
                  alt=""
                />
                <p>{item.username}</p>
              </div>
              <div>
                <BsThreeDots />
              </div>
            </div>

            <div className="PostModel">
              <div className="commentavtar">
                <img
                  className="modalcommentImg"
                  src={item.userImg}
                  alt=""
                />
                <p>
                  @{item.username} <span>{item.desc}</span>
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
                  <div>
                    <FaRegHeart />
                  </div>
                  <FaRegComment />
                  <LuShare2 />
                </div>
                <FaRegBookmark className="savemodal" />
              </div>
              <p style={{ fontWeight: "bold" }}>1000 likes</p>
              <p style={{ fontSize: "12px", color: "#969696" }}>2d ago</p>
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
        {/* <div style={{cursor:"pointer"}}>X</div> */}
      </Modal>
    </>
  );
};

export default PostModel;
