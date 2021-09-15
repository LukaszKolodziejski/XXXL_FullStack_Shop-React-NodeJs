import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actoinCreator from "../../store/actions/products";
import Spinner from "../../components/UI/Spinner/Spinner";

const Cart = (props) => {
  const [path, setPath] = useState("");
  // const { products, redirect } = useSelector((state) => state.products);
  const products = useSelector((state) => state.products.products);
  const redirect = useSelector((state) => state.products.redirect);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actoinCreator.getCart());
  }, []);

  console.log("products");
  console.log(products);

  const btnDeleteHandler = (productId) => {
    console.log("btnDeleteHandler");
    console.log(productId);
    dispatch(actoinCreator.postCartDeleteProduct(productId));
  };

  // useEffect(() => {
  //   dispatch(actoinCreator.getCart());
  // }, [products, dispatch, btnDeleteHandler]);

  useEffect(() => {
    setPath(redirect);
  }, [redirect]);

  if (path) return <Redirect to={path} />;
  if (!products) return <Spinner />;
  // if ( isLoading) return <Spinner />;

  return (
    <main>
      {products && products.length > 0 ? (
        <ul>
          {products.map((p) => {
            if (p.productData) {
              return (
                <li key={p.productData.id}>
                  <p>{`${p.productData.title} (${p.amount})`}</p>
                  {/* <form action="/cart-delete-item" method="POST"> */}
                  {/* <form>
                    <input
                      type="hidden"
                      value={p.productData.id}
                      name="productId"
                    /> */}
                  <button
                    className="btn"
                    onClick={() => btnDeleteHandler(p.productData.id)}
                  >
                    Delete
                  </button>
                  {/* </form> */}
                </li>
              );
            }
          })}
        </ul>
      ) : (
        <h1>No Products in Cart!</h1>
      )}
    </main>
  );
};

export default Cart;
