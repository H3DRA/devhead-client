import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/create-post'))
      .catch(error => {
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        msgAlert({
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password, passwordConfirmation } = this.state

    return (
      <div className="row form">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>signUp</h3>
          <Form onSubmit={this.onSignUp}>
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
            <Form.Group controlId="passwordConfirmation">
              <Form.Label>passwordConfirmation</Form.Label>
              <Form.Control
                required
                className="field"
                name="passwordConfirmation"
                value={passwordConfirmation}
                type="password"
                placeholder="confirmPassword"
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
          <p>Already signed up? <span>
            <Link to="/sign-in"
              className="authnavlinks"
              style={{ textDecoration: 'none', color: 'rgb(0, 255, 177)' }}>
              sign in</Link>
          </span> here!
          </p>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUp)
