import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as actoinCreator from "../../store/actions/products";

const ProductDetail = (props) => {
  const singleProduct = useSelector((state) => state.products.singleProduct);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  const params = useParams();

  const fetchSingleProduct = actoinCreator.fetchSingleProduct;
  const productId = params.productId;
  const btnCartHandler = (productId) => {
    dispatch(actoinCreator.postCart(productId));
  };

  useEffect(() => {
    if (singleProduct) setProduct(singleProduct);
  }, [singleProduct, setProduct]);

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, []);

  return (
    <main className="centered">
      {product ? (
        <div>
          <h1>{product.title}</h1>
          <hr />
          <div>
            <img
              className="detail-img"
              src={product.imageUrl}
              alt={product.title}
            />
          </div>
          <h2>${product.price}</h2>
          <p>{product.description}</p>
          <Link to="/cart">
            <button onClick={() => btnCartHandler(product.id)} className="btn">
              Add to Cart
            </button>
          </Link>
        </div>
      ) : null}
    </main>
  );
};

export default ProductDetail;
