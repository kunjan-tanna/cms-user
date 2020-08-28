import axios from "../../../configs/axiosConfig";

//Create Add Category
export const addCategory = (data) => async (dispatch) => {
  // console.log("ADD LEAD",data)
  const res = await axios.post("create/category", data);
  // console.log('Res',res)
  return res;
};

//Get Category
export const getCategory = () => async (dispatch) => {
  const res = await axios.get("/category");
  // console.log('Get Leads',res)
  if (res) {
    dispatch({ type: "CATEGORY", payload: res.data });
  }
  // console.log('Response',res)
  return res;
};
//Get Category By ID
export const getCategoryById = (id) => async (dispatch) => {
  //console.log("LEADContact ID1",id)
  const res = await axios.get(`/get/category/${id}`);
  // console.log("--RES",res)
  return res;
};
//Update Category
export const updateCategory = (id, data) => async (dispatch) => {
  // console.log("ADD LEAD",data)
  let obj = {
    categoryId: data._id,
    categoryName: data.categoryName,
  };
  const res = await axios.put(`edit/category/${id}`, obj);
  // console.log('Res',res)
  return res;
};
//Delete the Category
export const deleteCategory = (id) => async (dispatch) => {
  // console.log('DELCONTACT ID',id)
  const res = await axios.delete(`/delete/category/${id}`);
  // console.log('RESPONSE',res)
  return res;
};
