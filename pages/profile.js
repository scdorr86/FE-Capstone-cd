import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import { getAllPosts } from '../api/postData';
import useFirebaseProfile from '../utils/hooks/useFirebaseProfile';
import PostCard from '../components/PostsCard';
import ProfileForm from '../components/forms/ProfileForm';
import { getSingleProfile } from '../api/profileData';

function Profile() {
  const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH
  const theProfile = useFirebaseProfile();
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState([]);
  const userProfile = [theProfile];

  console.warn('the profile', theProfile, userProfile);

  const getPosts = () => {
    getAllPosts().then(setPosts);
  };

  const getProfile = () => {
    getSingleProfile(theProfile?.firebaseKey).then(setProfile);
  };

  const userPosts = posts.filter((index) => index?.uid === user.uid);

  useEffect(() => {
    getPosts();
    getProfile();
  }, [profile]);

  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '75vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1>Hello {user.displayName}! </h1>
        <p>Profile Page</p>
        <img src={profile?.avatar} alt="avatar" />
        <p>{profile?.username}</p>
        <ProfileForm obj={theProfile} onUpdate={getProfile} />
      </div>

      <div className="d-flex flex-wrap">
        this will be the landing of posts!
        {/* map over posts using Card component */}
        {userPosts.map((post) => (
          <PostCard key={post?.firebaseKey} profileObj={userProfile} postObj={post} onUpdate={getPosts} />
        ))}
      </div>
    </>
  );
}

export default Profile;
