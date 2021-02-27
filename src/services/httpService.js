import axios from 'axios';
import logger from './logService';
import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {

    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedError) {

        logger.log(error);
        toast.error("An unexpected error occurred");
    }
    return Promise.reject(error);
});

function setJwt(jwt) {

    // puts x-auth-token in the header of every http request

    // axios.defaults.headers.common['x-auth-token'] = jwt;
    // axios.defaults.headers.post['Authorization'] = jwt;
    axios.defaults.headers.put['Authorization'] = jwt;
    axios.defaults.headers.get['Authorization'] = jwt;
    axios.defaults.headers.delete['Authorization'] = jwt;
    axios.defaults.headers.head['Access-Control-Allow-Origin'] = "*";

    //


}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    head: axios.head,
    setJwt
}