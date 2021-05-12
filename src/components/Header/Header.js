import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import '../../CSS/Home.scss'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#change-password">changePassword</Nav.Link>
    <Nav.Link href="#sign-out">signOut</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">signUp</Nav.Link>
    <Nav.Link href="#sign-in">signIn</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#/">home</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="transparent" variant="dark" expand="md" className="home navbar">
    <Navbar.Brand href="#" className="logo">
      {'{dH}'}
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">hello {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
