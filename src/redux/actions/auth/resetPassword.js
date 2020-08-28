import axios from "../../../configs/axiosConfig";

//Create Reset Password
export const resetPass = (data) => async (dispatch) => {
  // console.log("ADD LEAD",data)
  const res = await axios.put("/resetpassword", data);
  // console.log('Response',res)
  return res;
};
