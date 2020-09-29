import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import userAvatar from '../../assets/user_-512.webp';
import { useDispatch, useSelector } from 'react-redux';

import './header.styles.scss';
import ProfileDropdown from '../profile-dropdown/profile-dropdown.component';
import Search from '../search/search.component';
import {
  toggleDropdown,
  toggleSearch,
} from '../../redux/actions/toggle.actions';
import { usersList } from '../../redux/actions/user.actions';

const Header = () => {
  const dispatch = useDispatch();

  const dummyUrl = useSelector((state) => state.auth.user);
  const imgSrc = dummyUrl ? dummyUrl.profileUrl : null;

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    dispatch(usersList());
  }, [dispatch, searchValue]);

  return (
    <div className="headerContainer">
      <Navbar bg="light">
        <div className="container">
          <Navbar.Brand>
            <Link to="/" className="headerBrand">
              RohitGram
            </Link>
          </Navbar.Brand>
          <Form className="m-auto w-50 headerContainer--search">
            <FormControl
              onFocus={() => dispatch(toggleSearch())}
              onChange={(event) => setSearchValue(event.target.value)}
              type="text"
              placeholder="Search"
            />
            <Search searchValue={searchValue} />
          </Form>
          <Nav className="ml-auto">
            <Link to="/" className="ml-3">
              <i className="fa fa-home fa-2x" aria-hidden="true"></i>
            </Link>
            <Link to="/direct/inbox" className="ml-3">
              <i className="fa fa-paper-plane fa-2x" aria-hidden="true"></i>
            </Link>
            <Link to="/explore" className="ml-3">
              <i
                className="fa fa-internet-explorer fa-2x"
                aria-hidden="true"
              ></i>
            </Link>
            <Link to="/" className="ml-3">
              <i className="fa fa-heart fa-2x" aria-hidden="true"></i>
            </Link>
            <div
              className="ml-3"
              onClick={(event) => dispatch(toggleDropdown())}
            >
              <img
                src={imgSrc ? imgSrc : userAvatar}
                alt="avatar"
                className="headerContainer--avatar"
              />
            </div>
          </Nav>
          {toggleDropdown ? <ProfileDropdown /> : null}
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
