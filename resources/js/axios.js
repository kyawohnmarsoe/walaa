import Axios from 'axios';

const axios = Axios.create({
    baseURL: "https://rapi.earthlink.iq",
    timeout:60000,
    withCredentials:true,
    xsrfCookieName:"XSRF-TOKEN",
    xsrfHeaderName:"X-XSRF-TOKEN"
});

axios.interceptors.response.use(null,(err)=>{
    console.log(err);
})

export default axios;