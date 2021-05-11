import React, { Component } from 'react'
import { indexAllPosts } from '../../api/posts'
import messages from '../AutoDismissAlert/messages'

// similar to IndexPosts(user) except it'll show any post created by any user
class IndexAllPosts extends Component {
  constructor (props) {
    super(props)

    this.state = {
      posts: null
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props

    indexAllPosts(user)
      .then(res => this.setState({ posts: res.data.posts }))
      .then(() => msgAlert({
        heading: 'Successfully indexed all posts',
        message: messages.indexAllSuccess,
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ oldPassword: '', newPassword: '' })
        msgAlert({
          heading: 'Index All Posts Failed with error: ' + error.message,
          message: messages.indexAllFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { posts } = this.state

    let postsJsx = ''
    // here we manage states (1. loading 2. no posts 3. display posts)
    if (posts === null) {
      postsJsx = (
        <p>Loading...</p>
      )
    } else if (posts.length === 0) {
      postsJsx = (
        <p>No posts to display! Go post something</p>
      )
    } else {
      postsJsx = (
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              {post.body}
            </li>
          ))}
        </ul>
      )
    }

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Public Wall</h3>
          {postsJsx}
        </div>
      </div>
    )
  }
}

export default IndexAllPosts