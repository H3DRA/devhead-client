import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../../CSS/Home.scss'

const unauthenticatedOptions = (
  <div>
    <h1 className="welcome">  </h1>
  </div>
)

const authenticatedOptions = (
  <div className="ml-auto authnav">
    <Link to="/create-post" className="authnavlinks" style={{ textDecoration: 'none' }}>post</Link>
    <Link to="/index-posts" className="authnavlinks" style={{ textDecoration: 'none' }}>myPosts</Link>
    <Link to="/index-posts-all" className="authnavlinks" style={{ textDecoration: 'none' }}>devFeed</Link>
    <Link to="/index-users" className="authnavlinks" style={{ textDecoration: 'none' }}>devHeads</Link>
  </div>
)

const Home = ({ user }) => (
  <Fragment>
    { user ? authenticatedOptions : unauthenticatedOptions }
  </Fragment>
)

export default withRouter(Home)
