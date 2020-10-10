import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import './single-comment.styles.scss';
import CommentReplyModal from './comment-reply-modal/comment-reply-modal.component';
import {
  commentLikeToggle,
  repliedCommentLikeToggle,
  singlePost,
} from '../../redux/actions/post.actions';
import { toggleCommentReplyBox } from '../../redux/actions/toggle.actions';

const SingleComment = ({ comment, replied, parentId }) => {
  const dispatch = useDispatch();
  const { postId } = useParams();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = useSelector((state) => state.auth.user);
  const username = user ? user.username : null;
  const toggleCOmmentReply = useSelector(
    (state) => state.toggle.toggleCOmmentReply
  );
  const toggleCOmmentReplyId = useSelector(
    (state) => state.toggle.toggleCOmmentReplyId
  );

  let domain = 'http://localhost:3000/';
  let mainUrl = domain + comment.userId.profileUrl;

  const toggleCommentLike = () => {
    console.log(comment._id);
    dispatch(commentLikeToggle({ commentId: comment._id, postId }));
    dispatch(singlePost({ postId }));
  };
  const toggleRepliedCommentLike = () => {
    dispatch(
      repliedCommentLikeToggle({
        commentId: comment._id,
        parentCommentId: parentId,
      })
    );
    // dispatch(fetchCommentReplies({ parentCommentId: parentId }));
  };
  return (
    <>
      <div className={`${replied ? 'replied ' : null} singleCommentContainer`}>
        <Link
          to={`/${comment.userId.username}`}
          className="singleCommentContainer--avatarContainer"
        >
          {comment.userId.profileUrl ? (
            <img
              src={mainUrl}
              className="singleCommentContainer--avatar"
              alt="avatar"
            />
          ) : (
            <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
          )}
        </Link>
        <div className="singleCommentContainer--commentInfo">
          <Link to={`/${comment.userId.username}`}>
            <strong className="singleCommentContainer--username">
              {comment.userId.username}
            </strong>
          </Link>
          <span className="singleCommentContainer--comment">
            {replied ? (
              <Link to={`/${comment.replyTo}`}>
                <span>@</span>
                {comment.repliedTo}{' '}
              </Link>
            ) : null}
            {comment.comment}
          </span>
          <div className="singleCommentContainer--likeNreply">
            <span className="likeNreply--option">
              {(new Date().getTime() - new Date(comment.createdAt).getTime()) /
                1000 <
              60 ? (
                <span>
                  {Math.floor(
                    (new Date().getTime() -
                      new Date(comment.createdAt).getTime()) /
                      1000
                  )}
                  {''}s
                </span>
              ) : (new Date().getTime() -
                  new Date(comment.createdAt).getTime()) /
                  1000 /
                  60 <
                60 ? (
                <span>
                  {Math.floor(
                    (new Date().getTime() -
                      new Date(comment.createdAt).getTime()) /
                      1000 /
                      60
                  )}
                  {''}m
                </span>
              ) : (new Date().getTime() -
                  new Date(comment.createdAt).getTime()) /
                  1000 /
                  60 >
                  60 &&
                (new Date().getTime() - new Date(comment.createdAt).getTime()) /
                  1000 /
                  3600 <
                  24 ? (
                <span>
                  {Math.floor(
                    (new Date().getTime() -
                      new Date(comment.createdAt).getTime()) /
                      1000 /
                      3600
                  )}
                  {''}h
                </span>
              ) : (new Date().getTime() -
                  new Date(comment.createdAt).getTime()) /
                  1000 /
                  3600 >
                24 ? (
                <span>
                  {Math.floor(
                    (new Date().getTime() -
                      new Date(comment.createdAt).getTime()) /
                      1000 /
                      3600 /
                      24
                  )}
                  {''}d
                </span>
              ) : (new Date().getTime() -
                  new Date(comment.createdAt).getTime()) /
                  1000 /
                  3600 /
                  24 >
                7 ? (
                <span>
                  {Math.floor(
                    (new Date().getTime() -
                      new Date(comment.createdAt).getTime()) /
                      1000 /
                      3600 /
                      24 /
                      7
                  )}
                  {''}w
                </span>
              ) : null}
            </span>
            {comment.likes.length ? (
              comment.likes.length === 1 ? (
                <span className="likeNreply--option" onClick={handleShow}>
                  1 Like
                </span>
              ) : (
                <span className="likeNreply--option" onClick={handleShow}>
                  {' '}
                  {comment.likes.length} Likes
                </span>
              )
            ) : null}
            <span className="likeNreply--option">
              <span
                onClick={() => {
                  console.log(comment._id);
                  dispatch(toggleCommentReplyBox(comment._id));
                }}
              >
                Reply
              </span>
              <span>
                {toggleCOmmentReply && toggleCOmmentReplyId === comment._id ? (
                  <CommentReplyModal
                    replyTo={comment.userId.username}
                    key={comment._id}
                    commentId={replied ? parentId : comment._id}
                    postId={comment.postId}
                  />
                ) : null}
              </span>
            </span>
          </div>
        </div>
        {comment.likes.includes(username) ? (
          <i
            style={{ color: 'red' }}
            onClick={replied ? toggleRepliedCommentLike : toggleCommentLike}
            className="fa fa-heart singleCommentLike"
            aria-hidden="true"
          ></i>
        ) : (
          <i
            onClick={replied ? toggleRepliedCommentLike : toggleCommentLike}
            className="fa fa-heart-o singleCommentLike"
            aria-hidden="true"
          ></i>
        )}
      </div>
      <Modal show={show} centered size="sm" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Likes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {comment.likes.map((user) => {
            return (
              <div
                style={{
                  marginBottom: '5px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Link
                  to={`/${comment.userId.username}`}
                  className="singleCommentContainer--avatarContainer"
                  style={{ marginRight: '10px', color: 'gray' }}
                >
                  {/* {comment.userId.profileUrl ? (
                    <img
                      src={mainUrl}
                      className="singleCommentContainer--avatar"
                      alt="avatar"
                    />
                  ) : ( */}
                  <i
                    className="fa fa-user-circle-o fa-2x"
                    aria-hidden="true"
                  ></i>
                  {/* )} */}
                </Link>
                <Link
                  to={`/${comment.userId.username}`}
                  style={{ marginRight: '10px', color: 'gray' }}
                >
                  <strong className="singleCommentContainer--username">
                    {user}
                  </strong>
                </Link>
              </div>
            );
          })}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SingleComment;
