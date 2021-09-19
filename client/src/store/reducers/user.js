import { CREATE_USER_ACCOUNT } from "../actions/user";

const initialState = {
  userData: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_ACCOUNT:
      return {
        ...state,
        userData: action.userData,
      };
    default:
      return state;
  }
};

export default reducer;
