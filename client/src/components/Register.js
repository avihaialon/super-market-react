import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  let newUser = {};
  const addUser = () => {
    axios
      .post("http://localhost:3200/register", newUser)
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
          });
        } else {
          window.location.href = "/login";
        }
      })
      .catch((err) => alert(err));
  };
  return (
    <div>
      <div className="register-form">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <input
            onChange={(e) => (newUser.name = e.target.value)}
            type="text"
            placeholder="Your Name"
            required
          ></input>
          <input
            onChange={(e) => (newUser.email = e.target.value)}
            type="email"
            placeholder="Your Email"
            required
          ></input>
          <input
            onChange={(e) => (newUser.password = e.target.value)}
            type="password"
            placeholder="Your Password"
            required
          ></input>
          <input
            onChange={(e) => (newUser.repeatPassword = e.target.value)}
            type="password"
            placeholder="Repeat Password "
            required
          ></input>
          <Button onClick={addUser} variant="contained" type="submit">
            Register
          </Button>
          <div className="login">
            already register? please
            <Link to="/login"> login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
