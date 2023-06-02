import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
// import { getSingleProfile } from '../api/profileData';

export default function Comments({ commObj, profileObj }) {
  // const [profile, setProfile] = useState([]);

  // useEffect(() => {
  //   const filteredProf = profileObj?.filter((index) => index?.uid === commObj?.profileID);
  //   const prof = filteredProf.length === 0 ? {} : filteredProf[0];
  //   setProfile(prof);
  // }, [commObj, profileObj]);

  return (
    <div className="d-flex flex-column mb-2">
      <div className="d-flex flex-row">
        <div><Image className="comment-avatar" src={profileObj?.avatar} alt="" /></div>
        <div className="d-flex flex-column">
          <h6 className="comment-name by-author"><a href="http://creaticode.com/blog">User:{commObj?.userName}</a></h6>
          Comment:{commObj?.commentText}
        </div>
      </div>

    </div>
  );
}

Comments.propTypes = {
  commObj: PropTypes.shape.isRequired,
  profileObj: PropTypes.shape.isRequired,
};
