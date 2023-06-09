// import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPersonCircleQuestion, faUserMinus, faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import useFirebaseProfile from '../utils/hooks/useFirebaseProfile';

const AttendBtn = ({ postObj, updatePostHandler }) => {
  const theProfile = useFirebaseProfile();

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
    if (!Object.hasOwn(updatedPost, 'NotAttendingNames')) {
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

  // console.log('what is post obj', postObj);

  return (
    <>
      <div className="d-flex w-75 mx-auto mt-1">
        <p>RSVP:</p>
        <div>
          <button className="bg-transparent border-0 me-1 pe-1" type="button" onClick={addAttend}><FontAwesomeIcon className="pe-2" icon={faUserPlus} />{postObj.attending ? postObj.attending : 0}</button>
        </div>
        <div>
          <button className="bg-transparent border-0 me-1 pe-1" type="button" onClick={addNot}><FontAwesomeIcon className="pe-2" icon={faUserMinus} />{postObj.notAttending ? postObj.notAttending : 0} </button>
        </div>
        <div>
          <button className="bg-transparent border-0 pe-1" type="button" onClick={addMaybe}><FontAwesomeIcon className="pe-2" icon={faPersonCircleQuestion} />{postObj.maybe ? postObj.maybe : 0}</button>
        </div>
      </div>
    </>
  );
};

export default AttendBtn;

AttendBtn.propTypes = {
  postObj: PropTypes.shape().isRequired,
  updatePostHandler: PropTypes.func,
  // onUpdate: PropTypes.func.isRequired,
};

AttendBtn.defaultProps = {
  updatePostHandler: null,
};

// <FontAwesomeIcon className="pe-2" icon={faUserCheck} />
