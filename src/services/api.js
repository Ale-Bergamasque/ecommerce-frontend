import axios from 'axios';

const api = () => {
    const token = JSON.parse(localStorage.getItem('token'));

    return axios.create({
        baseURL: 'https://desfio-m05-backend.herokuapp.com',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

export default api;