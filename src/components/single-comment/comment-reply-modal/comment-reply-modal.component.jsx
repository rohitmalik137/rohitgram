import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { toggleCommentReplyBox } from '../../../redux/actions/toggle.actions';
import {
  replyComment,
  singlePost,
  fetchCommentReplies,
} from '../../../redux/actions/post.actions';
import './comment-reply-modal.styles.scss';

const CommentReplyModal = ({ replyTo, commentId, postId }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const postComment = (e) => {
    e.preventDefault();
    console.log(comment);
    dispatch(
      replyComment({
        comment,
        replyTo_commentId: commentId,
        repliedTo: replyTo,
      })
    );
    dispatch(toggleCommentReplyBox());
    // dispatch(singlePost({ postId }));
    dispatch(fetchCommentReplies({ parentCommentId: commentId }));
  };

  return (
    <div className="commentReplyContainer">
      <form onSubmit={postComment} style={{ display: 'flex' }}>
        <textarea
          className="commentReplyContainer-input"
          type="text"
          placeholder={`Reply to ${replyTo}...`}
          onChange={(event) => setComment(event.target.value)}
          value={comment}
        />
        <input
          type="submit"
          className="commentReplyContainer-button submit"
          value="Post"
        />
        <button
          className="commentReplyContainer-button cancel"
          onClick={() => dispatch(toggleCommentReplyBox())}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CommentReplyModal;
