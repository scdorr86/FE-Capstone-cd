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
  postDate: '',
  postText: '',
};
export default function PostForm({ obj }) {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePost(formInput).then(() => {
        // onUpdate();
        handleClose();
      });
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPost(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePost(patchPayload).then(() => {
          router.push('/');
          // onUpdate();
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
                placeholder="Enter Post Title"
                name="title"
                value={formInput.title}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            {/* Post Text  */}
            <FloatingLabel controlId="floatingInput3" label="Availability" className="mb-3" style={{ color: 'red' }}>
              <Form.Control
                type="text"
                placeholder="Post Text"
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
    postDate: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  // onUpdate: PropTypes.func,
};

PostForm.defaultProps = {
  obj: initialState,
  // onUpdate: null,
};
