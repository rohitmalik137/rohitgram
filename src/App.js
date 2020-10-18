import React, { useState, Fragment, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import Header from './components/header/header.component';
import HomePage from './pages/home/home.component';
import InboxPage from './pages/inbox/inbox.component';
import ExplorePage from './pages/explore/explore.component';
import ProfilePage from './pages/profile/profile.component';
import LoginPage from './pages/login/login.component';
import SignupPage from './pages/signup/signup.component';
import EditPage from './pages/edit/edit.component';
import SinglePostPage from './pages/single-post/single-post.component';
import { loadUser } from './redux/actions/auth.actions';

import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './components/globalStyles';
import { lightTheme, darkTheme } from './components/Themes';
import { usersList } from './redux/actions/user.actions';
import Chat from './components/chat/chat.component';

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const toggleTheme = useSelector((state) => state.toggle.toggleTheme);

  let routes;
  useEffect(() => {
    dispatch(loadUser());
    dispatch(usersList());
    let isMounted = true;
    const updateDimensions = () => {
      let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
      if (isMounted) setWindowWidth(windowWidth);
    };
    window.addEventListener('resize', updateDimensions);
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  isAuthenticated
    ? (routes = (
        <Router className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/direct/inbox" component={InboxPage} />
            <Route
              exact
              path="/direct/:chatId"
              component={windowWidth > 640 ? InboxPage : Chat}
            />
            <Route exact path="/explore" component={ExplorePage} />
            <Route exact path="/:username" component={ProfilePage} />
            <Route exact path="/accounts/edit" component={EditPage} />
            <Route exact path="/p/:postId" component={SinglePostPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
      ))
    : (routes = (
        <Router className="App">
          <Header />
          <div className="notAuth">
            <Switch>
              <Route exact path="/" component={LoginPage} />
              <Route exact path="/:username" component={ProfilePage} />
              <Route exact path="/accounts/signup" component={SignupPage} />
              <Redirect to="/" />
            </Switch>
          </div>
        </Router>
      ));

  return (
    <ThemeProvider
      theme={
        toggleTheme
          ? toggleTheme === 'light'
            ? lightTheme
            : darkTheme
          : lightTheme
      }
    >
      <>
        <GlobalStyles />
        <Fragment>{routes}</Fragment>
      </>
    </ThemeProvider>
  );
};

export default App;
