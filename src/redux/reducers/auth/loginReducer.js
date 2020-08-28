import customizer from "../customizer";
const initialState = {
  userRole: "admin",
  userInfo: "",
  accessToken: "",
};

//To Store the Action
export const login = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_WITH_JWT":
      return Object.assign({}, state, {
        userInfo: action.payload.userInfo,
        accessToken: action.payload.accessToken,
      });
    case "LOGOUT":
      return initialState;

    case "CHANGE_ROLE":
      return { userRole: action.userRole };
    default:
      return state;
  }
};
