import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";

export const dataContext = React.createContext();

toast.configure();
export class DataProvider extends React.Component {
  state = {
    products: [
      {
        id: 1,
        title: "Milk",
        subheader: "1L",
        price: "2.00",
        src: "./images/milk.jpg",
        count: 1,
      },
      {
        id: 2,
        title: "Water",
        subheader: "3pack",
        price: "3.00",
        src: "./images/water.jpg",
        count: 1,
      },
      {
        id: 3,
        title: "Cheese",
        subheader: "300g",
        price: "12.00",
        src: "./images/cheese.jpg",
        count: 1,
      },
      {
        id: 4,
        title: "Cucumber",
        subheader: "1kg",
        price: "4.00",
        src: "./images/cucumber.jpg",
        count: 1,
      },
      {
        id: 5,
        title: "Cornflex",
        subheader: "750g",
        price: "7.00",
        src: "./images/cornflex.jpg",
        count: 1,
      },
      {
        id: 6,
        title: "Toilet Paper",
        subheader: "12pack",
        price: "15.00",
        src: "./images/toiletPaper.jpg",
        count: 1,
      },
      {
        id: 7,
        title: "Oil",
        subheader: "1bottle",
        price: "7.00",
        src: "./images/oil.jpg",
        count: 1,
      },
      {
        id: 8,
        title: "Chocolate Spread",
        subheader: "1pack",
        price: "12.00",
        src: "./images/chocolateSpread.jpg",
        count: 1,
      },
      {
        id: 9,
        title: "Matches",
        subheader: "1pack",
        price: "2.5",
        src: "./images/matches.jpg",
        count: 1,
      },
    ],
    cart: [],
    total: 0,
    login: false,
    userName: "",
  };

  addToCart = (id) => {
    const { products, cart } = this.state;
    const check = cart.every((item) => {
      return item.id !== id;
    });
    if (check) {
      this.setState({
        cart: [products.find((item) => item.id === id), ...cart],
      });
      toast.success("The Product added to cart!.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.info("The Product has been added to cart.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  reduction = (id) => {
    const { cart } = this.state;
    cart.forEach((item) => {
      if (item.id === id) {
        item.count === 1 ? (item.count = 1) : (item.count -= 1);
      }
    });
    this.setState({ cart: cart });
    this.getTotal();
  };
  increase = (id) => {
    const { cart } = this.state;
    cart.forEach((item) => {
      if (item.id === id) {
        item.count += 1;
      }
    });
    this.setState({ cart: cart });
    this.getTotal();
  };

  deleteProduct = (id) => {
    confirmAlert({
      message: "Do you want to delete this product?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const { cart } = this.state;
            cart.forEach((item, index) => {
              if (item.id === id) {
                cart.splice(index, 1);
              }

              this.setState({ cart: cart });
              this.getTotal();
            });
          },
        },
        {
          label: "No",
          onClick: () => (window.location = "/cart"),
        },
      ],
    });
  };
  getTotal = () => {
    const { cart } = this.state;
    const res = cart.reduce((prev, item) => {
      return prev + item.price * item.count;
    }, 0);
    this.setState({ total: res });
  };
  setLogIn = () => {
    this.setState({ login: !this.state.login });
    localStorage.setItem("login", this.state.login);
  };
  changeUserName = (name) => {
    this.setState({ userName: name });
    localStorage.setItem("userName", this.state.userName);
  };

  componentDidUpdate() {
    localStorage.setItem("dataCart", JSON.stringify(this.state.cart));
    localStorage.setItem("dataTotal", JSON.stringify(this.state.total));
  }

  componentDidMount() {
    const checkLogin = async () => {
      const token = localStorage.getItem("tokenStore");
      const userName = localStorage.getItem("userName");
      this.setState({ userName: userName });
      if (token) {
        const verified = await axios.get("/verify", {
          headers: { Authorization: token },
        });
        if (verified.data === true) {
          this.setState({ login: true });
        } else {
          return localStorage.clear("tokenStore");
        }
      } else {
        this.setState({ login: false });
      }
    };
    checkLogin();
    const dataCart = JSON.parse(localStorage.getItem("dataCart"));
    if (dataCart !== null) {
      this.setState({ cart: dataCart });
    }
    const dataTotal = JSON.parse(localStorage.getItem("dataTotal"));
    if (dataTotal !== null) {
      this.setState({ total: dataTotal });
    }
  }

  render() {
    const { products, cart, total, login, userName } = this.state;
    const {
      addToCart,
      reduction,
      increase,
      deleteProduct,
      getTotal,
      setLogIn,
      changeUserName,
    } = this;
    return (
      <dataContext.Provider
        value={{
          products,
          addToCart,
          cart,
          reduction,
          increase,
          deleteProduct,
          total,
          getTotal,
          setLogIn,
          login,
          userName,
          changeUserName,
        }}
      >
        {this.props.children}
      </dataContext.Provider>
    );
  }
}
