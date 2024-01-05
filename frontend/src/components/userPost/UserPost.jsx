import React from "react";
import './userPost.css'
import post from '../../socialmedia/post20.jpg'

const UserPost = ({ userPostData }) => {
  return (
    <div className="editPostC">
      <div className="editImgC">
        {userPostData.map((data) => (
          <img
            className="editImg"
            src={data.image}
            alt=""
            key={data._id}
            />
        ))}
      </div>
    </div>
  );
};

export default UserPost;
