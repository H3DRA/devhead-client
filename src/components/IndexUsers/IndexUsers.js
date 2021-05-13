import React, { Component } from 'react'
import { indexUsers } from '../../api/users'
import { indexAllPosts } from '../../api/posts'
import messages from '../AutoDismissAlert/messages'
import Button from 'react-bootstrap/Button'
import { withRouter, Link } from 'react-router-dom'
class IndexUsers extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: null,
      posts: null
    }
  }
  componentDidMount () {
    const { user, msgAlert } = this.props
    indexUsers(user)
      .then(res => this.setState({ users: res.data.users }))
      .then(() => msgAlert({
        heading: 'Successfully indexed users',
        message: messages.indexUsersSuccess,
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'User indexing failed ' + error.message,
        message: messages.indexUsersFailure,
        variant: 'danger'
      }))
  }

  goBack = event => {
    this.setState({ posts: null })
  }

  indexUserPosts = event => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    const id = event.target.getAttribute('data-id')
    indexAllPosts(user)
      .then(res => {
        const userPosts = res.data.posts.filter(post => post.owner === id)
        this.setState({ posts: userPosts })
      })
      .then(() => msgAlert({
        heading: 'Successfully indexed user post',
        message: messages.indexUserPostsSuccess,
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'User post indexing failed ' + error.message,
        message: messages.indexUserPostsFailure,
        variant: 'danger'
      }))
  }
  render () {
    const authenticatedOptions = (
      <div className="ml-auto authnav" expand="md">
        <Link to="/create-post" className="authnavlinks" style={{ textDecoration: 'none', padding: '2%' }}>post</Link>
        <Link to="/index-posts" className="authnavlinks" style={{ textDecoration: 'none', padding: '2%' }}>myPosts</Link>
        <Link to="/index-posts-all" className="authnavlinks" style={{ textDecoration: 'none', padding: '2%' }}>devFeed</Link>
        <Link to="/index-users" className="authnavlinks" style={{ textDecoration: 'none', padding: '2%' }}>devHeads</Link>
      </div>
    )
    const { users, posts } = this.state
    let usersJsx = ''
    if (users === null) {
      usersJsx = (
        <p className="form">Loading...</p>
      )
    } else if (posts) {
      usersJsx = (
        <ul className="list">
          {posts.map(post => (
            <li key={post._id} className="linebetween">
              {post.body}
            </li>
          ))}
          <Button
            variant="secondary"
            className="button"
            type="button"
            onClick={this.goBack}
          >Go Back</Button>
        </ul>
      )
    } else {
      usersJsx = (
        <ul className="list">
          {users.map(user => (
            <li key={user._id} className="linebetween">
              <a
                href="#"
                data-id={user._id}
                onClick={this.indexUserPosts}
              >{user.email}</a>
            </li>
          ))}
        </ul>
      )
    }
    return (
      <div className="row">
        {authenticatedOptions}
        <div className="col-sm-10 col-md-8 mx-auto mt-5 feedbox">
          <p className="ptitles">moreDevs</p>
          {usersJsx}
        </div>
      </div>
    )
  }
}
export default withRouter(IndexUsers)
