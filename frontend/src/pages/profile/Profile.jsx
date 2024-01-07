import React, { useEffect, useState } from "react";
import "./profile.css";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import PostCard from "../../components/postCard/PostCard";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";


import axios from "axios";

axios.defaults.withCredentials = true;


const Profile = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);

  const [userPostData, setUserPostData] = useState([]);

  const userPostdata = async () => {
    const { data } = await axios
      .get(`http://localhost:1900/api/post/userpost/${username}`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    setUserPostData(data.userPost);
    return data.userPost;
  };

  useEffect(() => {
    userPostdata();
  }, [username]);
  



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
          userPostData={userPostData}
        />
      </div>
      <div className="postCard">
        <PostCard
          username={username}
          userPostData={userPostData}
          userPostdata={userPostdata}
        />
      </div>
    </div>
  );
};

export default Profile;
