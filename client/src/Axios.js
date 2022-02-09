import axios from "axios";

let token = `Bearer ${localStorage.getItem('token')}`;
const instance = axios.create({
    baseURL: window.baseURL,
    //timeout: 1000,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers = {
        Authorization: token,
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response);
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
  export default instance;