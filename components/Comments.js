// import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import Button from 'react-bootstrap/Button';
import useFirebaseProfile from '../utils/hooks/useFirebaseProfile';
import { deleteComment } from '../api/commentData';

export default function Comments({ commObj, onUpdate }) {
  // console.log('avatar', commObj, commObj?.avatar);
  const theProfile = useFirebaseProfile();
  // const [comments, setComments] = useState();

  // useEffect(() => {
  //   getCommentsByPostId(commObj.postId).then(setComments);
  // }, [commObj.postId]);

  const deleteCmnt = () => {
    if (window.confirm('Delete Comment?')) {
      deleteComment(commObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div className="d-flex flex-column mb-2">
      <div className="d-flex flex-row">
        <div><Image className="comment-avatar" src={commObj?.commentAvatar} alt="test" /></div>
        <div className="d-flex flex-column">
          <h6 className="comment-name by-author mt-1"><a href="http://creaticode.com/blog">{commObj?.userName}</a></h6>
          <div className="d-flex justify-content-between">
            <div className='mt-1'>
              <FontAwesomeIcon className="pe-2" style={{ color: 'white' }} icon={faComment} /> <span className="cmtTxt">{commObj?.commentText}</span>
            </div>
            <div className="justify-content-end">
              {
                commObj?.profileID === theProfile?.firebaseKey ? (
                  <Button
                    className="bg-transparent btn-sm mx-2 border-0"
                    onClick={deleteCmnt}
                  ><FontAwesomeIcon style={{ color: 'orange' }} className="pe-2" icon={faTrashAlt} />
                  </Button>
                )
                  : (
                    <div />
                  )
            }
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

Comments.propTypes = {
  commObj: PropTypes.shape.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
