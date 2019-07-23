import axios from 'axios'
import router from "../router-config";
// http response 拦截器（所有接收到的请求都要从这儿过一次）

let token=window.localStorage.getItem('userData')?JSON.parse(window.localStorage.getItem('userData')).jwt:window.localStorage.getItem('token')


axios.interceptors.request.use(config=>{
     config.headers.Authorization="Bearer "+token
    //config.headers.Authorization="Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0cnVlTmFtZSI6IuWUkOa2myjmtYvor5XnoJTlj5Hpg6gpIiwic3ViIjoidGFuZ3RhbzEiLCJpc3MiOiJvcC11Yy1qd3QiLCJuYW1lIjoidGFuZ3RhbzEiLCJleHAiOjE1NjM4NDQ0NzQsImlhdCI6MTU2Mzc1ODA3NCwidXNlcklkIjo4MDk5fQ.dgnAYhU5xPMGANXCGU49EcWgMxjepf_gIoS7kXAB2Yw"
    return config
})
axios.interceptors.response.use(
    response => {
    if(response.data['msg'] === '登录超时,请重新登录'){router.push({path: '/login'});}
    return response
});

export default axios;

