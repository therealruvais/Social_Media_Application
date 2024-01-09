import React, { useState } from "react";
import "./explorePost.css";
import { FaHeart, FaComment } from "react-icons/fa";
import ExplorePostList from "./ExplorePostList";
import PostData from "../../data/PostData";

const ExplorePost = ({ exploreData }) => {
  return (
    <div className="exploreContainer">
      {exploreData.map((item) => (
        <ExplorePostList
          item={item}
          key={item._id}
        />
      ))}
    </div>
  );
};

export default ExplorePost;
