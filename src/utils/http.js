import Vue from 'vue'
import axios from 'axios'
import router from '../router/index';
axios.defaults.baseURL = 'http://localhost:3000/api'
//请求拦截器
axios.interceptors.request.use(function(config){
    //如果 不是登陆接口
    if(config.url!='/userLogin'){
        let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}') //空对象是为了避免报错  authorization这是后端请求头的名字
        let token = userInfo.token
        config.headers.authorization = token
        // console.log(config);
        return config
    }
    return config
})
//响应拦截器
axios.interceptors.response.use(function(response){
    //此处验证如果是403就跳转到登陆页    先导入router，再实现跳转
    if(response.data.code == 403){
        router.push('/login')
    }
    return response.data
})

Vue.prototype.$http = axios
export default axios