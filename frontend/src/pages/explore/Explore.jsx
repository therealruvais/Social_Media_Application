import React, { useEffect, useState } from "react";
import "./explore.css";
import { HashLoader } from "react-spinners";
import ExplorePost from "../../components/explore/ExplorePost";
import axios from "axios";

axios.defaults.withCredentials = true;

const Explore = () => {
  const [loading, setLoading] = useState(true);

  const [exploreData, setExoloreData] = useState([]);
  console.log(exploreData);
  const getAllPosts = async () => {
    const { data } = await axios
      .get(`http://localhost:1900/api/post/post`, {
        withCredentials: true,
      })
      .catch((err) => console.log("err fetchig data", err));
    setExoloreData(data.post);
    setLoading(false);
    return data;
  };
  useEffect(() => {
    getAllPosts();
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
      <ExplorePost exploreData={exploreData} />
    </div>
  );
};

export default Explore;
