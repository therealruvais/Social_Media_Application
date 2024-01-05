import React, { useContext, useState } from "react";
import "./post.css";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { LuShare2 } from "react-icons/lu";
import { TextContext } from "../../context/TextContext";
import CommentModal from "../modal/CommentModal";

const Post = ({ item }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [like, setLike] = useState(false);

  const { showFullText, toggleText } = useContext(TextContext);
  const text = item.desc;
  const maxLength = 100;
  const displayText = showFullText ? text : text.slice(0, maxLength);

  const handleModalToggle = () => {
    setModalIsOpen(true);
  };
  const likeToggle = () => {
    setLike(!like);
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

  return (
    <div>
      <div className="postSec">
        <div className="postContainer">
          <div className="postHead">
            <div className="postImg">
              <img
                src={item.owner.image}
                alt=""
              />
              <p>{item.owner.username}</p>
              <p style={{ color: "#969696" }}>{getTimeDifference()} ago.</p>
            </div>
            <div className="p-icon">
              <BsThreeDots style={{ cursor: "pointer", fontWeight: 300 }} />
            </div>
          </div>
          {/*------------------------- Model strts here------------------- */}
          <CommentModal
            likeToggle={likeToggle}
            like={like}
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            item={item}
            getTimeDifference={getTimeDifference}
          />
          {/*------------------------ Model ends here------------------------------- */}
          <div className="posts">
            <img
              src={item.image}
              alt=""
            />
            <div className="p-icons">
              <div className="lcs-icons">
                <div onClick={likeToggle}>
                  {like ? <FaHeart className="liked-icon" /> : <FaRegHeart />}
                </div>

                <FaRegComment onClick={handleModalToggle} />
                <LuShare2 />
              </div>
              <div className="save-icon">
                <FaRegBookmark />
              </div>
            </div>
            <p style={{ marginTop: "5px", fontWeight: "bold" }}>
              {item.likes.length} likes
            </p>
            <p className="postDesc">
              {displayText}
              {text.length > maxLength && (
                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--color-blue)",
                    cursor: "pointer",
                    fontWeight: 300,
                  }}
                  onClick={toggleText}
                >
                  {showFullText ? " Show Less" : " ....Show More"}
                </span>
              )}
            </p>
          </div>
          <div className="commentSec">
            <p
              style={{ cursor: "pointer" }}
              onClick={handleModalToggle}
            >{`View All Comment's`}</p>
            <div className="add-comment">
              <input
                className="post-comment"
                type="text"
                placeholder="add a comment"
              />
              <p className="post-p">post</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
