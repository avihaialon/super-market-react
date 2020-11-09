import React, { Component } from "react";
import { dataContext } from "../Context";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import "./Cart.css";

class Cart extends Component {
  static contextType = dataContext;

  componentDidMount() {
    this.context.getTotal();
  }

  render() {
    const { cart, reduction, increase, deleteProduct, total } = this.context;
    if (cart.length === 0) {
      return <h2 style={{ textAlign: "center" }}> Your card empty!</h2>;
    } else {
      return (
        <div className="cart">
          <div className="product-header">
            <h5 className="product-title">PRODUCT</h5>
            <h5 className="price">PRICE</h5>
            <h5 className="quantity">QUANTITY</h5>
            <h5 className="total">TOTAL</h5>
          </div>
          {cart.map((item) => {
            return (
              <div className="products">
                <div className="product" key={item.id}>
                  <DeleteForeverIcon
                    className="delete"
                    onClick={() => deleteProduct(item.id)}
                  />
                  <img src={require(`${item.src}`)} alt="img not found" />
                  <span>{item.title}</span>
                </div>
                <div className="price">${item.price}</div>
                <div className="quantity">
                  <AddIcon
                    className="count"
                    onClick={() => increase(item.id)}
                  />
                  <span>{item.count}</span>
                  <RemoveIcon
                    className="count"
                    onClick={() => reduction(item.id)}
                  />
                </div>
                <div className="total">${item.price * item.count}.00</div>
              </div>
            );
          })}
          <div className="basket-total">
            <h4 className="title">${total}.00</h4>
          </div>
          <div className="payment">
            {this.context.login ? (
              <Link to="./payment">Payment</Link>
            ) : (
              <Link to="./login">Payment</Link>
            )}
          </div>
        </div>
      );
    }
  }
}

export default Cart;
