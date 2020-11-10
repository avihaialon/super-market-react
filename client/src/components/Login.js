import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { dataContext } from "../Context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


toast.configure();
class Login extends Component {
  static contextType = dataContext;
  render() {
    const handleSubmit = (e) => {
      e.preventDefault();
    };

    let enterUser = {};
    const entering = () => {
      axios.post("/login", enterUser).then((res) => {
        if (res.data.error) {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
          });
        } else {
          this.context.changeUserName(res.data.name);
          localStorage.setItem("tokenStore", res.data.token);
          window.location = "/";
          this.context.setLogIn();
        }
      });
    };
    return (
      <div>
        <div className="login-form">
          <form autoComplete="on" onSubmit={handleSubmit}>
            <h1>log - in</h1>
            <input
              onChange={(e) => (enterUser.email = e.target.value)}
              type="email"
              placeholder="Your Email"
              required
            ></input>
            <input
              onChange={(e) => (enterUser.password = e.target.value)}
              type="password"
              placeholder="Your Password"
              required
            ></input>
            <Button onClick={entering} variant="contained" type="submit">
              Log in
            </Button>
            <br />
            <div className="register">
              not register ? please
              <Link to="/register"> register</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
