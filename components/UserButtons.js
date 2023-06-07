// import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
// import { useAuth } from '../utils/context/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useFirebaseProfile from '../utils/hooks/useFirebaseProfile';
import { deletePostCommentRelationship } from '../api/postData';
import { faPencil, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function Buttons({ postObj, onUpdate }) {
  // const { user } = useAuth();
  const theProfile = useFirebaseProfile();
  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.title}?`)) {
      deletePostCommentRelationship(postObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      {
      theProfile?.uid === postObj.uid ? (

        <>
          <div className="d-flex flex-wrap justify-content-center">
            <Link href={`/posts/edit/${postObj?.firebaseKey}`} passHref>
              <Button className="h-10 border-0 d-flex mr-1" variant="dark" size="sm" onClick={console.warn('this is the', postObj.firebaseKey)}><FontAwesomeIcon className="pe-2 " icon={faPencil} />Edit</Button>
            </Link>
            <Button className="text-black-75 btn-sm h-10" variant="light" size="xs" onClick={deleteThisPost}>
              Delete<FontAwesomeIcon className="pe-2" icon={faTrashAlt} />
            </Button>
          </div>
        </>

      )
        : (
          <div />
        )
    }
    </>
  );
}

Buttons.propTypes = {
  postObj: PropTypes.shape({
    postDate: PropTypes.string,
    postText: PropTypes.string,
    title: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Buttons;
