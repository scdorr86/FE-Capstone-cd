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
          <div className="d-flex flex-wrap">
            <Link href={`/posts/edit/${postObj?.firebaseKey}`} passHref>
              <Button className="border-0 w-25 mx-sm-auto" variant="dark" size="sm" onClick={console.warn('this is the', postObj.firebaseKey)}>EDIT</Button>
            </Link>
            <Button className="m-2 w-25 mx-sm-auto text-black-75 btn-sm" variant="light" size="xs" onClick={deleteThisPost}>
              DELETE
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
