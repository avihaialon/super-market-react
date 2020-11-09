import React, { Component } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CloseIcon from "@material-ui/icons/Close";
import { dataContext } from "../Context";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

class Header extends Component {
  static contextType = dataContext;
  state = {
    toggle: false,
  };
  menuToggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  logout = () => {
    this.context.setLogIn();
    localStorage.clear("tokenStore");
  };

  render() {
    const { toggle } = this.state;
    const { cart, login, userName } = this.context;
    return (
      <div className="header">
        <div className="menu" onClick={this.menuToggle}>
          <MenuIcon />
        </div>
        <h1>
          <Link to="/">Super-Market</Link>
        </h1>
        <div className="nav-bar">
          <ul className={toggle ? "toggle" : ""}>
            <li>
              <Link to="/" onClick={this.menuToggle}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={this.menuToggle}>
                About
              </Link>
            </li>
            <li>
              <Link to="/cart" onClick={this.menuToggle}>
                Cart
              </Link>
            </li>
            {!login ? (
              <li>
                <Link to="/register" onClick={this.menuToggle}>
                  Register
                </Link>{" "}
                |
                <Link to="/login" onClick={this.menuToggle}>
                  Login{" "}
                </Link>
              </li>
            ) : (
              <li>
                {`HELLO ${userName}`}
                <Link
                  to="/"
                  onClick={() => {
                    this.logout();
                    this.menuToggle();
                  }}
                >
                  LOGOUT
                </Link>
              </li>
            )}

            <li>
              <CloseIcon className="close" onClick={this.menuToggle} />
            </li>
          </ul>
        </div>
        <div className="nav-cart">
          <Link to="/cart">
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={cart.length} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
