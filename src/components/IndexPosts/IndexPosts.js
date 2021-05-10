import React, { Component } from 'react'
import { indexPosts } from '../../api/posts'
// import messages from '../AutoDismissAlert/messages'

class IndexPosts extends Component {
  constructor (props) {
    super(props)

    this.state = {
      posts: null
    }
  }

  componentDidMount () {
    const { user } = this.props

    indexPosts(user)
      .then(res => this.setState({ posts: res.data.posts }))
      .catch(() => console.error)
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
          <h3>Your Wall</h3>
          {postsJsx}
        </div>
      </div>
    )
  }
}

export default IndexPosts
