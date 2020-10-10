import React, { Fragment } from 'react';

import './comments.styles.scss';
import SingleComment from '../single-comment/single-comment.component';
import { toggleCommentReplies } from '../../redux/actions/toggle.actions';
import { fetchCommentReplies } from '../../redux/actions/post.actions';
import { useDispatch, useSelector } from 'react-redux';

const Comments = ({ comments }) => {
  const dispatch = useDispatch();
  const toggleReplies = useSelector(
    (state) => state.toggle.toggleCommentReplies
  );
  const toggleRepliesId = useSelector(
    (state) => state.toggle.toggleCommentRepliesId
  );

  const replies = useSelector((state) => state.post.commentReplies);

  return (
    <div className="commentsContainer">
      {comments && comments.length ? (
        comments.map((comment) => {
          return (
            <Fragment key={comment._id}>
              <SingleComment comment={comment} key={comment._id} />
              <div
                className="commentsHideNShow"
                onClick={() => {
                  dispatch(
                    fetchCommentReplies({ parentCommentId: comment._id })
                  );
                  dispatch(toggleCommentReplies(comment._id));
                }}
              >
                {' '}
                {
                  // replies ? (
                  //   replies.length > 0 ? (
                  toggleReplies && toggleRepliesId === comment._id ? (
                    <span>&mdash; Hide replies</span>
                  ) : (
                    <span>&mdash; View replies</span>
                  )
                  //   ) : null
                  // ) : null
                }
              </div>
              {toggleReplies && toggleRepliesId === comment._id ? (
                replies ? (
                  replies.length > 0 ? (
                    replies
                      .filter((reply) => reply.userId !== undefined)
                      .map((subcomment) => {
                        return (
                          <>
                            <SingleComment
                              replied="true"
                              comment={subcomment}
                              parentId={comment._id}
                              key={subcomment._id}
                            />
                          </>
                        );
                      })
                  ) : (
                    <span className="commentsHideNShow">
                      No comment replied!!
                    </span>
                  )
                ) : (
                  <span>Loading...</span>
                )
              ) : null}
            </Fragment>
          );
        })
      ) : (
        <div className="nocomments">No comments Yet!</div>
      )}
    </div>
  );
};

export default Comments;
