import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "./Layout/Layout";
import ManageProduct from "./container/admin/ManageProduct";
// import EditProduct from "./container/admin/EditProduct";
import Products from "./container/admin/Products";
import Shop from "./container/shop/Shop";
import Cart from "./container/shop/Cart";
import Orders from "./container/shop/Orders";
import Checkout from "./container/shop/Checkout";
import ProductList from "./container/shop/ProductList";
import ProductDetail from "./container/shop/ProductDetail";
import Error from "./container/Error";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={Shop} />
          <Route path="/cart" component={Cart} />
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/product-list" component={ProductList} />
          <Route path="/product-detail/:productId" component={ProductDetail} />
          <Route
            path="/admin/edit-product/:productId"
            component={ManageProduct}
          />
          <Route path="/admin/add-product" component={ManageProduct} />
          <Route path="/admin/products" component={Products} />
          <Route component={Error} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
