import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import SinglePost from '../single-post/single-post.component';
import './posts.styles.scss';

const Posts = () => {
  const userPosts = useSelector((state) => state.user.userPosts);

  const allPosts = userPosts ? userPosts.userPosts : null;
  // console.log(allPosts);
  return (
    <div className="postsContainer">
      {allPosts
        ? allPosts.map((post) => {
            return (
              <Link
                to={`/p/${post._id}`}
                key={post._id}
                className="postsContainer--card"
              >
                <SinglePost post={post} key={post._id} />
              </Link>
            );
          })
        : null}
    </div>
  );
};

export default Posts;
