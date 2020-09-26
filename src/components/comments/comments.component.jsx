import React from 'react';

import './comments.styles.scss';

const Comments = () => {
  return (
    <div className="commentsContainer">
      <div className="commentsContainer--comments">
        <h3>Comments Section!</h3>
      </div>
      <div className="commentsContainerFooter">
        <i className="fa fa-heart-o fa-2x" aria-hidden="true"></i>
        <i className="fa fa-comment-o fa-2x" aria-hidden="true"></i>
        <i className="fa fa-paper-plane-o fa-2x" aria-hidden="true"></i>
        <i className="fa fa-bookmark-o fa-2x" aria-hidden="true"></i>
      </div>
    </div>
  );
};

export default Comments;
