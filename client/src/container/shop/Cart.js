import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actoinCreator from "../../store/actions/products";
import Spinner from "../../components/UI/Spinner/Spinner";

const Cart = (props) => {
  const [path, setPath] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // const { products, redirect } = useSelector((state) => state.products);
  const { products, cart, redirect } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actoinCreator.getCart());
  }, []);

  console.log("products");
  console.log(products);
  console.log("cart");
  console.log(cart);

  const btnDeleteHandler = (productId) => {
    console.log("btnDeleteHandler");
    console.log(productId);
    dispatch(actoinCreator.postCartDeleteProduct(productId));
  };

  // useEffect(() => {
  //   dispatch(actoinCreator.getCart());
  // }, [products, dispatch, btnDeleteHandler]);

  // useEffect(() => {
  //   setPath(redirect);
  // }, [redirect]);

  useEffect(() => {
    if (products && cart) {
      setIsLoading(false);
    }
  }, [cart]);

  const btnOrderHandler = () => {
    dispatch(actoinCreator.postOrders());
  };

  if (redirect) return <Redirect to={redirect} />;
  if (isLoading) return <Spinner />;

  return (
    <main>
      {cart && cart.length > 0 ? (
        <div>
          <ul className="cart__item-list">
            {cart.map((item) => {
              if (item) {
                const product = products.find(
                  (prod) => prod._id === item.productId
                );
                return (
                  <li key={item._id} className="cart__item">
                    <h1>{product.title}</h1>
                    <h1>{item.amount}</h1>
                    <button
                      className="btn"
                      onClick={() => btnDeleteHandler(item.productId)}
                    >
                      Delete
                    </button>
                  </li>
                );
              }
            })}
          </ul>
          <div className="centered">
            <button className="btn" onClick={btnOrderHandler}>
              Order Now!
            </button>
          </div>
        </div>
      ) : (
        <h1>No Products in Cart!</h1>
      )}
    </main>
  );
};

export default Cart;
