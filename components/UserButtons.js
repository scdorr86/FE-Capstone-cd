// import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
// import { useAuth } from '../utils/context/authContext';
import useFirebaseProfile from '../utils/hooks/useFirebaseProfile';
import { deletePost } from '../api/postData';

function Buttons({ postObj, onUpdate }) {
  // const { user } = useAuth();
  const theProfile = useFirebaseProfile();
  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.title}?`)) {
      deletePost(postObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      {
      theProfile?.uid === postObj.uid ? (

        <>
          <Link href={`/posts/edit/${postObj?.firebaseKey}`} passHref>
            <Button variant="info" onClick={console.warn('this is the', postObj.firebaseKey)}>EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisPost} className="m-2">
            DELETE
          </Button>
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
