import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { USER } from '../utility/Constants';

const axiosInstance = axios.create({
  baseURL: 'https://MivSmart.Com/api/',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
});

function getUrl(config) {
  if (config.baseURL) {
    return config.url.replace(config.baseURL, '');
  }
  return config.url;
}

// Intercept all requests
axiosInstance.interceptors.request.use(
  async config => {
    let user = await AsyncStorage.getItem(USER);

    try {
      user = JSON.parse(user);
    } catch (exc) {}

    config.headers['NST'] = 'mivwU3RhdGlvblRva2Vu';
    user?.Token && (config.headers['Token'] = user.Token);
    // config.headers['Token'] =
    //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJDdXN0b21lcklkIjoxLCJleHAiOjE2MzM0MDk0NDYuMH0.bE8u0keKMDGOS35WijETscMtdas6mrWMRsbE0BHY5ro';
    config.headers['DeviceId'] = '123456';

    // console.log('######REQUEST######');
    // console.log(
    //   `%c baseURL : ${config.baseURL}`,
    //   'color: #0086b3; font-weight: bold',
    // );
    // console.log(
    //   `%c url : ${getUrl(config)}`,
    //   'color: #0086b3; font-weight: bold',
    // );
    // console.log(
    //   `%c method : ${config.method}`,
    //   'color: #0086b3; font-weight: bold',
    // );
    // console.log('headers : ', config.headers);
    // console.log('body : ', config.data);
    // console.log('######REQUEST######');
    return config;
  },
  error => Promise.reject(error),
);
// Intercept all responses
axiosInstance.interceptors.response.use(
  response => {
    // console.log('######SUCCESS######');
    // console.log(
    //   `%c status: ${response.status}`,
    //   'color: #008000; font-weight: bold',
    // );
    // console.log(
    //   `%c url : ${getUrl(response.config)}`,
    //   'color: #008000; font-weight: bold',
    // );
    // console.log('response :', response.data);
    // console.log('######SUCCESS######');
    return response;
  },
  error => {
    // console.log('######ERROR######');
    // console.log(
    //   `%c status : ${error.response.status}`,
    //   'color: #a71d5d; font-weight: bold',
    // );
    // console.log(
    //   `%c url : ${getUrl(error.response.config)}`,
    //   'color: #a71d5d; font-weight: bold',
    // );
    //console.log('error :', error.response.data);
    //console.log('######ERROR######');
    return Promise.reject(error);
  },
);

// if (err.response) {
//   // The request was made and the server responded with a status code
//   // that falls out of the range of 2xx
//   console.log(err.response.data);
//   console.log(err.response.status);
//   console.log(err.response.headers);
// } else if (err.request) {
//   // The request was made but no response was received
//   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//   // http.ClientRequest in node.js
//   console.log(err.request);
// } else {
//   // Something happened in setting up the request that triggered an Error
//   console.log('Error', err.message);
// }
// console.log(err.config);

export default axiosInstance;
