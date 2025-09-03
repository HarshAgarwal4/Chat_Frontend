import axios from 'axios'
const url = import.meta.env.VITE_REACT_APP_BACKEND_URL

export default axios.create({
    baseURL: "https://chat-backend-silk-nine.vercel.app",
    withCredentials: true
})