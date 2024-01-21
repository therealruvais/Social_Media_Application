import React, { useState } from "react";
import "./postCard.css";
import { CiGrid41 } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa";
import UserPost from "../userPost/UserPost";
import SavedPage from "./SavedPage";


const PostCard = ({ userPostdata, userPostData, savedPostData, userData }) => {
  const [profileNav, setProfileNav] = useState("grid");
  const [savedPage, setSavedPage] = useState(false);


  const handleGridClick = () => {
    setProfileNav("grid");
    setSavedPage(false);
  };

  const handleBookmarkClick = () => {
    setProfileNav("bookmark");
    setSavedPage(true);
  };

  const savedS = userPostData.map((data) => data.owner._id);

  return (
    <div className="postC">
      <nav>
        <p
          onClick={() => handleGridClick()}
          className={`navLink ${profileNav == "grid" ? "active" : undefined}`}
        >
          <CiGrid41 />
        </p>
        {savedS.includes(userData._id) ? (
          <p
            onClick={() => handleBookmarkClick()}
            className={`navLink ${
              profileNav == "bookmark" ? "active" : undefined
            }`}
          >
            <FaRegBookmark />
          </p>
        ) : (
          ""
        )}
      </nav>
      <div className="postcContainer">
        {savedPage ? (
          <>
            {savedPostData.map((data) => (
              <SavedPage
                key={data._id}
                data={data}
              />
            ))}
          </>
        ) : (
          <>
            {userPostData.map((data) => (
              <UserPost
                key={data._id}
                data={data}
                userPostdata={userPostdata}
                userData={userData}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PostCard;
