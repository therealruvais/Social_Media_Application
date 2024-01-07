import React, { useContext, useEffect, useState } from "react";
import "./postCard.css";
import { CiGrid41, CiHashtag } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import UserPost from "../userPost/UserPost";

const PostCard = ({ userPostdata, userPostData }) => {
  const [profileNav, setProfileNav] = useState("grid");

  return (
    <div className="postC">
      <nav>
        <p
          onClick={() => setProfileNav("grid")}
          className={`navLink ${profileNav == "grid" ? "active" : undefined}`}
        >
          <CiGrid41 />
        </p>
        <p
          onClick={() => setProfileNav("reel")}
          className={`navLink ${profileNav == "reel" ? "active" : undefined}`}
        >
          <MdOutlineSlowMotionVideo />
        </p>
        <p
          onClick={() => setProfileNav("bookmark")}
          className={`navLink ${
            profileNav == "bookmark" ? "active" : undefined
          }`}
        >
          <FaRegBookmark />
        </p>
        <p
          onClick={() => setProfileNav("tagged")}
          className={`navLink ${profileNav == "tagged" ? "active" : undefined}`}
        >
          <CiHashtag />
        </p>
      </nav>
      <div className="postcContainer">
        {userPostData.map((data) => (
          <UserPost
            key={data._id}
            data={data}
            userPostdata={userPostdata}
          />
        ))}
      </div>
    </div>
  );
};

export default PostCard;
