import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { changePassword } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class ChangePassword extends Component {
  constructor (props) {
    super(props)

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props
    // console.log(this.state)
    // console.log(user)

    changePassword(this.state, user)
      .then(() => msgAlert({
        heading: 'Change Password Success',
        message: messages.changePasswordSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/create-post'))
      .catch(error => {
        this.setState({ oldPassword: '', newPassword: '' })
        msgAlert({
          heading: 'Change Password Failed with error: ' + error.message,
          message: messages.changePasswordFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <div className="row form">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>changePassword</h3>
          <Form onSubmit={this.onChangePassword}>
            <Form.Group controlId="oldPassword">
              <Form.Label>oldPassword</Form.Label>
              <Form.Control
                required
                className="field"
                name="oldPassword"
                value={oldPassword}
                type="password"
                placeholder="oldPassword"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Label>newPassword</Form.Label>
              <Form.Control
                required
                className="field"
                name="newPassword"
                value={newPassword}
                type="password"
                placeholder="newPassword"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(ChangePassword)
