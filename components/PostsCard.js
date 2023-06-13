import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Link from 'next/link';
// import { deletePost } from '../api/postData';
import { Image } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import Buttons from './UserButtons';
import { updatePost } from '../api/postData';
import AttendBtn from './IncrementButtons';
import RsvpBtn from './RsvpBtn';

function PostCard({ postObj, onUpdate, profileObj }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState({});
  const [updatedPost, setUpdatedPost] = useState(postObj);
  // console.log('what is post obj', postObj);
  const updatePostHandler = (postObjPayload) => {
    updatePost(postObjPayload)?.then((data) => setUpdatedPost(data));
  };

  useEffect(() => {
    const filteredProf = profileObj?.filter((index) => index?.uid === postObj?.uid);
    const prof = filteredProf.length === 0 ? {} : filteredProf[0];
    setProfile(prof);
  }, [postObj, user.uid]);

  return (
    <>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <Image height="150px" src={profile?.avatar} alt="avatar" />
            <h5 className="cardUsername">{profile?.username}</h5>
            <p>{profile?.gamertags}</p>
          </div>
          <div className="flip-card-back">
            <p className="cardTitle">{postObj?.title}</p>
            <p>Day of Week: {postObj?.sessionDay}</p>
            <p>Approximate Time: {postObj?.sessionTime}</p>
            <p>Details: {postObj?.postText}</p>
            <Buttons postObj={updatedPost} onUpdate={onUpdate} />
            <AttendBtn postObj={updatedPost} updatePostHandler={updatePostHandler} />
            <RsvpBtn postObj={updatedPost} />
          </div>
        </div>
      </div>

      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={profile?.avatar} alt={postObj?.title} style={{ height: '150px' }} />
        <Card.Body>
          <Card.Title style={{ color: 'red' }}>Game Session: {postObj?.title}</Card.Title>
          <h6 className="card-text bold" style={{ color: 'black' }}>Profile: {profile?.username}</h6>
          <p className="card-text bold" style={{ color: 'red' }}>Session Details: {postObj?.postText}</p>
          <p className="card-text bold" style={{ color: 'red' }}>Day of Session: {postObj?.sessionDay}</p>
          <p className="card-text bold" style={{ color: 'red' }}>Session Time: {postObj?.sessionTime}</p>
          <div className="mb-2">
            <Buttons postObj={updatedPost} onUpdate={onUpdate} />
          </div>
          <AttendBtn postObj={updatedPost} updatePostHandler={updatePostHandler} />
          <RsvpBtn postObj={updatedPost} />
        </Card.Body>
      </Card>
    </>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    postDate: PropTypes.string,
    postText: PropTypes.string,
    sessionDay: PropTypes.string,
    sessionTime: PropTypes.string,
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
