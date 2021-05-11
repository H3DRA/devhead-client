import React, { Component } from 'react'
import { indexUsers } from '../../api/users'
import messages from '../AutoDismissAlert/messages'

class IndexUsers extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: null
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

  render () {
    const { users } = this.state

    let usersJsx = ''

    if (users === null) {
      usersJsx = (
        <p>Loading...</p>
      )
    } else {
      usersJsx = (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              {user.email}
            </li>
          ))}
        </ul>
      )
    }

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Our Users</h3>
          {usersJsx}
        </div>
      </div>
    )
  }
}

export default IndexUsers
