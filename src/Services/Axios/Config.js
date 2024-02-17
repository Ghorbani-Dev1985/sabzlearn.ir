import axios from "axios";

const ApiRequest = axios.create({
    baseURL: 'http://localhost:5000/v1/',
    headers: {
        'Content-Type' : 'application/json',
        Authorization : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }
})

export default ApiRequest