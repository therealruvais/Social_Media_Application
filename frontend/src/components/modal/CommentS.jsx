import React, { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";
import { UserDataContext } from "../../context/UserDataContext";
import axios from '../../axios-config'

const CommentS = ({ data, getComments }) => {
  const { userData } = useContext(UserDataContext);
  const [commentId, setCommentId] = useState(data._id);

  const deleteComment = async () => {
    const { data } = await axios
      .delete(`/post/deleteC/${commentId}`)
      .catch((err) => console.log(err));
    getComments();
    return data;
  };

  const onDelete = () => {
    setCommentId(data._id);
    deleteComment()
  };

  return (
    <div>
      <div className="commentavtar">
        <img
          className="modalcommentImg"
          src={data.owner.image}
          alt=""
        />
        <p>
          <span style={{ fontWeight: "bold" }}>@{data.owner.username}</span>{" "}
          <span>{data.content}</span>
        </p>
        {userData.username == data.owner.username ? (
          <p
            onClick={() => onDelete()}
            style={{ alignSelf: "center", cursor: "pointer" }}
          >
            <MdDelete />
          </p>
        ) : (
          ""
        )}
      </div>
      <div
        style={{ marginBottom: 10 }}
        className="commentreply"
      >
        <p>2d</p>
        <p>reply</p>
      </div>
    </div>
  );
};

export default CommentS;
