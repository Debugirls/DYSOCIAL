import axios, { AxiosHeaders } from "axios";

const dysocialApi = axios.create({
  baseURL: 'http://localhost:8081/api/',
 
});

dysocialApi.interceptors.request.use((config)=>{
  (config.headers as AxiosHeaders).set("Accept", "application/json"); 
  (config.headers as AxiosHeaders).set("Content-Type", "application/json"); 
    const token = localStorage.getItem('token');
    if(token) {
      console.log(token);
      (config.headers as AxiosHeaders).set("x-access-token", token); // JWT
    }
    return config;
});

export default dysocialApi;