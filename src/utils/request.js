/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'

const request = axios.create({
    baseURL: 'http://toutiao.itheima.net' // 接口的基准路径
})

// 请求拦截器
request.interceptors.request.use(function(config) {
    // Do something before request is sent
    // config ：本次请求的配置对象
    // config 里面有一个属性：headers
    // console.log(config)
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    console.log(config)
    return config
}, function(error) {
    // Do something with request error
    return Promise.reject(error)
})

// 响应拦截器



export default request