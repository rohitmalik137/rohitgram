import React from 'react';

import './single-post.styles.scss';

const SinglePost = ({ mediaUrl }) => {
  let domain = 'http://localhost:3000/';
  let mainUrl = domain + mediaUrl;
  return (
    <img src={mainUrl} alt="userPost" className="singlePostContainer--image" />
  );
};

export default SinglePost;
