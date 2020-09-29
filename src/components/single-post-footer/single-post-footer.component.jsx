import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './single-post-footer.styles.scss';
import { likeToggle, allPosts } from '../../redux/actions/post.actions';

const SinglePostFooter = ({ post, sidebar }) => {
  const dispatch = useDispatch();
  const postId = post._id;
  const user = useSelector((state) => state.auth.user);
  const username = user ? user.username : null;
  // const singlepost = useSelector((state) => state.post.singlePost);
  // const likes = singlepost ? singlepost.likes : [];

  const likeToggleFunc = () => {
    dispatch(likeToggle({ postId }));
    dispatch(allPosts());
  };

  return (
    <div className={`${sidebar ? 'sidebar' : null} SinglePostFooterContainer `}>
      {post.likes && post.likes.length > 0 && post.likes.includes(username) ? (
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
        <strong>{post.likes.length} likes</strong>
      </div>
      <div>
        <strong>
          <Link to={`/${post.userId.username}`}>{post.userId.username}</Link>
        </strong>
        &nbsp;
        <span>{post.caption}</span>
      </div>
      <div>
        <Link to={`/p/${post._id}`}>View all comments</Link>
      </div>
      <div>{post.createdAt}</div>
    </div>
  );
};

export default SinglePostFooter;
