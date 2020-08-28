import { history } from "../../../history";
import axios from "../../../configs/axiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";

export const loginWithJWT = (user) => {
  return (dispatch) => {
    axios
      .post("/signin", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        let userInfo = response.data.user;

        // console.log("Login DATA", token);
        if (userInfo) {
          dispatch({
            type: "LOGIN_WITH_JWT",
            payload: {
              userInfo,
              accessToken: response.data.token,
            },
          });
          // console.log("Sucess");
          toast.success("Login Successfully", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setTimeout(() => {
            history.push("/user/dashboard");
          }, 2000);
        } else {
          // console.log("Sucess");
          toast.success("User email doesn't exist", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      })
      .catch((error) => {
        // show error message in Toast
        toast.error("User email doesn't exist", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
};

//Logout Action
export const logout = () => {
  return (dispatch) => {
    dispatch({ type: "LOGOUT" });
    history.push("/pages/login");
  };
};

//To Change Role
export const changeRole = (role) => {
  return (dispatch) => dispatch({ type: "CHANGE_ROLE", userRole: role });
};
