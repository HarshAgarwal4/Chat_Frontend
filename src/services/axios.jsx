import axios from 'axios'
const url = import.meta.env.VITE_REACT_APP_BACKEND_URL

export default axios.create({
    baseURL: url,
    withCredentials: true
})