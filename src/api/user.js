import request from '@/utils/request'

const api_name = ``
export default{

    list(page,limit,keyword){
      return request({
        url: `${api_name}/api/user/list/${page}/${limit}?keyword=${keyword}`,
        method: 'get'
      })
    },

    save(user){
      return request({
        url: `${api_name}/api/dictType/save`,
        method: 'post',
        data: user
      })
    },

    fetchById(userId){
      return request({
        url: `${api_name}/api/user/fetchById/${userId}`,
        method: 'get'
      })
    },

    updateById(user){
      return request({
        url: `${api_name}/api/user/update`,
        method: 'put',
        data: user
      })
    }

}
