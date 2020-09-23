import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';

import './header.styles.scss';
import ProfileDropdown from '../profile-dropdown/profile-dropdown.component';

const Header = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  return (
    <Navbar bg="light">
      <div className="container">
        <Navbar.Brand>
          <Link to="/" className="headerBrand">
            RohitGram
          </Link>
        </Navbar.Brand>
        <Form className="m-auto w-50">
          <FormControl type="text" placeholder="Search" />
        </Form>
        <Nav className="ml-auto">
          <Link to="/" className="ml-3">
            <i className="fa fa-home fa-2x" aria-hidden="true"></i>
          </Link>
          <Link to="/direct/inbox" className="ml-3">
            <i className="fa fa-paper-plane fa-2x" aria-hidden="true"></i>
          </Link>
          <Link to="/explore" className="ml-3">
            <i className="fa fa-internet-explorer fa-2x" aria-hidden="true"></i>
          </Link>
          <Link to="noti" className="ml-3">
            <i className="fa fa-heart fa-2x" aria-hidden="true"></i>
          </Link>
          <div
            className="ml-3"
            onClick={(event) => setToggleDropdown(!toggleDropdown)}
          >
            <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
          </div>
        </Nav>
        {toggleDropdown ? <ProfileDropdown /> : null}
      </div>
    </Navbar>
  );
};

export default Header;
