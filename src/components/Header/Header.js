import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import '../../CSS/Home.scss'

const authenticatedOptions = (
  <Fragment>
    <div>
      <Nav.Link href="#create-post" style={{ fontSize: '25px' }}>post</Nav.Link>
      <Nav.Link href="#index-posts" style={{ fontSize: '25px' }}>myPosts</Nav.Link>
      <Nav.Link href="#index-posts-all" style={{ fontSize: '25px' }}>devFeed</Nav.Link>
      <Nav.Link href="#index-users" style={{ fontSize: '25px' }}>devHeads</Nav.Link>
      <Nav.Link href="#change-password" style={{ fontSize: '25px' }}>changePassword</Nav.Link>
      <Nav.Link href="#sign-out" style={{ fontSize: '25px' }}>signOut</Nav.Link>
    </div>
  </Fragment>
)

// With the addition of the sign-up/sign-in notes on the front page auth forms,
// I removed the links to improve UX
const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up"> </Nav.Link>
    <Nav.Link href="#sign-in"> </Nav.Link>
  </Fragment>
)

// I blocked out the home link because the create page is more appropriate as
// the first page seen upon sign in. There is no need to visit the home page anymore.
// Before, the home page housed the secondary navigation links, but now those links
// are on the page of every component.

// const alwaysOptions = (
//   <Fragment>
//     <Nav.Link href="#/">home</Nav.Link>
//   </Fragment>
// )

const Header = ({ user }) => (
  <Navbar bg="transparent" variant="dark" expand="md" className="home navbar">
    <Navbar.Brand href="#index-posts-all" className="logo">
      {'{dH}'}
      <p className="logo-subhead">devHead</p>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto block-nav">
        { user && <span className="navbar-text mr-2" style={{ fontSize: '25px', color: 'rgba(0, 255, 177, 100)' }}>hello {user.email}</span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
