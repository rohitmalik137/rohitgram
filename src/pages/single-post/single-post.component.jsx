import React from 'react';
import { useSelector } from 'react-redux';

import SinglePost from '../../components/single-post/single-post.component';
import SinglePostHeader from '../../components/single-post-header/single-post-header.component';
import Comments from '../../components/comments/comments.component';
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
        <SinglePostHeader />
        <div className="singlePostPageContainer--comments">
          <Comments />
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
