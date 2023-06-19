import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Form } from 'react-bootstrap';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../utils/context/authContext';
import useFirebaseProfile from '../../utils/hooks/useFirebaseProfile';
import Comments from '../Comments';
import { createComment, getCommentsByPostId, updateComment } from '../../api/commentData';
import { getAllProfiles } from '../../api/profileData';

const initialState = {
  commentText: '',
};

export default function CommentForm({ postId, onUpdate, comments }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const theProfile = useFirebaseProfile();
  const [profiles, setProfiles] = useState({});

  useEffect(() => {
    getCommentsByPostId(postId);
  }, [postId, comments]);

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
      ...formInput, userName: theProfile.username, commentDate: new Date(Date.now()), postId, profileID: theProfile.firebaseKey, commentAvatar: theProfile.avatar,
    };
    createComment(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateComment(patchPayload).then(() => {
        setFormInput(initialState);
        onUpdate();
      });
    });
  };

  const getProfiles = () => {
    getAllProfiles()?.then(setProfiles);
  };

  console.log('test', getProfiles);

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
                  style={{ color: 'orange' }}
                  placeholder="Add a comment..."
                  name="commentText"
                  value={formInput.commentText}
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
                >Comment <FontAwesomeIcon className="pe-2" icon={faComment} />
                </Button>
              </div>
            </Form>
          </div>
          <div className="list-comments">
            {comments?.map((comment) => <Comments commObj={comment} videoId={comment.video_id} onUpdate={onUpdate} />)}
          </div>
        </>
      ) : (
        <div className="list-comments">
          {comments?.map((comment) => <Comments commObj={comment} profileObj={profiles} onUpdate={onUpdate} />)}
        </div>
      )}
    </>
  );
}

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
