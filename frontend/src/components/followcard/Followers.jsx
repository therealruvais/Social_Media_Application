import React from "react";
import "./followers.css";
import { FollowersData } from "../../data/FollowersData";
import { Link, useParams } from "react-router-dom";
import LogoName from "../logoname/LogoName";


const Followers = () => {

  return (
    <div className="FollowersSec">
      <LogoName/>
      {/* <div className="follocard">
        <div className="follocrdhead">
          <h4>Suggested For You</h4>
          <span>See All</span>
        </div>
        {FollowersData.map((data, id) => (
          <div
            className="followers"
            key={id}
          >
            <div className="imageSec">
              <Link className="folloLink" to={`/profile/${data.username}`}>
                <img
                  className="folloImg"
                  src={data.img}
                  alt=""
                />
              </Link>
               <Link className="folloLink" to={`/profile/${data.username}`}>
              <div className="name">
                <span>{data.name}</span>
                <span>@{data.username}</span>
              </div>
              </Link>
            </div>
            <div className="follobtn">
              <button className="fc-btn">follow</button>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Followers;
