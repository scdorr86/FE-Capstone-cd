import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
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
        className="d-flex flex-column bg-white text-center"
        style={{
          height: '60vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '10px',
          borderRadius: '25%',
        }}
      >
        <Image src={profile?.avatar} alt="avatar" style={{ height: '250px', borderRadius: '25%' }} />
        <p>{profile?.username}</p>
        <ProfileForm obj={theProfile} onUpdate={getProfile} />
      </div>

      <div className="bg-white">
        <div className="d-flex flex-wrap bg-gray">
          {/* map over posts using Card component */}
          {userPosts.map((post) => (
            <PostCard key={post?.firebaseKey} profileObj={userProfile} postObj={post} onUpdate={getPosts} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Profile;
