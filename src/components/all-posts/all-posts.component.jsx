import React from 'react';
import { useSelector } from 'react-redux';

import './all-posts.styles.scss';
import SinglePost from '../single-post/single-post.component';
import SinglePostHeader from '../single-post-header/single-post-header.component';
import SinglePostFooter from '../single-post-footer/single-post-footer.component';

const AllPosts = () => {
  const posts = useSelector((state) => state.post.allPosts);
  console.log(posts);

  return (
    <div className="allPostsContainer">
      {posts
        ? posts.map((post) => {
            return (
              <div className="allPostsContainer--singlepost" key={post._id}>
                <SinglePostHeader username={post.userId.username} />
                <SinglePost mediaUrl={post.mediaUrl} />
                <SinglePostFooter post={post} />
              </div>
            );
          })
        : null}
    </div>
  );
};

export default AllPosts;