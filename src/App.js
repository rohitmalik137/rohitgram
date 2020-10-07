import React, { Fragment, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const isLoading = useSelector((state) => state.auth.isLoading);

  let routes;
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  isAuthenticated
    ? (routes = (
        <div className="App">
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
        </div>
      ))
    : (routes = (
        <div className="App">
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/accounts/signup" component={SignupPage} />
            <Redirect to="/" />
          </Switch>
        </div>
      ));

  return <Fragment>{routes}</Fragment>;
};

export default App;
