import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:5001/login-application-tien/us-central1/app/',
})
