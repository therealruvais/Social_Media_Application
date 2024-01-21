import React, { useState } from "react";
import "./explorePost.css";
import ExplorePostList from "./ExplorePostList";

const ExplorePost = ({ exploreData, userData }) => {
  
  return (
    <div className="exploreContainer">
      {exploreData.map((item) => (
        <ExplorePostList
          item={item}
          key={item._id}
          userData={userData}
        />
      ))}
    </div>
  );
};

export default ExplorePost;
