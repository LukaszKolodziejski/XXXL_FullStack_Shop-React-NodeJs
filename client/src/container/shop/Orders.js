import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as actoinCreator from "../../store/actions/products";
import Spinner from "../../components/UI/Spinner/Spinner";

const Order = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const { orders } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // const fetchOrders = actoinCreator.fetchOrders;
  // const fetchProducts = actoinCreator.fetchProducts;
  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch, fetchProducts]);

  useEffect(() => {
    dispatch(actoinCreator.getOrders());
  }, []);

  useEffect(() => {
    if (orders) {
      setIsLoading(false);
    }
  }, [orders]);

  if (isLoading) return <Spinner />;

  return (
    <main>
      {orders.length <= 0 ? (
        <h1>Nothing there!</h1>
      ) : (
        <ul className="orders">
          {orders.map((order) => (
            <li key={order.id} className="orders__item">
              <h1>{`Order: # ${order._id}`}</h1>
              <ul className="orders__products">
                {order.items.map((product) => (
                  <li
                    key={product._id}
                    className="orders__products-item"
                  >{`${product.title} (${product.amount})`}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Order;
