import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FloatingLabel } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
// import { createProfile, updateProfile } from '../../api/profileData';
import { createPost, updatePost } from '../../api/postData';

const initialState = {
  title: '',
  dateOfPost: '',
  postText: '',
  sessionDay: '',
  sessionTime: '',
};
export default function PostForm({ obj, onUpdate }) {
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleClose = () => {
    setShow(false);
    router.push('/');
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log('select value', value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePost(formInput).then(() => {
        onUpdate();
        handleClose();
      });
    } else {
      const payload = { ...formInput, uid: user.uid, dateOfPost: new Date(Date.now()) };
      createPost(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePost(patchPayload).then(() => {
          router.push('/');
          onUpdate();
          setShow(false);
          setFormInput(initialState);
        });
      });
    }
  };

  return (
    <>
      <Button
        variant="primary"
        className="modalForm"
        onClick={handleShow}
      >
        {obj.firebaseKey ? 'Update Post' : 'Create Post'}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{obj.firebaseKey ? 'Update' : 'Create'} Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Post Title  */}
            <FloatingLabel controlId="floatingInput1" label="Post Title" className="mb-3" style={{ color: 'red' }}>
              <Form.Control
                type="text"
                placeholder="Enter Session Title"
                name="title"
                value={formInput.title}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            {/* Session Day Select  */}
            <FloatingLabel controlId="floatingInput1" label="Session Day" className="mb-3" style={{ color: 'red' }}>
              <Form.Select
                type="text"
                placeholder="Enter Session Day"
                name="sessionDay"
                value={formInput.sessionDay}
                onChange={handleChange}
                required
              >
                <option>Game Session Day</option>
                <option value="Sunday" style={{ color: 'black' }}>Sunday</option>
                <option value="Monday" style={{ color: 'black' }}>Monday</option>
                <option value="Tuesday" style={{ color: 'black' }}>Tuesday</option>
                <option value="Wednesday" style={{ color: 'black' }}>Wednesay</option>
                <option value="Thursday" style={{ color: 'black' }}>Thursday</option>
                <option value="Friday" style={{ color: 'black' }}>Friday</option>
                <option value="Saturday" style={{ color: 'black' }}>Saturday</option>
              </Form.Select>
            </FloatingLabel>

            {/* Session Time Select  */}
            <FloatingLabel controlId="floatingInput1" label="Session Time" className="mb-3" style={{ color: 'red' }}>
              <Form.Select
                type="text"
                placeholder="Enter Session Time (All times in CST)"
                name="sessionTime"
                value={formInput.sessionTime}
                onChange={handleChange}
                required
              >
                <option>Game Session Time</option>
                <option value="Morning (AMs before Noon)" style={{ color: 'black' }}>Morning (AMs before Noon)</option>
                <option value="Afternoon (Noon - 5pm)" style={{ color: 'black' }}>Afternoons (Noon - 5pm)</option>
                <option value="Evening (5pm - 9pm)" style={{ color: 'black' }}>Evening (5pm - 9pm)</option>
                <option value="Night (9pm - Midnight)" style={{ color: 'black' }}>Night (9pm - Midnight)</option>
                <option value="Varies" style={{ color: 'black' }}>Varies</option>
              </Form.Select>
            </FloatingLabel>

            {/* Post Text  */}
            <FloatingLabel controlId="floatingInput3" label="Game Session Description" className="mb-3" style={{ color: 'red' }}>
              <Form.Control
                type="text"
                placeholder="Game Session Details"
                name="postText"
                value={formInput.postText}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            <Button type="submit">{obj.firebaseKey ? 'Update' : 'Submit'}</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    postText: PropTypes.string,
    uid: PropTypes.string,
    sessionDay: PropTypes.string,
    sessionTime: PropTypes.string,
    dateOfPost: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};

PostForm.defaultProps = {
  obj: initialState,
  onUpdate: null,
};
