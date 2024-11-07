import axios from 'axios'
const base_url='http://127.0.0.1:8000/Rest/'

export function register(){
    const request_url=`${base_url}register`
    return axios.get(request_url)
}

export function login(){
    const request_url=`${base_url}login`
    return axios.get(request_url)
}