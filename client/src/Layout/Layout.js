import React from "react";
import { NavLink } from "react-router-dom";

const Layout = (props) => {
  return (
    <div className="App">
      <header className="main-header">
        <nav className="main-header__nav">
          <ul className="main-header__item-list">
            <NavLink
              to="/"
              isActive={(match) => match.isExact}
              className="main-header__item"
            >
              Shop
            </NavLink>
            <NavLink to="/product-list" className="main-header__item">
              Product List
            </NavLink>
            <NavLink to="/cart" className="main-header__item">
              Cart
            </NavLink>
            <NavLink to="/orders" className="main-header__item">
              Orders
            </NavLink>
            <NavLink to="/checkout" className="main-header__item">
              Checkout
            </NavLink>
            <NavLink to="/admin/add-product" className="main-header__item">
              Add Product
            </NavLink>
            <NavLink to="/admin/products" className="main-header__item">
              Admin Products
            </NavLink>
          </ul>
        </nav>
      </header>
      {props.children}
    </div>
  );
};

export default Layout;
