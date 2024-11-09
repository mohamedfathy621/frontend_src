import axios from 'axios'
const base_url='http://127.0.0.1:8000/Rest/'

export function register(body){
    const request_url=`${base_url}register`
    return axios.post(request_url,body).then((result)=>{
        return result;
    }).catch((error)=>{
        
        return error.response;
    });
}

export function login(body){
    const request_url=`${base_url}login`
    return axios.post(request_url,body).then((result)=>{
        console.log(result)
        return result;
    }).catch((error)=>{
        console.log(error.response)
        return error.response;
    });
}

export function refresh_token(body){
    const request_url=`${base_url}token/refresh`
    return axios.post(request_url,body).then((result)=>{
        return result;
    }).catch((error)=>{
        
        return error.response;
    });
}

export function get_medications(Token){
    const request_url=`${base_url}medications/fetch`
    const token = Token // Get the token
    return axios.get(request_url,{
        headers: {
            Authorization: `Bearer ${token}`, // Attach token to Authorization header
        }
    }).then((result)=>{
       
        return result;
    }).catch((error)=>{
       
        return error.response;
    });
}

export function send_order(Token,body){
    const request_url=`${base_url}medications/order`
    const token = Token // Get the token
    console.log(token)
    return axios.post(request_url,body,{
        headers: {
            Authorization: `Bearer ${token}`, // Attach token to Authorization header
        }
    }).then((result)=>{
       
        return result;
    }).catch((error)=>{
       
        return error.response;
    });
}
  

export function get_chart(Token){
    const request_url=`${base_url}medications/chart`
    const token = Token // Get the token
    return axios.get(request_url,{
        headers: {
            Authorization: `Bearer ${token}`, // Attach token to Authorization header
        }
    }).then((result)=>{
       
        return result;
    }).catch((error)=>{
       
        return error.response;
    });
}