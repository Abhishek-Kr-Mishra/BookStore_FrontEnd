import axios from "axios"

const baseUrl = "https://backend-bookstore.herokuapp.com/";
const headers= {
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('accessToken')
}

export default{
    post(url , data){
        return axios({
            method: 'post',
            url: `${baseUrl}${url}`,
            data: data,
            headers
        })
    },
    get(url){
        return axios({
            method: 'get',
            url: `${baseUrl}${url}`,
            headers
        })
    },
    put(url , data){
        return axios({
            method: 'put',
            url: `${baseUrl}${url}`,
            data: data,
            headers
        })
    },
    delete(url){
        return axios({
            method: 'delete',
            url: `${baseUrl}${url}`,
            headers
        })
    }
}