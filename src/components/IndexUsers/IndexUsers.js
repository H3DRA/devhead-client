import React, { Component } from 'react'
import { indexUsers } from '../../api/users'
import { indexAllPosts } from '../../api/posts'
import messages from '../AutoDismissAlert/messages'
import Button from 'react-bootstrap/Button'
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
    const { users, posts } = this.state
    let usersJsx = ''
    if (users === null) {
      usersJsx = (
        <p>Loading...</p>
      )
    } else if (posts) {
      usersJsx = (
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              {post.body}
            </li>
          ))}
          <Button
            variant="secondary"
            type="button"
            onClick={this.goBack}
          >Go Back</Button>
        </ul>
      )
    } else {
      usersJsx = (
        <ul>
          {users.map(user => (
            <li key={user._id}>
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
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          {usersJsx}
        </div>
      </div>
    )
  }
}
export default IndexUsers
