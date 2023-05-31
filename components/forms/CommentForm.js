import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import useFirebaseProfile from '../../utils/hooks/useFirebaseProfile';
import Comments from '../Comments';
import { createComment, getCommentsByPostId, updateComment } from '../../api/commentData';

const initialState = {
  commentText: '',
};

export default function CommentForm({ postId, onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const [comments, setComments] = useState();
  const theProfile = useFirebaseProfile();

  useEffect(() => {
    getCommentsByPostId(postId).then(setComments);
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput, userName: theProfile.userName, commentDate: new Date(Date.now()), postId,
    };
    createComment(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateComment(patchPayload).then(() => {
        setFormInput(initialState);
      });
    });
    getCommentsByPostId(postId).then(setComments);
  };

  return (
    <>
      {user ? (
        <>
          <div className="d-flex flex-column" id="comment-conainer" style={{ width: '1400px' }}>
            <Form onSubmit={handleSubmit} className="d-flex">
              <div className="d-flex" style={{ width: '1069px' }}>
                <Card.Img src={theProfile?.avatar} style={{ width: '50px', borderRadius: '100px' }} className="me-3 d-flex flex-column" />
                <Form.Control
                  type="text"
                  placeholder="Add a comment..."
                  name="commentText"
                  value={formInput.comment}
                  onChange={handleChange}
                  className="d-flex"
                  required
                />
              </div>
              <div className="text-right m-2" style={{ textAlign: 'right' }}>
                <Button
                  type="submit"
                  className="border-dark bg-dark"
                  onClick={onUpdate}
                  style={{
                    borderRadius: '30px', height: '40px', fontWeight: '600', color: 'orange',
                  }}
                >Comment
                </Button>
              </div>
            </Form>
          </div>
          <div className="list-comments">
            {comments?.map((comment) => <Comments commObj={comment} videoId={comment.video_id} />)}
          </div>
        </>
      ) : (
        <div className="list-comments">
          {comments?.map((comment) => <Comments commObj={comment} videoId={comment.video_id} />)}
        </div>
      )}
    </>
  );
}

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
