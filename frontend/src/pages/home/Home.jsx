import React, { useContext, useEffect, useState } from 'react'
import './home.css'
import Post from '../../components/post/Post'
import Followers from '../../components/followcard/Followers'
import axios from 'axios'
import { UserDataContext } from '../../context/UserDataContext'
import { HashLoader } from "react-spinners";
axios.defaults.withCredentials = true;

 

const Home = () => {

  const [loading, setLoading] = useState(true)
  const [postData, setPostData] = useState([])
  
  const { setUserData } = useContext(UserDataContext)
  const user = async () => {
    const { data } = await axios
      .get(`http://localhost:1900/api/user/verify`, {
        withCredentials:true,
      })
      .catch((err) => console.log(err));
    return data;
  };

  const posts = async () => {
    const { data } = await axios.get(`http://localhost:1900/api/post/homepost`, {
      withCredentials:true,
    }).catch(err => console.log('error fetching post data', err))
    return data.posts;
  }

  useEffect(() => {
user()
  .then((data) => {
    setUserData(data.getaUser);
    setLoading(false);
  })
  .catch((error) => {
    console.error("Error fetching user data:", error);
    setLoading(false);
  });
  }, [])
  
  useEffect(() => {
   posts().then((data) => setPostData(data))
  }, [])
  
  
  if (loading) {
    return (
      <div className="spinner-container">
        <HashLoader
          color="#36d7b7"
          loading={loading}
          size={50}
        />
      </div>
    );
  }

  return (
    <div className="Homesec">
      <div className="postSec">
        {postData.map((data, id) => (
          <Post item={data} key={id} />
        ))}
      </div>
      <div className="rightSec">
        <Followers />
      </div>
    </div>
  );
}

export default Home