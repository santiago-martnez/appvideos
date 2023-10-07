import axios from 'axios'

const instance = axios.create({
    //baseURL: 'http://localhost:4000/api',
    baseURL: 'https://app-videos.onrender.com/api',
    withCredentials: true
})

export default instance