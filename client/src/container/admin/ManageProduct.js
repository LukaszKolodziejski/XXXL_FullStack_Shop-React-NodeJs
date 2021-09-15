import React, { useState, useEffect } from "react";
import { Redirect, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actoinCreator from "../../store/actions/products";

const ManageProduct = (props) => {
  const [isRedirect, setIsRedirect] = useState(false);
  const product = useSelector((state) => state.products.singleProduct);
  const redirect = useSelector((state) => state.products.redirect);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const useQuery = () => new URLSearchParams(useLocation().search);

  let query = useQuery().get("edit");
  let params = useParams();
  console.log("query");
  console.log(query);
  console.log("params");
  console.log(params);

  console.log("singleProduct");
  console.log(product);

  const getEditProduct = actoinCreator.getEditProduct;

  useEffect(() => {
    if (params.productId) {
      console.log("action params");
      dispatch(getEditProduct(params.productId, query));
      console.log("1");
    }
  }, []);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setImageUrl(product.imageUrl);
      setPrice(product.price);
      setDescription(product.description);
    }
  }, [product, dispatch, getEditProduct]);

  const inputHandler = (e, setValue) => setValue(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();

    if (params.productId) {
      console.log("Edit Product !!!!");
      const { id } = product;
      dispatch(
        actoinCreator.postEditProduct(id, title, imageUrl, price, description)
      );
    } else {
      dispatch(
        actoinCreator.createProduct(title, imageUrl, price, description)
      );
      setTimeout(() => {
        setIsRedirect(true);
      }, 100);
    }

    // setTimeout(() => {
    //   setIsRedirect(true);
    // }, 100);
  };

  useEffect(() => {
    if (redirect === "/") setIsRedirect(true);
  }, [redirect]);

  if (isRedirect) return <Redirect to="/" />;
  return (
    <main>
      <form className="product-form" onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => inputHandler(e, setTitle)}
            name="title"
            id="title"
          />
        </div>
        <div className="form-control">
          <label htmlFor="imageUrl">Image Url</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => inputHandler(e, setImageUrl)}
            name="imageUrl"
            id="imageUrl"
          />
        </div>
        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => inputHandler(e, setPrice)}
            name="price"
            id="price"
            step="0.01"
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea
            value={description}
            onChange={(e) => inputHandler(e, setDescription)}
            name="description"
            id="description"
            rows="5"
          ></textarea>
        </div>
        {params.productId ? (
          <button type="submit">Edit Product</button>
        ) : (
          <button type="submit">Add Product</button>
        )}
      </form>
    </main>
  );
};

export default ManageProduct;
