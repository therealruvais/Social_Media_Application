import React, { useEffect, useState } from "react";
import "./explore.css";
import { HashLoader } from "react-spinners";
import ExplorePost from "../../components/explore/ExplorePost";
// import axios from "axios";
import axios from '../../axios-config'

const Explore = () => {
  const [loading, setLoading] = useState(true);

  const [exploreData, setExoloreData] = useState([]);
  const [userD, setUserD] = useState(null);
  const getAllPosts = async () => {
    const { data } = await axios
      .get(`/post/post`, {
        withCredentials: true,
      })
      .catch((err) => console.log("err fetchig data", err));
    setExoloreData(data.post);
    setLoading(false);
    return data;
  };
  const user = async () => {
    const { data } = await axios
      .get(`/user/verify`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    return data;
  };

  useEffect(() => {
    getAllPosts();
    user().then((data) => setUserD(data.getaUser));
  }, []);

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
    <div className="exploreSec">
      <ExplorePost
        userData={userD}
        exploreData={exploreData}
      />
    </div>
  );
};

export default Explore;
