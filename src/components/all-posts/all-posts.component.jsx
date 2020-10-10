import React from 'react';
import { useSelector } from 'react-redux';

import './all-posts.styles.scss';
import SinglePost from '../single-post/single-post.component';
import SinglePostHeader from '../single-post-header/single-post-header.component';
import SinglePostFooter from '../single-post-footer/single-post-footer.component';

const AllPosts = () => {
  const posts = useSelector((state) => state.post.allPosts);
  const user = useSelector((state) => state.auth.user);

  const filtered =
    posts &&
    posts
      .filter(
        (data) =>
          user.following.includes(data.userId.username) ||
          data.userId.username === user.username
      )
      .filter((data) => !data.likes.includes(user.username));

  console.log(filtered);

  // console.log(posts);

  return (
    <div className="allPostsContainer">
      {posts ? (
        filtered.length > 0 ? (
          filtered.map((post) => {
            return (
              <div className="allPostsContainer--singlepost" key={post._id}>
                <SinglePostHeader
                  profileUrl={post.userId.profileUrl}
                  username={post.userId.username}
                />
                <SinglePost mediaUrl={post.mediaUrl} />
                <SinglePostFooter post={post} key={post._id} />
              </div>
            );
          })
        ) : (
          <div className="blankMsg">
            No more posts! Follow other users to see their latest posts here!
          </div>
        )
      ) : null}
    </div>
  );
};

export default AllPosts;
