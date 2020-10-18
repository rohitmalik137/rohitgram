import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './home.styles.scss';
import Uploader from '../../components/uploader/uploader.component';
import Stories from '../../components/stories/stories.component';
import Suggested from '../../components/suggested/suggested.component';
import AllPosts from '../../components/all-posts/all-posts.component';
import { allPosts } from '../../redux/actions/post.actions';
import { loadUser } from '../../redux/actions/auth.actions';

const HomePage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(allPosts());
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

  // console.log(windowWidth);

  return (
    <>
      <div className="homePageContainer">
        <div className="homePage--posts">
          <Stories />
          <AllPosts />
        </div>
        {windowWidth > 1025 ? <Suggested /> : null}
      </div>
      <Uploader />
    </>
  );
};

export default HomePage;
