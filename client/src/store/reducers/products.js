import {
  CREATE_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_SINGLE_PRODUCT,
  POST_CART_DELETE_PRODUCT,
  POST_CART,
  GET_CART,
  GET_EDIT_PRODUCT,
  POST_EDIT_PRODUCT,
} from "../actions/products";

const initialState = {
  singleProduct: {},
  products: [],
  redirect: "",
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
        redirect: action.redirect,
      };
    case GET_CART:
      return {
        products: action.products,
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
    default:
      return state;
  }
};

export default reducer;
