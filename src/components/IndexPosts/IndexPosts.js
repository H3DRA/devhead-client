import React, { Component } from 'react'
import { indexPosts, deletePost, updatePost } from '../../api/posts'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class IndexPosts extends Component {
  constructor (props) {
    super(props)

    this.state = {
      posts: null,
      formDisplay: false,
      formBody: '',
      formId: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props

    indexPosts(user)
      .then(res => this.setState({ posts: res.data.posts }))
      .catch(error => msgAlert({
        heading: 'Post indexing failed ' + error.message,
        message: messages.indexPostFailure,
        variant: 'danger'
      }))
      // .then(() => msgAlert({
      //   heading: 'Successfully indexed post',
      //   message: messages.indexPostSuccess,
      //   variant: 'success'
      // }))
  }

  showEditForm = (event) => {
    event.preventDefault()
    this.setState({
      formDisplay: true,
      formId: event.target.getAttribute('data-id')
    })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  postUpdate = (event) => {
    event.preventDefault()
    const { formBody, formId } = this.state
    const { user, msgAlert, history } = this.props
    updatePost(user, formId, formBody)
      .then(() => this.setState({ formId: null,
        formBody: '',
        formDisplay: false
      }))
      .then(() => msgAlert({
        heading: 'Successfully updated post',
        message: messages.updatePostSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .then(() => history.push('/index-posts'))
      .catch(error => msgAlert({
        heading: 'Post update failed ' + error.message,
        message: messages.updatePostFailure,
        variant: 'danger'
      }))
  }

  postDelete = (event) => {
    const id = event.target.getAttribute('data-id')
    const { user, msgAlert, history } = this.props
    deletePost(user, id)
      .then(() => msgAlert({
        heading: 'Successfully deleted post.',
        message: messages.deletePostSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .then(() => history.push('/index-posts'))
      .catch(error => msgAlert({
        heading: 'Post deletion failed ' + error.message,
        message: messages.deletePostFailure,
        variant: 'danger'
      }))
  }

  goBack = event => {
    this.setState({ formDisplay: false, formId: null })
  }

  render () {
    const { posts, formDisplay, formBody, formId } = this.state

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
    } else if (formDisplay) {
      postsJsx = (
        <Form onSubmit={this.postUpdate}>
          <Form.Group controlId="formBody">
            <Form.Label>Post Update</Form.Label>
            <Form.Control
              required
              type="text"
              name="formBody"
              value={formBody}
              data-id={formId}
              placeholder="Post your thoughts!"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button
            className="button"
            variant="primary"
            type="submit"
          >
              Update
          </Button>
          <Button
            variant="secondary"
            className="button"
            type="button"
            onClick={this.goBack}
          >Go Back</Button>
        </Form>
      )
    } else {
      postsJsx = (
        <ul className="list">
          {posts.slice(0).reverse().map(post => (
            <li key={post._id} className="linebetween">
              {post.body}
              <div className="timestamp">
                {(new Date(post.createdAt)).toDateString()}
                <span> </span>
                {(new Date(post.createdAt)).toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })}
              </div>
              <Button
                variant="primary"
                className="button"
                type="button"
                onClick={this.postDelete}
                data-id={post._id}
              >
                Delete
              </Button>
              <Button
                className="button"
                variant="secondary"
                type="button"
                onClick={this.showEditForm}
                data-id={post._id}
              >
                Edit
              </Button>
            </li>
          ))}
        </ul>
      )
    }

    return (
      <div className="row d-flex">
        <div className="col-sm-10 col-md-8 mx-auto mt-5 feedbox">
          <p className="ptitles">yourWall</p>
          {postsJsx}
        </div>
      </div>
    )
  }
}

export default withRouter(IndexPosts)
