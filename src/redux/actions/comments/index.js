import axios from '../../../configs/axiosConfig'

//Create Add Comment
export const addCommit = (data) => async (dispatch) => {
  // console.log("ADD LEAD",data)
  const res = await axios.post('create/comment', data)
  // console.log('Res',res)
    return res
}

//Get Comment
export const getCommit = () => async (dispatch) => {
  const res = await axios.get('/comment')
  // console.log('Get Leads',res)
  if (res) {
    dispatch({ type: 'COMMENTS', payload: res.data })
  }
  // console.log('Response',res)
  return res
}