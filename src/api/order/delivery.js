import { axios } from '@/utils/request'

// api接口列表
const api = {
  list: '/order.delivery/list',
  detail: '/order.delivery/detail',
  delivery: '/order.delivery/delivery',
  batch: '/order.delivery/batch'
}

// 列表记录
export function list (params) {
  return axios({
    url: api.list,
    method: 'get',
    params
  })
}

// 详情记录
export function detail (deliveryId) {
  return axios({
    url: api.detail,
    method: 'get',
    params: { deliveryId }
  })
}

/**
 * 确认发货 (手动录入)
 * @param {*} data
 */
export function delivery (data) {
  return axios({
    url: api.delivery,
    method: 'post',
    data
  })
}
