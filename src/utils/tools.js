import { decode } from 'js-base64'
export function getRequest () {
  let url = window.location.search.substr(1) // 获取url中“？”后的字符串
  if (url.indexOf('&') === -1) {
    url = decode(url)
  }
  let theRequest = {}
  let strs = url.split('&')
  for (let i = 0; i < strs.length; i++) {
    theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1])
  }
  return theRequest
}
