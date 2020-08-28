/* FOR NOT USE */
import axios from "../../../configs/axiosConfig";

//Create Add Likes
export const addLikes = (data) => async (dispatch) => {
  // console.log("ADD LEAD",data)
  const res = await axios.post("create/like", data);
  // console.log('Res',res)
  return res;
};

//Get Likes
export const getLike = () => async (dispatch) => {
  const res = await axios.get("/like");
  // console.log('Get Leads',res)
  if (res) {
    dispatch({ type: "LIKES", payload: res.data });
  }
  // console.log('Response',res)
  return res;
};
