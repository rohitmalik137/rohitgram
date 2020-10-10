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
  toggleUploader,
} from '../../redux/actions/toggle.actions';
import { usersList } from '../../redux/actions/user.actions';

const Header = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();

  const toggleTheme = useSelector((state) => state.toggle.toggleTheme);

  const dummyUrl = useSelector((state) => state.auth.user);
  const imgSrc = dummyUrl ? dummyUrl.profileUrl : null;

  let domain = 'http://localhost:3000/';
  let mainUrl = domain + imgSrc;

  const [searchValue, setSearchValue] = useState('');
  // console.log(windowWidth);

  useEffect(() => {
    dispatch(usersList());
    const updateDimensions = () => {
      let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
      setWindowWidth(windowWidth);
    };
    window.addEventListener('resize', updateDimensions);
  }, [dispatch, searchValue]);

  const renderView = (args) => {
    switch (args) {
      case 'smaller':
      default:
        return (
          <div className="headerContainer-mobile">
            <div className="headerContainer-mobile--header">
              <Navbar
                bg={`${
                  toggleTheme
                    ? toggleTheme === 'light'
                      ? 'light'
                      : 'dark'
                    : 'light'
                }`}
                style={{ padding: '1px 5px' }}
              >
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
                      className="search-box overall"
                    />
                    <Search searchValue={searchValue} />
                  </Form>
                  <Nav className="ml-auto">
                    <Link to="/direct/inbox" className="ml-3">
                      <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                    </Link>
                  </Nav>
                </div>
              </Navbar>
            </div>
            <div className="headerContainer-mobile--footer">
              <Navbar
                bg={`${
                  toggleTheme
                    ? toggleTheme === 'light'
                      ? 'light'
                      : 'dark'
                    : 'light'
                }`}
                style={{ padding: '5px' }}
              >
                <div className="container">
                  <Link to="/" className="ml-3">
                    <i className="fa fa-home" aria-hidden="true"></i>
                  </Link>

                  <Link to="/explore" className="ml-3">
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                  </Link>
                  <div onClick={() => dispatch(toggleUploader())}>
                    <i className="fa fa-plus-square" aria-hidden="true"></i>
                  </div>
                  <Link to="/" className="ml-3">
                    <i className="fa fa-heart-o" aria-hidden="true"></i>
                  </Link>
                  <Link to={`/${dummyUrl ? dummyUrl.username : null}`}>
                    <img
                      src={imgSrc ? mainUrl : userAvatar}
                      alt="avatar"
                      className="headerContainer--avatar"
                    />
                  </Link>
                </div>
              </Navbar>
            </div>
          </div>
        );
      case 'bigger':
        return (
          <div className="headerContainer overall">
            <Navbar
              bg={`${
                toggleTheme
                  ? toggleTheme === 'light'
                    ? 'light'
                    : 'dark'
                  : 'light'
              }`}
            >
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
                    className="search-box overall"
                  />
                  <Search searchValue={searchValue} />
                </Form>
                <Nav className="ml-auto">
                  <Link to="/" className="ml-3">
                    <i className="fa fa-home" aria-hidden="true"></i>
                  </Link>
                  <Link to="/direct/inbox" className="ml-3">
                    <i
                      className="fa fa-paper-plane-o fa-2x"
                      aria-hidden="true"
                    ></i>
                  </Link>
                  <Link to="/explore" className="ml-3">
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                  </Link>
                  <Link to="/" className="ml-3">
                    <i className="fa fa-heart-o" aria-hidden="true"></i>
                  </Link>
                  <div
                    className="ml-3"
                    onClick={(event) => dispatch(toggleDropdown())}
                  >
                    <img
                      src={imgSrc ? mainUrl : userAvatar}
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
    }
  };

  return (
    <>{windowWidth > 640 ? renderView('bigger') : renderView('smaller')}</>
  );
};

export default Header;
