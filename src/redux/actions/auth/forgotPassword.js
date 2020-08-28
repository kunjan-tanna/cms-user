import axios from "../../../configs/axiosConfig";

//Create Forgot Password
export const forgotPass = (data) => async (dispatch) => {
  // console.log("ADD LEAD",data)
  let obj = {
    email: data.email,
  };
  // console.log('OBJ',obj)
  const res = await axios.put("/forgotpassword", obj);
  // console.log('Response',res)
  return res;
};
