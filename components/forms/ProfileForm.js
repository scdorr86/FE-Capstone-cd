import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FloatingLabel } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createProfile, updateProfile } from '../../api/profileData';

const initialState = {
  avatar: '',
  games: '',
  consoles: '',
  username: '',
  availability: '',
};
export default function ProfileForm({ obj, onUpdate }) {
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
      updateProfile(formInput).then(() => {
        onUpdate();
        handleClose();
      });
    } else {
      const payload = { ...formInput, uid: user.uid };
      createProfile(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateProfile(patchPayload).then(() => {
          router.push('/profile');
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
        {obj.firebaseKey ? 'Update Profile' : 'Create Profile'}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{obj.firebaseKey ? 'Update' : 'Create'} Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Profile Username  */}
            <FloatingLabel controlId="floatingInput1" label="Username" className="mb-3" style={{ color: 'red' }}>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                value={formInput.username}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            {/* Profile Availability  */}
            <FloatingLabel controlId="floatingInput3" label="Availability" className="mb-3" style={{ color: 'red' }}>
              <Form.Control
                type="text"
                placeholder="General Availability"
                name="availability"
                value={formInput.availablity}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            {/* Games */}
            <FloatingLabel controlId="floatingInput3" label="Current Games" className="mb-3" style={{ color: 'red' }}>
              <Form.Control
                type="text"
                placeholder="Current Games"
                name="games"
                value={formInput.video_id}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            {/* Consoles */}
            <FloatingLabel controlId="floatingInput3" label="Current Consoles" className="mb-3" style={{ color: 'red' }}>
              <Form.Control
                type="text"
                placeholder="Current Consoles"
                name="consoles"
                value={formInput.consoles}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            {/* avatar */}
            <FloatingLabel controlId="floatingInput3" label="Avatar Image" className="mb-3" style={{ color: 'red' }}>
              <Form.Control
                type="text"
                placeholder="User Avatar or Profile Image"
                name="avatar"
                value={formInput.avatar}
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

ProfileForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    video_id: PropTypes.string,
    category: PropTypes.string,
    thumbnail: PropTypes.string,
    firebaseKey: PropTypes.string,
    user_photo: PropTypes.string,
    userName: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};

ProfileForm.defaultProps = {
  obj: initialState,
  onUpdate: null,
};
