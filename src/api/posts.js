import apiUrl from '../apiConfig'
import axios from 'axios'

export const createPost = (post, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/posts',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      post: {
        body: post.body
      }
    }
  })
}
