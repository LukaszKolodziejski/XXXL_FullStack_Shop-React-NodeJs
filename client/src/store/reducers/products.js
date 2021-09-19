import {
  CREATE_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_SINGLE_PRODUCT,
  POST_CART_DELETE_PRODUCT,
  POST_DELETE_PRODUCT,
  POST_CART,
  GET_CART,
  GET_EDIT_PRODUCT,
  POST_EDIT_PRODUCT,
  POST_ORDERS,
  GET_ORDERS,
} from "../actions/products";

const initialState = {
  singleProduct: {},
  products: [],
  redirect: "",
  cart: [],
  orders: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.productData],
      };
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.products,
        redirect: "",
        singleProduct: {},
      };
    case FETCH_SINGLE_PRODUCT:
      return {
        ...state,
        singleProduct: action.productData,
      };
    case POST_CART_DELETE_PRODUCT:
      return {
        ...state,
        products: [...state.products],
        redirect: "",
        singleProduct: {},
        cart: action.cart,
      };
    case POST_DELETE_PRODUCT:
      return {
        ...state,
        products: action.products,
      };
    case GET_CART:
      return {
        ...state,
        products: [...state.products],
        redirect: "",
        singleProduct: {},
        cart: action.cart,
      };
    case POST_CART:
      return {
        ...state,
        redirect: action.redirect,
      };
    case GET_EDIT_PRODUCT:
      return {
        ...state,
        singleProduct: action.productData,
      };
    case POST_EDIT_PRODUCT:
      return {
        redirect: action.redirect,
      };
    case POST_ORDERS:
      return {
        ...state,
        products: [...state.products],
        redirect: action.redirect,
        singleProduct: {},
      };
    case GET_ORDERS:
      return {
        ...state,
        products: [...state.products],
        redirect: "",
        singleProduct: {},
        orders: action.orders,
      };
    default:
      return state;
  }
};

export default reducer;
