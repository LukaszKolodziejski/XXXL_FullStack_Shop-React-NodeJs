import axios from "../../axios-api";

export const CREATE_USER_ACCOUNT = "CREATE_USER_ACCOUNT";

export const createUserAccount = (username, email) => {
  return async (dispatch) => {
    await axios
      .post("/user/create-account", { username, email })
      .then((res) => {
        console.log("POST");
        console.log(res.data);
        dispatch({
          type: CREATE_USER_ACCOUNT,
          userData: {
            _id: res.data.user._id,
            email: res.data.user.email,
            username: res.data.user.username,
          },
        });
      });
  };
};
