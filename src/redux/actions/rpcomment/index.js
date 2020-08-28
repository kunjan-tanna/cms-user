import axios from "../../../configs/axiosConfig";

//Create Add rpComment
export const addrpCommit = (data) => async (dispatch) => {
  // console.log("ADD LEAD",data)
  const res = await axios.post("create/rpcomment", data);
  // console.log('Res',res)
  return res;
};

//Get rpComment
export const getrpCommit = () => async (dispatch) => {
  const res = await axios.get("/rpcomment");
  // console.log('Get Leads',res)
  if (res) {
    dispatch({ type: "RPCOMMENTS", payload: res.data });
  }
  // console.log('Response',res)
  return res;
};
