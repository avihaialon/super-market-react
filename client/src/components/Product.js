import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { dataContext } from "../Context";
import "./Product.css";

class Product extends Component {
  static contextType = dataContext;
  render() {
    return (
      <Card className={"root"}>
        <CardHeader
          action={
            <IconButton
              aria-label="add to cart"
              onClick={() => this.context.addToCart(this.props.id)}
            >
              <AddShoppingCartIcon />
            </IconButton>
          }
          title={this.props.title}
          subheader={this.props.subheader}
        />
        <img src={require(`${this.props.src}`)} alt="img not found" />
        <p className={"product-price"}>price:${this.props.price} </p>
      </Card>
    );
  }
}

export default Product;
