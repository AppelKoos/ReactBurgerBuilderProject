import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-93143.firebaseio.com/'
})

export default instance;