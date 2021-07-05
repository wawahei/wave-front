import request from '@/utils/request'

const api_name = ``

export function getPageList(page,limit,keyword) {
  return request({
    url: `${api_name}/api/dictType/list/${page}/${limit}?keyword=${keyword}`,
    method: 'get'
  })
}

export function updateDictType(dictType){
  return request({
    url: `${api_name}/api/dictType/update`,
    method: 'put',
    data: dictType
  })
}

export function saveDictType(dictType){
  return request({
    url: `${api_name}/api/dictType/save`,
    method: 'post',
    data: dictType
  })
}

export function deleteById(typeId){
  return request({
    url: `${api_name}/api/dictType/delete/${typeId}`,
    method: 'delete'
  })
}

export function listByParentId(typeCode){
  return request({
    url: `${api_name}/api/dictValue/list/1/100?typeCode=${typeCode}`,
    method: 'get'
  })
}

export function saveList(list){
  return request({
    url: `${api_name}/api/dictValue/saveList`,
    method: 'post',
    data: list
  })
}
