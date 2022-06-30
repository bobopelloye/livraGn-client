import axios from "axios";
import {AsyncStorage} from 'react-native'
const BASE_URL_API = "https://livragn.com";

let token  = AsyncStorage.getItem('token')? `token ${AsyncStorage.getItem('token')}`: '';



axios.defaults.baseURL = `${BASE_URL_API}`;
axios.defaults.headers.common = {
    Authorization: '',
};

export default axios;