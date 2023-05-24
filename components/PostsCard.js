import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Link from 'next/link';
// import { deletePost } from '../api/postData';
import { useAuth } from '../utils/context/authContext';
import Buttons from './UserButtons';

function PostCard({ postObj, onUpdate, profileObj }) {
  // const [deleteBtn, setDeleteBtn] = useState(false);
  const { user } = useAuth();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const filteredProf = profileObj?.filter((index) => index?.uid === postObj?.uid);
    const prof = filteredProf.length === 0 ? {} : filteredProf[0];
    setProfile(prof);
  }, [postObj, user.uid]);

  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={profile?.avatar} alt={postObj?.title} style={{ height: '400px' }} />
        <Card.Body>
          <Card.Title style={{ color: 'red' }}>{postObj?.title}</Card.Title>
          <h5 className="card-text bold" style={{ color: 'red' }}>Profile: {profile?.username}</h5>
          <p className="card-text bold" style={{ color: 'red' }}>Text: {postObj?.postText}</p>
          <p className="card-text bold" style={{ color: 'red' }}>Date Posted: {postObj?.postDate}</p>
          <Buttons postObj={postObj} onUpdate={onUpdate} />
        </Card.Body>
      </Card>
    </>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    postDate: PropTypes.string,
    postText: PropTypes.string,
    title: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  profileObj: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  })).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
