import React from 'react';
import { useSelector } from 'react-redux';

import SinglePost from '../../components/single-post/single-post.component';
import './single-post.styles.scss';

const SinglePostPage = ({ match }) => {
  const userPosts = useSelector((state) => state.user.userPosts);

  const allPosts = userPosts ? userPosts.userPosts : null;

  return (
    <div className="singlePostPageContainer">
      <div className="singlePostPageContainer--left">
        {allPosts
          ? allPosts
              .filter((post) => post._id === match.params.postId)
              .map((post) => {
                return <SinglePost post={post} key={post._id} />;
              })
          : null}
      </div>
      <div className="singlePostPageContainer--right">
        <div className="singlePostPage--header">
          <div className="singlePostPage--header--left">
            <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
