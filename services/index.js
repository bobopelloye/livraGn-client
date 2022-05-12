import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
const BASE_URL_API = "http://164.92.231.252";

let token  = AsyncStorage.getItem('token')? `token ${AsyncStorage.getItem('token')}`: null;



axios.defaults.baseURL = `${BASE_URL_API}`;
axios.defaults.headers.common = {
    Authorization: token,
};

export default axios;