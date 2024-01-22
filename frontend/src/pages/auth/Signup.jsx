import React, { useState } from "react";
import "./auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from '../../axios-config'


const Signup = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    gender: "",
  });
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };
  const register = async () => {
    const { data } = await axios
      .post(`/user/register`, {
        name: form.name,
        username: form.username,
        email: form.email,
        password: form.password,
        gender: form.gender,
      })
      .catch((err) => {
        console.log(`error sending data : ${err}`);
      });
    return data
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    register().then(() => navigate("/"));
  };

  return (
    <div className="formCo">
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <p className="title">Register </p>
        <p className="message">Signup now and get full access to our app. </p>
        <div className="flex">
          <label>
            <input
              required
              type="text"
              className="input"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <span>Name</span>
          </label>

          <label>
            <input
              required
              type="text"
              className="input"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
            <span>Username</span>
          </label>
        </div>

        <label>
          <input
            required
            type="email"
            className="input"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <span>Email</span>
        </label>

        <label>
          {visible ? (
            <FaEye
              className="eye"
              onClick={() => setVisible(false)}
            />
          ) : (
            <FaEyeSlash
              className="eye"
              onClick={() => setVisible(true)}
            />
          )}
          <input
            required
            type={visible ? "text" : "password"}
            className="input"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <span>Password</span>
        </label>
        <div className="checkBoxes">
          <label>
            <input
              type="radio"
              value="male"
              checked={form.gender === "male"}
              onChange={handleChange}
              name="gender"
            />
            Male
          </label>

          <label>
            <input
              type="radio"
              value="female"
              checked={form.gender === "female"}
              onChange={handleChange}
              name="gender"
            />
            Female
          </label>

          <label>
            <input
              type="radio"
              value="other"
              checked={form.gender === "other"}
              onChange={handleChange}
              name="gender"
            />
            Other
          </label>
        </div>
        <button className="submit">Submit</button>
        <p className="signin">
          Already have an acount ? <Link to="/">Signin</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
