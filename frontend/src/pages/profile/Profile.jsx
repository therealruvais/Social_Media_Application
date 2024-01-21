import React, { useEffect, useState } from "react";
import "./profile.css";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import PostCard from "../../components/postCard/PostCard";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";

import axios from "../../axios-config";



const ProfilePage = () => {

  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState([]);



  const [userPostData, setUserPostData] = useState([]);
  const [savedPostData, setSavedPostData] = useState([]);

  const userPostdata = async () => {
    const { data } = await axios
      .get(`/post/userpost/${username}`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    setUserPostData(data.userPost);
    return data.userPost;
  };

  const savedPost = async () => {
    const { data } = await axios.get(
      `/post/getsaved/${username}`,{withCredentials:true,}
    ).catch(err => console.log(`error fetching savd post `, err))
    setSavedPostData(data.savedPosts);
    return data
  }

   const profile = async () => {
     const { data } = await axios
       .get(`/user/getuser/${username}`, {
         withCredentials: true,
       })
       .catch((err) => console.log(err));
     setProfileData([data.users]);
     return data.users;
   };

  const user = async () => {
    const { data } = await axios
      .get(`/user/verify`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    setUserData(data.getaUser);
    setLoading(false)
    return data.getaUser;
  };

  useEffect(() => {
    profile();
  }, [username]);


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
        {profileData.map((data) => (
          <ProfileCard
            key={data._id}
            username={username}
            userPostData={userPostData}
            user={data}
            profile={profile}
            profileData={profileData}
            setProfileData={setProfileData}
          />
        ))}
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

export default ProfilePage;
