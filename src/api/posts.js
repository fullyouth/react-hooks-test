import { Axios } from './axios'

export const getPostList = (params) => {
  return Axios.get('/posts', params)
}