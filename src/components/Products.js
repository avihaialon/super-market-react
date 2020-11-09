import React from "react";
import Product from "./Product";
import "./Products.css";
import { dataContext } from "../Context";

class Products extends React.Component {
  static contextType = dataContext;

  render() {
    const { products } = this.context;
    return (
      <div className="products">
        {products.map((product) => {
          return (
            <Product
              key={product.id}
              id={product.id}
              title={product.title}
              subheader={product.subheader}
              price={product.price}
              src={product.src}
            ></Product>
          );
        })}
      </div>
    );
  }
}

export default Products;
