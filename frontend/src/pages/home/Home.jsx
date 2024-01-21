import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import Post from "../../components/post/Post";
import Followers from "../../components/followcard/Followers";
import { UserDataContext } from "../../context/UserDataContext";
import { HashLoader } from "react-spinners";
import { NotifyContext } from "../../context/NotifyContext";

import axios from '../../axios-config'

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState([]);

  const { setUserData } = useContext(UserDataContext);
  const { setNotifyData } = useContext(NotifyContext);

  const user = async () => {
    const { data } = await axios
      .get(`/user/verify`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    setUserData(data.getaUser);
    return data;
  };

  const getNotify = async () => {
    const { data } = await axios
      .get(`/notify/follow`, {
        withCredentials: true,
      })
      .catch((err) => console.log(`error  fetching data`, err));
    setNotifyData(data.notifications)
    return data;
  };

  const posts = async () => {
    const { data } = await axios
      .get(`/post/homepost`, {
        withCredentials: true,
      })
      .catch((err) => console.log("error fetching post data", err));
    setPostData(data.posts);
    return data.posts;
  };

  useEffect(() => {
    user()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    posts();
  }, []);

  useEffect(() => {
    getNotify()
  },[])

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
    <div className="Homesec">
      <div className="postSec">
        {postData.map((data, id) => (
          <Post
            item={data}
            key={id}
            posts={posts}
            user={user}
          />
        ))}
      </div>
      <div className="rightSec">
        <Followers />
      </div>
    </div>
  );
};

export default Home;
