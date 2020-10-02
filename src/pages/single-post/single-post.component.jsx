import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SinglePost from '../../components/single-post/single-post.component';
import SinglePostHeader from '../../components/single-post-header/single-post-header.component';
import SinglePostFooter from '../../components/single-post-footer/single-post-footer.component';
import Comments from '../../components/comments/comments.component';
import './single-post.styles.scss';
import { singlePost } from '../../redux/actions/post.actions';

const SinglePostPage = ({ match }) => {
  const dispatch = useDispatch();
  const dummy = useSelector((state) => state.post.singlePost);
  const userpost = dummy ? dummy.data : null;
  const usercomments = dummy ? dummy.commentData : null;

  const postId = match.params.postId;

  useEffect(() => {
    dispatch(singlePost({ postId }));
  }, [dispatch, postId]);

  return (
    <>
      {userpost ? (
        <div className="singlePostPageContainer">
          <div className="singlePostPageContainer--left">
            <SinglePost mediaUrl={userpost.mediaUrl} key={userpost._id} />
          </div>
          <div className="singlePostPageContainer--right">
            <SinglePostHeader username={userpost.userId.username} />
            <Comments comments={usercomments} />
            <SinglePostFooter post={userpost} sidebar="true" />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SinglePostPage;
