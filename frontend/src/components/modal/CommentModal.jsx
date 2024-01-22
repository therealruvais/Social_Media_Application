import "./commentModal.css";
import Modal from "react-modal";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart, FaRegBookmark, FaHeart, FaBookmark } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { LuShare2 } from "react-icons/lu";

import CommentS from "./CommentS";


const CommentModal = ({
  modalIsOpen,
  setModalIsOpen,
  item,
  getTimeDifference,
  handlelikeClick,
  hasLiked,
  comments,
  setComments,
  postComment,
  commentData,
  getComments,
  onSaveClick,
  isSaved
}) => {
  

  const onPostClick = () => {
    postComment();
    setComments("");
  };

 
  
  return (
    <>
      <Modal
        style={{overlay:{backgroundColor:"#2e2b2bc7",zIndex:2}}}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className={"modalForC"}
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
                  <span style={{ fontWeight: "bold" }}>
                    @{item.owner.username}
                  </span>{" "}
                  <span>{item.desc}</span>
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
                  <div
                    className="k"
                    onClick={handlelikeClick}
                  >
                    {hasLiked ? (
                      <FaHeart style={{ color: "red" }} />
                    ) : (
                      <FaRegHeart />
                    )}
                  </div>
                  <FaRegComment />
                  <LuShare2 />
                </div>
                <div
                  onClick={onSaveClick}
                  className="save-icon"
                >
                  {isSaved ? <FaBookmark /> : <FaRegBookmark />}
                </div>
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
      </Modal>
    </>
  );
};

export default CommentModal;
