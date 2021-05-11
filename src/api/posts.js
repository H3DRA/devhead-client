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

export const indexPosts = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/posts',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const deletePost = (user, id) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/posts/' + id,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const updatePost = (user, id, body) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/posts/' + id,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      post: {
        body: body
      }
    }
  })
}
