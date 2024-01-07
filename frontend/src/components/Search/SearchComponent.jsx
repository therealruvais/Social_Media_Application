import React, { useEffect, useState } from "react";
import "./searchComponent.css";
import axios from "axios";
import UsersCard from "./usersCard";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true;

const SearchComponent = ({ handleSearchToggle }) => {
  const [searching, setSearching] = useState("");
  const [users, setUsers] = useState([]);
  const handleChange = (e) => {
    setSearching(e.target.value.toLowerCase());
  };

  const searchData = async () => {
    const res = await axios
      .get(`http://localhost:1900/api/user/search?username=${searching}`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    return res;
  };
  const handleClose = () => {
    setSearching("");
    setUsers([]);
    handleSearchToggle()
  };
  useEffect(() => {
    if (searching) {
      searchData()
        .then((res) => setUsers(res.data.users))
        .catch((err) => console.log("usernot found", err));
    } else {
      setUsers([]);
    }
  }, [searching]);

  return (
    <div className="searchC">
      <div className="Sinput">
        <div>
          <p
            style={{
              marginTop: 15,
              marginLeft: 15,
              fontSize: 20,
              fontWeight: 450,
            }}
          >
            Search
          </p>
        </div>
        <div className="inputS">
          <input
            value={searching}
            className="searchI"
            type="text"
            placeholder="Search here"
            onChange={handleChange}
          />
          <p
            onClick={handleClose}
            style={{ color: "#9999", cursor: "pointer" }}
          >
            X
          </p>
        </div>
      </div>
      <div className="Soutput">
        {searching && users.length === 0 ? (
          <center>
            <h3>User not Found</h3>
          </center>
        ) : (
          <>
            {users.map((user) => (
              <Link
                key={user._id}
                className="searchLink"
                to={`/profile/${user.username}`}
              >
                <UsersCard user={user} />
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
