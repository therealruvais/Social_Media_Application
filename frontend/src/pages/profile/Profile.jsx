import React, { useEffect, useState } from "react";
import "./profile.css";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import PostCard from "../../components/postCard/PostCard";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";

const Profile = () => {
  const { username } = useParams();

  const [loading, setLoading] = useState(true);

 useEffect(() => {
   setLoading(true);

   const timeout = setTimeout(() => {
     setLoading(false); 
   }, 2000);

   return () => {
     clearTimeout(timeout); 
   };
  }, [username])
  

  if (loading) {
    return (
      <div className="spinner-container">
        <HashLoader
          color="#36d7b7"
          loading={loading}
          size={30}
        />
      </div>
    );
  }

  return (
    <div className="ProfileSec">
      <div className="profileCard">
        <ProfileCard
          username={username}
        />
      </div>
      <div className="postCard">
        <PostCard
          username={username}
        />
      </div>
    </div>
  );
};

export default Profile;
