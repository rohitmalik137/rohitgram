import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import SinglePost from '../single-post/single-post.component';
import './posts.styles.scss';

const Posts = () => {
  const userPosts = useSelector((state) => state.post.userPosts);

  const allPosts = userPosts ? userPosts.userPosts : null;
  return (
    <div className="postsContainer">
      {allPosts ? (
        allPosts.length > 0 ? (
          allPosts.map((post) => {
            return (
              <Link
                to={`/p/${post._id}`}
                key={post._id}
                className="postsContainer--card"
              >
                <SinglePost mediaUrl={post.mediaUrl} key={post._id} />
              </Link>
            );
          })
        ) : (
          <div className="noPosts">
            <h3>No Posts Yet!</h3>
          </div>
        )
      ) : null}
    </div>
  );
};

export default Posts;
