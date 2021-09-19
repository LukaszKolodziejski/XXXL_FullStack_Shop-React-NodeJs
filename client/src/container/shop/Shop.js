import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actoinCreator from "../../store/actions/products";

const Shop = (props) => {
  const [path, setPath] = useState("");
  const { products, redirect } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const btnCartHandler = (productId) => {
    console.log("btnCartHandler");
    console.log(btnCartHandler);
    dispatch(actoinCreator.postCart(productId));
  };

  useEffect(() => {
    setPath(redirect);
  }, [redirect]);

  const fetchProducts = actoinCreator.fetchProducts;
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  let productsList;

  if (path) return <Redirect to={path} />;

  if (products) {
    console.log("Shop");
    console.log(products);
    productsList = products.map((product, index) =>
      product ? (
        <article key={index} className="product-item">
          <header className="card__header">
            <h1 className="product__title">{product.title}</h1>
          </header>
          <div className="card__image">
            <img src={product.imageUrl} alt={`${product.title}`} />
          </div>
          <div className="card__content">
            <h2 className="product__price">$ {product.price}</h2>
            <p className="product__description">{product.description}</p>
          </div>
          <div className="card__actions">
            <button
              className="btn"
              onClick={() => btnCartHandler(product._id.toString())}
            >
              Add to Cart
            </button>
          </div>
        </article>
      ) : null
    );
  }

  return (
    <main>
      <h1>My Products</h1>
      <div className="grid">{products ? productsList : null}</div>
    </main>
  );
};

export default Shop;
