import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { withRouter, Link } from 'react-router-dom'
import { createPost } from '../../api/posts'
import messages from '../AutoDismissAlert/messages'

class CreatePost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      body: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onCreatePost = event => {
    event.preventDefault()

    const { user, msgAlert, history } = this.props

    createPost(this.state, user)
      .then(() => msgAlert({
        heading: 'Create Post Success',
        message: messages.createPostSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/index-posts'))
      .catch(error => {
        this.setState({ body: '' })
        msgAlert({
          heading: 'Create post failed with error: ' + error.message,
          message: messages.createPostFailure,
          variant: 'danger'
        })
      })
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
    const { body } = this.state

    return (
      <div className="row form">
        {authenticatedOptions}
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <p className="ptitles">createPost</p>
          <Form onSubmit={this.onCreatePost}>
            <Form.Group controlId="body">
              <Form.Control
                required
                className="field"
                type="text"
                name="body"
                value={body}
                placeholder="postYourThoughts!"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              className="button"
              variant="primary"
              type="submit"
            >
              post
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(CreatePost)
