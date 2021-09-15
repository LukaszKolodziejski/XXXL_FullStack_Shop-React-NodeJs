import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as actoinCreator from "../../store/actions/products";

const Order = (props) => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const fetchProducts = actoinCreator.fetchProducts;
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, fetchProducts]);

  let productsList;
  if (products)
    productsList = products.map((prod, index) =>
      prod ? <p key={index}>{prod.value}</p> : null
    );

  return (
    <main>
      <h1>My Products</h1>
      {products ? productsList : null}
    </main>
  );
};

export default Order;
