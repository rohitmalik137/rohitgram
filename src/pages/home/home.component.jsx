import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './home.styles.scss';
import Uploader from '../../components/uploader/uploader.component';
import Stories from '../../components/stories/stories.component';
// import Suggested from '../../components/suggested/suggested.component';
import AllPosts from '../../components/all-posts/all-posts.component';
import { allPosts } from '../../redux/actions/post.actions';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allPosts());
  }, [dispatch]);

  return (
    <>
      <div className="homePageContainer">
        <div>
          <Stories />
          <AllPosts />
        </div>
        {/* <Suggested /> */}
      </div>
      <Uploader />
    </>
  );
};

export default HomePage;
