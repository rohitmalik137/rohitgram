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

const App = () => {
  // const [isAUth, setIsAUth] = useState(window.localStorage.getItem('token'));
  // console.log(isAUth);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const isLoading = useSelector((state) => state.auth.isLoading);

  const toggleTheme = useSelector((state) => state.toggle.toggleTheme);

  let routes;
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  isAuthenticated
    ? (routes = (
        <Router className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/direct/inbox" component={InboxPage} />
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
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/accounts/signup" component={SignupPage} />
            <Redirect to="/" />
          </Switch>
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
