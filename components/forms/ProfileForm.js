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
  gamertags: '',
  generalAvailability: '',
  PreferredGameTimes: '',

};
export default function ProfileForm({ obj, onUpdate }) {
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj?.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleClose = () => {
    setShow(false);
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
    if (obj?.firebaseKey) {
      updateProfile(formInput).then(() => {
        router.push('/profile');
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
        className="modalForm bg-dark border-0 my-3 mx-0"
        onClick={handleShow}
        style={{ color: 'orange' }}
      >
        {obj?.firebaseKey ? 'Update Profile' : 'Create Profile'}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{obj?.firebaseKey ? 'Update' : 'Create'} Profile</Modal.Title>
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

            {/* Gamertags  */}
            <FloatingLabel controlId="floatingInput3" label="gamertags" className="mb-3" style={{ color: 'red' }}>
              <Form.Control
                type="text"
                placeholder="gamertags"
                name="gamertags"
                value={formInput.gamertags}
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

            {/* General Availability Select  */}
            <FloatingLabel controlId="floatingInput1" label="General Availability" className="mb-3" style={{ color: 'red' }}>
              <Form.Select
                type="text"
                placeholder="General Availability"
                name="generalAvailability"
                value={formInput.generalAvailability}
                onChange={handleChange}
                required
              >
                <option>General Availability</option>
                <option value="Weekdays" style={{ color: 'black' }}>Weekdays</option>
                <option value="Weeknights" style={{ color: 'black' }}>Weeknights</option>
                <option value="Weekends" style={{ color: 'black' }}>Weekends</option>
                <option value="All" style={{ color: 'black' }}>All</option>
                <option value="Varies" style={{ color: 'black' }}>Varies</option>
              </Form.Select>
            </FloatingLabel>

            {/* Preferred Times Select  */}
            <FloatingLabel controlId="floatingInput1" label="Preferred Session Times" className="mb-3" style={{ color: 'red' }}>
              <Form.Select
                type="text"
                placeholder="Preferred Session Times"
                name="PreferredGameTimes"
                value={formInput.PreferredGameTimes}
                onChange={handleChange}
                required
              >
                <option>General Availability</option>
                <option value="Mornings (AMs before Noon)" style={{ color: 'black' }}>Mornings (AMs before Noon) </option>
                <option value="Afternoons (Noon - 5pm)" style={{ color: 'black' }}>Afternoons (Noon - 5pm)</option>
                <option value="Evening (5pm - 9pm)" style={{ color: 'black' }}>Evening (5pm - 9pm)</option>
                <option value="Night (9pm - Midnight)" style={{ color: 'black' }}>Night (9pm - Midnight)</option>
                <option value="Varies" style={{ color: 'black' }}>Varies</option>
              </Form.Select>
            </FloatingLabel>

            <Button type="submit">{obj?.firebaseKey ? 'Update' : 'Submit'}</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </>
  );
}

ProfileForm.propTypes = {
  obj: PropTypes.shape({
    avatar: PropTypes.string,
    games: PropTypes.string,
    consoles: PropTypes.string,
    generalAvailability: PropTypes.string,
    gamertags: PropTypes.string,
    firebaseKey: PropTypes.string,
    PreferredGameTimes: PropTypes.string,
    username: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};

ProfileForm.defaultProps = {
  obj: initialState,
  onUpdate: null,
};
