// import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useFirebaseProfile from '../utils/hooks/useFirebaseProfile';
// import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from 'fortawesome/react-fontawesome';

const AttendBtn = ({ postObj, updatePostHandler }) => {
  const theProfile = useFirebaseProfile();
  console.log('this is attendingNames', postObj);

  const addAttend = () => {
    const updatedPost = { ...postObj, attending: postObj?.attending + 1 };
    if (!Object.hasOwn(updatedPost, 'attendingNames')) {
      updatedPost.attendingNames = [theProfile?.username];
    } else {
      updatedPost.attendingNames = [...updatedPost.attendingNames, theProfile?.username];
    }
    updatePostHandler(updatedPost);
  };

  const addNot = () => {
    const updatedPost = { ...postObj, notAttending: postObj.notAttending + 1 };
    if (!Object.hasOwn(updatedPost, 'notAttendingNames')) {
      updatedPost.NotAttendingNames = [theProfile?.username];
    } else {
      updatedPost.NotAttendingNames = [...updatedPost.NotAttendingNames, theProfile?.username];
    }
    updatePostHandler(updatedPost);
  };

  const addMaybe = () => {
    const updatedPost = { ...postObj, maybe: postObj.maybe + 1 };
    if (!Object.hasOwn(updatedPost, 'maybeNames')) {
      updatedPost.maybeNames = [theProfile?.username];
    } else {
      updatedPost.maybeNames = [...updatedPost.maybeNames, theProfile?.username];
    }
    updatePostHandler(updatedPost);
  };
  return (
    <>
      <div className="rsvpBtns">
        <div>
          <button className="likesButton" type="button" onClick={addAttend}>Joining: {postObj.attending ? postObj.attending : 0}</button>
        </div>
        <div>
          <button className="likesButton" type="button" onClick={addNot}>Not Joining: {postObj.notAttending ? postObj.notAttending : 0} </button>
        </div>
        <div>
          <button className="likesButton" type="button" onClick={addMaybe}>Maybe: {postObj.maybe ? postObj.maybe : 0}</button>
        </div>
      </div>
    </>
  );
};

export default AttendBtn;

AttendBtn.propTypes = {
  postObj: PropTypes.shape.isRequired,
  updatePostHandler: PropTypes.func,
  // onUpdate: PropTypes.func.isRequired,
};

AttendBtn.defaultProps = {
  updatePostHandler: null,
};

// <FontAwesomeIcon className="pe-2" icon={faUserCheck} />
