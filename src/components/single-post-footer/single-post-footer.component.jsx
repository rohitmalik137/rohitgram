import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import './single-post-footer.styles.scss';
import {
  likeToggle,
  allPosts,
  addComment,
  singlePost,
} from '../../redux/actions/post.actions';
import { Modal } from 'react-bootstrap';

const SinglePostFooter = ({ post, sidebar }) => {
  const history = useHistory();
  const [comment, setComment] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const postId = post._id;
  const user = useSelector((state) => state.auth.user);
  const username = user ? user.username : null;

  const likeToggleFunc = () => {
    dispatch(likeToggle({ postId }));
    dispatch(allPosts());
  };

  const postComment = (e) => {
    e.preventDefault();
    dispatch(addComment({ comment, postId }));
    dispatch(singlePost({ postId }));
    setComment('');
  };

  return (
    <>
      <div
        className={`${sidebar ? 'sidebar' : null} SinglePostFooterContainer `}
      >
        <div className="SinglePostFooterContainer--header">
          {post.likes &&
          post.likes.length > 0 &&
          post.likes.includes(username) ? (
            <i
              onClick={likeToggleFunc}
              style={{ color: 'red' }}
              className="fa fa-heart fa-2x SinglePostFooterContainer--icon"
              aria-hidden="true"
            ></i>
          ) : (
            <i
              onClick={likeToggleFunc}
              style={{ color: 'red' }}
              className="fa fa-heart-o fa-2x SinglePostFooterContainer--icon"
              aria-hidden="true"
            ></i>
          )}
          <i
            onClick={() => history.push(`/p/${post._id}`)}
            className="fa fa-comment-o fa-2x SinglePostFooterContainer--icon"
            aria-hidden="true"
          ></i>
          <i
            className="fa fa-paper-plane-o fa-2x SinglePostFooterContainer--icon"
            aria-hidden="true"
          ></i>
          <i
            className="fa fa-bookmark-o fa-2x SinglePostFooterContainer--icon"
            aria-hidden="true"
          ></i>
          <div>
            {post.likes.length ? (
              post.likes.length === 1 ? (
                <strong onClick={handleShow} style={{ cursor: 'pointer' }}>
                  1 Like
                </strong>
              ) : (
                <span>
                  Liked by &nbsp;
                  <Link to={`/${post.likes[0]}`} style={{ color: 'black' }}>
                    <strong style={{ cursor: 'pointer' }}>
                      {post.likes[0]}
                    </strong>
                  </Link>
                  &nbsp; and &nbsp;
                  <strong onClick={handleShow} style={{ cursor: 'pointer' }}>
                    {post.likes.length - 1} others
                  </strong>
                </span>
              )
            ) : null}
          </div>
          <div>
            <strong>
              <Link to={`/${post.userId.username}`}>
                {post.userId.username}
              </Link>
            </strong>
            &nbsp;
            <span>{post.caption}</span>
          </div>
          <div>
            <Link to={`/p/${post._id}`}>View all comments</Link>
          </div>
          <div style={{ fontSize: 'small' }}>
            {(new Date().getTime() - new Date(post.createdAt).getTime()) /
              1000 <
            60 ? (
              <span>
                {Math.floor(
                  (new Date().getTime() - new Date(post.createdAt).getTime()) /
                    1000
                )}{' '}
                seconds ago
              </span>
            ) : (new Date().getTime() - new Date(post.createdAt).getTime()) /
                1000 /
                60 <
              60 ? (
              <span>
                {Math.floor(
                  (new Date().getTime() - new Date(post.createdAt).getTime()) /
                    1000 /
                    60
                )}{' '}
                minutes ago
              </span>
            ) : (new Date().getTime() - new Date(post.createdAt).getTime()) /
                1000 /
                60 >
                60 &&
              (new Date().getTime() - new Date(post.createdAt).getTime()) /
                1000 /
                3600 <
                24 ? (
              <span>
                {Math.floor(
                  (new Date().getTime() - new Date(post.createdAt).getTime()) /
                    1000 /
                    3600
                )}{' '}
                hours ago
              </span>
            ) : (new Date().getTime() - new Date(post.createdAt).getTime()) /
                1000 /
                3600 >
              24 ? (
              <span>
                {Math.floor(
                  (new Date().getTime() - new Date(post.createdAt).getTime()) /
                    1000 /
                    3600 /
                    24
                )}{' '}
                days ago
              </span>
            ) : (new Date().getTime() - new Date(post.createdAt).getTime()) /
                1000 /
                3600 /
                24 >
              7 ? (
              <span>
                {Math.floor(
                  (new Date().getTime() - new Date(post.createdAt).getTime()) /
                    1000 /
                    3600 /
                    24 /
                    7
                )}{' '}
                w
              </span>
            ) : null}
          </div>
        </div>
        <div className="SinglePostFooterContainer--footer">
          <form onSubmit={postComment}>
            <input
              className="SinglePostFooterContainer--footer-input"
              type="text"
              placeholder="Add a comment..."
              onChange={(event) => setComment(event.target.value)}
              value={comment}
            />
            <input
              type="submit"
              className="SinglePostFooterContainer--footer-button"
              value="Post"
            />
          </form>
        </div>
      </div>
      <Modal show={show} centered size="sm" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Likes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {post.likes.map((user) => {
            return (
              <div
                style={{
                  marginBottom: '5px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Link
                  style={{ color: 'gray', marginRight: '10px' }}
                  to={`/${post.userId.username}`}
                  className="singleCommentContainer--avatarContainer"
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
                <Link style={{ color: 'gray' }} to={`/${post.userId.username}`}>
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

export default SinglePostFooter;
