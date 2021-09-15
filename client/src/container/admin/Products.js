import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as actoinCreator from "../../store/actions/products";
import { Link } from "react-router-dom";

const Products = (props) => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const fetchProducts = actoinCreator.fetchProducts;
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  let productsList;
  if (products) {
    console.log("Products");
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
            <Link to={`/admin/edit-product/${product.id}?edit=true`}>
              <button className="btn">Edit</button>
            </Link>
            {/* <Link to="/admin/delete-product">
              <button className="btn">Delete</button>
            </Link> */}
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

export default Products;
