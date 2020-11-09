import React from "react";
import "./App.css";
import Header from "./components/Header";
import Products from "./components/Products";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cart from "./components/Cart";
import About from "./components/About";
import Register from "./components/Register";
import Login from "./components/Login";
import Payment from "./components/Payment";
import { DataProvider } from "./Context";

const App = () => {
  return (
    <DataProvider>
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/">
              <Header />
              <Products />
              <Footer />
            </Route>
            <Route path="/cart">
              <Header />
              <Cart />
            </Route>
            <Route path="/about">
              <Header />
              <About />
            </Route>
            <Route path="/register">
              <Header />
              <Register />
            </Route>
            <Route path="/login">
              <Header />
              <Login />
            </Route>
            <Route path="/payment">
              <Header />
              <Payment />
            </Route>
            <Route path="*">404</Route>
          </Switch>
        </Router>
      </div>
    </DataProvider>
  );
};

export default App;
