import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'
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
      .then(() => history.push('/'))
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
    const { body } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Create Post</h3>
          <Form onSubmit={this.onCreatePost}>
            <Form.Group controlId="body">
              <Form.Label>Post Body</Form.Label>
              <Form.Control
                required
                type="text"
                name="body"
                value={body}
                placeholder="Post your thoughts!"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Post
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(CreatePost)
