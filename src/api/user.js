/**
 * 用户相关请求模块
 */
// import store from '@/store'
import request from '@/utils/request'

// export const login = data => {
//   return request({
//     method: 'POST',
//     url: '/app/v1_0/authorizations',
//     data
//   })
// }

export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}
export const sendSms = mobile => {
        return request({
            method: 'GET',
            url: `/v1_0/sms/codes/:${mobile}`

        })
    }
    // 获取用户自己信息
export const getUserInfo = () => {
        return request({
            method: 'GET',
            url: '/v1_0/user'
                // headers: {
                //     Authorization: `Bearer ${store.state.user.token}`
                // }

        })
    }
    // 获取用户频道列表
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels'
    })
}