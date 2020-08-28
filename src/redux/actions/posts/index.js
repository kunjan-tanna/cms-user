import axios from "../../../configs/axiosConfig";

//Create Add Post
export const addPost = (data) => async (dispatch) => {
  // console.log("ADD Post",data)
  const abc = data.tagId;
  // console.log('TYPEOF',typeof(abc))
  const bodyFormData = new FormData();
  bodyFormData.append("title", data.title);
  bodyFormData.append("description", data.description);
  bodyFormData.append("content", data.content);
  bodyFormData.append("publishedAt", data.publishedAt);
  bodyFormData.append("categoryId", data.categoryId);
  bodyFormData.append("authorBy", data.authorBy);
  bodyFormData.append("image", data.image);
  for (let i = 0; i < abc.length; i++) {
    bodyFormData.append("tagId[]", abc[i]);
    // console.log('ABCCC',abc[i])
  }
  const res = await axios.post("create/post", bodyFormData);
  // console.log("ADD POST=======",res)
  return res;
};

//Get Post
export const getPost = () => async (dispatch) => {
  const res = await axios.get("/post");
  // console.log('Get Leads',res)
  if (res) {
    dispatch({ type: "POST", payload: res.data });
  }
  // console.log('Response',res)
  return res;
};

//Get POST By ID
export const getPostId = (id) => async (dispatch) => {
  //console.log("LEADContact ID1",id)
  const res = await axios.get(`/get/post/${id}`);
  // console.log("--RES",res)
  return res;
};

//Update Post
export const updatePost = (id, data) => async (dispatch) => {
  // console.log("ADD Image",data)
  const abc = data.tagId;
  // console.log('TYPEOF',typeof(abc))
  const bodyFormData = new FormData();
  bodyFormData.append("postId", data._id);
  bodyFormData.append("title", data.title);
  bodyFormData.append("description", data.description);
  bodyFormData.append("content", data.content);
  bodyFormData.append("publishedAt", data.publishedAt);
  bodyFormData.append("categoryId", data.categoryId);
  bodyFormData.append("likes", data.likes);
  bodyFormData.append("image", data.image);
  bodyFormData.append("authorBy", data.authorBy);
  bodyFormData.append("status", data.status);
  for (let i = 0; i < abc.length; i++) {
    bodyFormData.append("tagId[]", abc[i]);
    // console.log('ABCCC',abc[i])
  }
  const res = await axios.put(`edit/post/${id}`, bodyFormData);
  // console.log('Res',res)
  return res;
};

//Update the like in Post
export const updateLikePost = (data) => async (dispatch) => {
  console.log("ADD LIKED", data);
  // const abc = cookies.get("token");
  // console.log("CONFIGGG", abc);
  // let obj ={

  // }

  const res = await axios.put("edit/like", data);
  console.log("Res", res);
  return res;
};

//Delete the Post
export const deletePost = (id) => async (dispatch) => {
  // console.log('DELCONTACT ID',id)
  const res = await axios.delete(`/delete/post/${id}`);
  // console.log('RESPONSE',res)
  return res;
};
