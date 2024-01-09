import React, { useContext, useEffect, useState } from "react";
import "./post.css";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { LuShare2 } from "react-icons/lu";
import { TextContext } from "../../context/TextContext";
import CommentModal from "../modal/CommentModal";
import { UserDataContext } from "../../context/UserDataContext";
import axios from "axios";
axios.defaults.withCredentials = true;

const Post = ({ item, posts }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [postId, setPostId] = useState(item._id);
  const [comments, setComments] = useState("");
  const [commentData, setCommentData] = useState([]);


  const { userData } = useContext(UserDataContext);

  const { showFullText, toggleText } = useContext(TextContext);
  const text = item.desc;
  const maxLength = 70;
  const displayText = showFullText ? text : text.slice(0, maxLength);

  const handleModalToggle = () => {
    setModalIsOpen(true);
    setPostId(item._id);
  };

  const likeUnlike = async () => {
    const { data } = await axios
      .put(`http://localhost:1900/api/post/like/${postId}`)
      .catch((err) => console.log("error fetching post data", err));
    posts();
    return data;
  };

  const handlelikeClick = () => {
    setPostId(item._id);
    likeUnlike().then((data) => console.log(data));
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

  const getComments = async () => {
    const { data } = await axios
      .get(`http://localhost:1900/api/post/getcomments/${postId}`, {
        withCredentials: true,
      })
      .catch((err) => console.log(`error feching comment data`, err));
    setCommentData(data.comments);
    return data;
  };


  const postComment = async () => {
    const { data } = await axios.post(
      `http://localhost:1900/api/post/comment/${postId}`, {
        content:comments,
      }
    ).catch(err => console.log(`error posting comment`, err))
    getComments()
    return data
  }

  
  useEffect(() => {
    getComments();
  }, []);

  const onPostClick = () => {
    postComment().then(data => console.log(data))
    setComments("")
  }

  const hasLiked = item.likes.some((likeId) => likeId === userData._id);

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
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            item={item}
            getTimeDifference={getTimeDifference}
            hasLiked={hasLiked}
            handlelikeClick={handlelikeClick}
            comments={comments}
            setComments={setComments}
            postComment={postComment}
            commentData={commentData}
            getComments={getComments}
          />
          {/*------------------------ Model ends here------------------------------- */}
          <div className="posts">
            <img
              src={item.image}
              alt=""
            />
            <div className="p-icons">
              <div className="lcs-icons">
                <div onClick={handlelikeClick}>
                  {hasLiked ? (
                    <FaHeart className="liked-icon" />
                  ) : (
                    <FaRegHeart />
                  )}
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
            >{`View All ${item.comments.length} Comment's`}</p>
            <div className="add-comment">
              <input
                className="post-comment"
                type="text"
                placeholder="add a comment :)"
                name="comments"
                value={comments}
                onClick={() => setPostId(item._id)}
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
    </div>
  );
};

export default Post;
