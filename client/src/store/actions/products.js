import axios from "../../axios-api";

export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_SINGLE_PRODUCT = "FETCH_SINGLE_PRODUCT";
export const POST_CART = "POST_CART";
export const GET_CART = "GET_CART";
export const POST_CART_DELETE_PRODUCT = "POST_CART_DELETE_PRODUCT";
export const GET_EDIT_PRODUCT = "GET_EDIT_PRODUCT";
export const POST_EDIT_PRODUCT = "POST_EDIT_PRODUCT";

export const createProduct = (title, imageUrl, price, description) => {
  return async (dispatch) => {
    await axios
      .post("/admin/add-product", { title, imageUrl, price, description })
      .then((res) => {
        console.log("POST");
        console.log(res.data);
        dispatch({
          type: CREATE_PRODUCT,
          productData: {
            id: res.data.product.id,
            title: res.data.product.title,
            imageUrl: res.data.product.imageUrl,
            price: res.data.product.price,
            description: res.data.product.description,
          },
        });
      });
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    await axios.get("/").then((res) => {
      console.log("res.data");
      console.log(res.data);
      dispatch({
        type: FETCH_PRODUCTS,
        products: res.data.products,
      });
    });
  };
};

export const fetchSingleProduct = (productId) => {
  return async (dispatch) => {
    await axios.get(`/product-detail/${productId}`).then((res) => {
      dispatch({
        type: FETCH_SINGLE_PRODUCT,
        productData: {
          id: res.data.product.id,
          title: res.data.product.title,
          imageUrl: res.data.product.imageUrl,
          price: res.data.product.price,
          description: res.data.product.description,
        },
      });
    });
  };
};

export const postCart = (productId) => {
  return async (dispatch) => {
    await axios.post("/cart", { productId }).then((res) => {
      console.log("product-detail");
      console.log(res.data);
      dispatch({
        type: POST_CART,
        redirect: res.data.redirect,
      });
    });
  };
};

export const getCart = () => {
  return async (dispatch) => {
    await axios.get("/cart").then((res) => {
      console.log("res.data");
      console.log(res.data);
      dispatch({
        type: GET_CART,
        products: res.data.products,
      });
    });
  };
};

export const postCartDeleteProduct = (productId) => {
  return async (dispatch) => {
    await axios.post("/cart-delete-item", { productId }).then((res) => {
      console.log("cart-delete-item");
      console.log(res.data);
      dispatch({
        type: POST_CART_DELETE_PRODUCT,
        redirect: res.data.redirect,
      });
    });
    dispatch(getCart());
  };
};

export const getEditProduct = (params, query) => {
  return async (dispatch) => {
    await axios
      .get(`/admin/edit-product/${params}?edit=${query}`)
      .then((res) => {
        console.log("admin/edit-product");
        console.log(res.data);
        dispatch({
          type: GET_EDIT_PRODUCT,
          productData: {
            id: res.data.product.id,
            title: res.data.product.title,
            imageUrl: res.data.product.imageUrl,
            price: res.data.product.price,
            description: res.data.product.description,
          },
        });
      });
  };
};

export const postEditProduct = (id, title, imageUrl, price, description) => {
  return async (dispatch) => {
    await axios
      .post("/admin/edit-product", { id, title, imageUrl, price, description })
      .then((res) => {
        console.log("POST");
        console.log(res.data);
        dispatch({
          type: POST_CART_DELETE_PRODUCT,
          redirect: res.data.redirect,
        });
      });
  };
};
