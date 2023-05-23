// import { Button } from 'react-bootstrap'; // TODO: COMMENT IN FOR AUTH
import { useEffect, useState } from 'react';
// import { signOut } from '../utils/auth'; // TODO: COMMENT IN FOR AUTH
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH

import { getAllComments } from '../api/commentData';
import { getAllPosts } from '../api/postData';
import { getAllProfiles, getSingleProfile } from '../api/profileData';
import ProfileForm from '../components/forms/ProfileForm';
import PostCard from '../components/PostsCard';

function Home() {
  const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const [checkprof, setCheckprof] = useState([]);
  console.warn('this is user id', user.uid);
  console.warn('this is all profile list', profiles);
  console.warn('this is posts', posts);
  console.warn('this is the single prof', profile);
  console.warn(checkprof);

  const getProfiles = () => {
    getAllProfiles().then(setProfiles);
  };

  const getUserProfile = () => {
    getSingleProfile(user.uid).then(setProfile);
  };

  const getPosts = () => {
    getAllPosts().then(setPosts);
  };

  useEffect(() => {
    getProfiles();
  }, []);

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    const profileCheck = profiles.filter((index) => index.uid === user.uid);
    setCheckprof(profileCheck);
  }, [profiles, user.uid]);

  // const user = { displayName: 'Dr. T' }; // TODO: COMMENT OUT FOR AUTH
  console.warn('these are the gets', getAllComments(), getAllPosts(), getAllProfiles());

  return (
    <>
      {
      profiles.filter((index) => (index.uid === user.uid ? (
        <div key={index.uid}>
          this will be the landing of posts!
          {/* map over posts using Card component */}
          { posts.map((post) => (
            <PostCard key={post.firebaseKey} profileObj={profiles} postObj={post} onUpdate={getPosts} />
          ))}
        </div>
      )
        : (
          <>
            <div>
              <ProfileForm />
            </div>
            <div
              className="text-center d-flex flex-column justify-content-center align-content-center"
              style={{
                height: '90vh',
                padding: '30px',
                maxWidth: '400px',
                margin: '0 auto',
              }}
            >
              <h1>Hello {user.displayName}! </h1>

            </div>
          </>
        )))
    }
    </>
  );
}

export default Home;
