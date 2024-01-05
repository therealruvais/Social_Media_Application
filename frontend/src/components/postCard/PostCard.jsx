import React, { useEffect, useState } from "react";
import "./postCard.css";
import { Route, Routes } from "react-router-dom";
import { CiGrid41, CiHashtag } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import UserPost from "../userPost/UserPost";

import axios from "axios";

axios.defaults.withCredentials = true;


const PostCard = ({ username }) => {
  const [profileNav, setProfileNav] = useState("grid");
  const [userPostData, setUserPostData] = useState([])

  const userPostdata = async () => {
    const { data } = await axios.get(
      `http://localhost:1900/api/post/userpost/${username}`, {
        withCredentials:true,
      }
    ).catch(err => console.log(err))
    return data.userPost
  }

  useEffect(() => {
  userPostdata().then((data) => setUserPostData(data))
  }, [username])
  

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
        <UserPost userPostData={userPostData} />
      </div>
    </div>
  );
};

export default PostCard;
