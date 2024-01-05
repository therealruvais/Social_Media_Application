import React, { useState } from "react";
import "./explorePost.css";
import { FaHeart, FaComment } from "react-icons/fa";
import ExplorePostList from "./ExplorePostList";
import PostData from "../../data/PostData";

const ExplorePost = () => {
  return (
    <div className="exploreContainer">
      {PostData.map((item, id) => (
        <ExplorePostList
          item={item}
          key={id}
        />
      ))}
    </div>
  );
};

export default ExplorePost;
