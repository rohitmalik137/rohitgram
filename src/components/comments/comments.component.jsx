import React from 'react';

import './comments.styles.scss';
import SingleComment from '../single-comment/single-comment.component';

const Comments = ({ comments }) => {
  return (
    <ul className="commentsContainer">
      {comments.length ? (
        comments.map((comment) => {
          return <SingleComment comment={comment} key={comment._id} />;
        })
      ) : (
        <div className="nocomments">No comments Yet!</div>
      )}
    </ul>
  );
};

export default Comments;
