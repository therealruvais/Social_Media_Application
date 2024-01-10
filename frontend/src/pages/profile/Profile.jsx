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
  const [userData, setUserData] = useState(null);


  const [userPostData, setUserPostData] = useState([]);
  const [savedPostData, setSavedPostData] = useState([]);

  const userPostdata = async () => {
    const { data } = await axios
      .get(`http://localhost:1900/api/post/userpost/${username}`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    setUserPostData(data.userPost);
    return data.userPost;
  };

  const savedPost = async () => {
    const { data } = await axios.get(
      `http://localhost:1900/api/post/getsaved/${username}`,{withCredentials:true,}
    ).catch(err => console.log(`error fetching savd post `, err))
    // console.log(data)
    setSavedPostData(data.savedPosts);
    return data
  }


  const user = async () => {
    const { data } = await axios
      .get(`http://localhost:1900/api/user/verify`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    setUserData(data.getaUser);
    setLoading(false)
    return data.getaUser;
  };

  useEffect(() => {
    user();
    setLoading(false)
  }, []);


  useEffect(() => {
    userPostdata();
  }, [username]);
  
  useEffect(() => {
    savedPost()
  },[])



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
          savedPostData={savedPostData}
          userData={userData}
        />
      </div>
    </div>
  );
};

export default Profile;
