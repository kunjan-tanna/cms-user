require('dotenv').config()

// Set the Image Path URL
const axiosInstance = 
  {baseURL: process.env.REACT_APP_PUBLIC_PATH || 'http://localhost:8000/upload'}

export default axiosInstance