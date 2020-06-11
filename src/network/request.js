import axios from 'axios'

export function request(config){

  /* 创建实例*/
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000
  })

  /* 请求拦截*/
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    /* alert(err) */
  })

  /* 响应拦截*/
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    /* alert(err) */
  })

  /* 发送真正的网络请求*/
  return instance(config)
}
/* 'http://123.207.32.32:8000', */