// import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import Button from 'react-bootstrap/Button';

export default function Comments({ commObj }) {
  //console.log('avatar', commObj, commObj?.avatar);

  return (
    <div className="d-flex flex-column mb-2">
      <div className="d-flex flex-row">
        <div><Image className="comment-avatar" src={commObj?.commentAvatar} alt="test" /></div>
        <div className="d-flex flex-column">
          <h6 className="comment-name by-author"><a href="http://creaticode.com/blog">{commObj?.userName}</a></h6>
          <div className="d-flex justify-content-between">
            <div>
            <FontAwesomeIcon className="pe-2" icon={faComment} />: {commObj?.commentText}
            </div>
            <div className="justify-content-end"><Button>Reply</Button></div>
          </div>
        </div>
      </div>

    </div>
  );
}

Comments.propTypes = {
  commObj: PropTypes.shape.isRequired,
};
