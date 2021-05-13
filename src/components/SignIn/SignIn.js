import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignIn extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Sign In Success',
        message: messages.signInSuccess,
        variant: 'success'
      }))
      // hey yall, I switched the route so that upon sign-in, the user is directed to the
      // post creation page
      .then(() => history.push('/create-post'))
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <div className="row form">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>signIn</h3>
          <Form onSubmit={this.onSignIn}>
            <Form.Group controlId="email">
              <Form.Label>emailAddress</Form.Label>
              <Form.Control
                required
                className="field"
                type="email"
                name="email"
                value={email}
                placeholder="enterEmail"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>password</Form.Label>
              <Form.Control
                required
                className="field"
                name="password"
                value={password}
                type="password"
                placeholder="password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              className="button"
              variant="primary"
              type="submit"
            >
              submit
            </Button>
          </Form>
          <br/>
          <p>Need to sign up? Click to <span>
            <Link to="/sign-up"
              className="authnavlinks authnavlinks:hover"
              style={{ textDecoration: 'none' }}>
              create an account</Link>
          </span>!
          </p>
        </div>
      </div>
    )
  }
}

export default withRouter(SignIn)
