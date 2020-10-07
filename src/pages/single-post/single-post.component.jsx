import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SinglePost from '../../components/single-post/single-post.component';
import SinglePostHeader from '../../components/single-post-header/single-post-header.component';
import SinglePostFooter from '../../components/single-post-footer/single-post-footer.component';
import Comments from '../../components/comments/comments.component';
import './single-post.styles.scss';
import { singlePost } from '../../redux/actions/post.actions';

const SinglePostPage = ({ match }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const dummy = useSelector((state) => state.post.singlePost);
  const userpost = dummy ? dummy.data : null;
  const usercomments = dummy ? dummy.commentData : null;

  const postId = match.params.postId;

  useEffect(() => {
    dispatch(singlePost({ postId }));
    const updateDimensions = () => {
      let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
      setWindowWidth(windowWidth);
    };
    window.addEventListener('resize', updateDimensions);
  }, [dispatch, postId]);

  const renderView = (args) => {
    switch (args) {
      case 'smaller':
      default:
        return (
          <div>
            {userpost ? (
              <div className="singlePostPage-mobileContainer">
                <div
                  className="allPostsContainer--singlepost"
                  key={userpost._id}
                >
                  <SinglePostHeader
                    profileUrl={userpost.userId.profileUrl}
                    username={userpost.userId.username}
                  />
                  <SinglePost mediaUrl={userpost.mediaUrl} key={userpost._id} />
                  <SinglePostFooter post={userpost} />
                </div>
              </div>
            ) : null}
          </div>
        );
      case 'bigger':
        return (
          <div className="">
            {userpost ? (
              <div className="singlePostPageContainer">
                <div className="singlePostPageContainer--left">
                  <SinglePost mediaUrl={userpost.mediaUrl} key={userpost._id} />
                </div>
                <div className="singlePostPageContainer--right">
                  <SinglePostHeader
                    username={userpost.userId.username}
                    profileUrl={userpost.userId.profileUrl}
                  />
                  <Comments comments={usercomments} />
                  <SinglePostFooter post={userpost} sidebar="true" />
                </div>
              </div>
            ) : null}
          </div>
        );
    }
  };

  return (
    <>{windowWidth > 735 ? renderView('bigger') : renderView('smaller')}</>
  );
};

export default SinglePostPage;
