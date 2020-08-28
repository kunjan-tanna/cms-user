import axios from "../../../configs/axiosConfig";

//Create Add Tag
export const addTag = (data) => async (dispatch) => {
  // console.log("ADD Tag",data)
  const res = await axios.post("create/tag", data);
  // console.log('Res',res)
  return res;
};

//Get Tag
export const getTag = () => async (dispatch) => {
  const res = await axios.get("/tag");
  // console.log('Get Leads',res)
  if (res) {
    dispatch({ type: "TAG", payload: res.data });
  }
  // console.log('Response',res)
  return res;
};

//Get Tag By ID
export const getTagById = (id) => async (dispatch) => {
  //console.log("LEADContact ID1",id)
  const res = await axios.get(`/get/tag/${id}`);
  // console.log("--RES",res)
  return res;
};

//Update Tag
export const updateTag = (id, data) => async (dispatch) => {
  // console.log("ADD LEAD",data)
  let obj = {
    tagId: data._id,
    tagName: data.tagName,
  };
  const res = await axios.put(`edit/tag/${id}`, obj);
  // console.log('Res',res)
  return res;
};

//Delete the Tag
export const deleteTag = (id) => async (dispatch) => {
  // console.log('DELCONTACT ID',id)
  const res = await axios.delete(`/delete/tag/${id}`);
  // console.log('RESPONSE',res)
  return res;
};
