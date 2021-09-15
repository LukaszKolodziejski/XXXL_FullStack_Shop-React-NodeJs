import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actoinCreator from "../../store/actions/products";

const EditProduct = (props) => {
  const [isRedirect, setIsRedirect] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const imageUrl = e.target[1].value;
    const price = e.target[2].value;
    const description = e.target[3].value;
    dispatch(actoinCreator.createProduct(title, imageUrl, price, description));
    setTimeout(() => {
      setIsRedirect(true);
    }, 100);
  };

  if (isRedirect) return <Redirect to="/" />;
  return (
    <main>
      <form className="product-form" onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" />
        </div>
        <div className="form-control">
          <label htmlFor="imageUrl">Image Url</label>
          <input type="text" name="imageUrl" id="imageUrl" />
        </div>
        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input type="number" name="price" id="price" step="0.01" />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" rows="5"></textarea>
        </div>

        <button type="submit">Edit Product</button>
      </form>
    </main>
  );
};

export default EditProduct;
