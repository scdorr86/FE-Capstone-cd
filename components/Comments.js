import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

export default function Comments({ commObj }) {
  return (
    <div className="d-flex flex-column mb-2">
      <div className="d-flex flex-row">
        <div><Image className="comment-avatar" src={commObj?.user_photo} alt="" /></div>
        <div className="d-flex flex-column">
          <h6 className="comment-name by-author"><a href="http://creaticode.com/blog">{commObj?.userName}</a></h6>
          {commObj?.comment}
        </div>
      </div>

    </div>
  );
}

Comments.propTypes = {
  commObj: PropTypes.shape.isRequired,
};
