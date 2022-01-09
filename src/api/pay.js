import request from '@/utils/request'

export function aliPay (data) {
  return request({
    url: 'jpysers/aliPay',
    method: 'post',
    data: data
  })
}
