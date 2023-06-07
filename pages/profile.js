import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import { getAllPosts } from '../api/postData';
import useFirebaseProfile from '../utils/hooks/useFirebaseProfile';
import PostCard from '../components/PostsCard';
import ProfileForm from '../components/forms/ProfileForm';
import { getSingleProfile } from '../api/profileData';
import PostForm from '../components/forms/PostForm';

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

  const userPosts = posts?.filter((index) => index?.uid === user.uid);

  useEffect(() => {
    getPosts();
    getProfile();
  }, [profile]);

  return (
    <>
      <div className="topProfile">
        <div
          className="d-flex flex-column bg-white"
          style={{
            padding: '30px',
            width: '600px',
            margin: '10px',
            borderRadius: '10%',
            border: '1px orange solid',
            height: '415px',
          }}
        >
          <Image className="mb-2" src={profile?.avatar} alt="avatar" style={{ height: '200px', borderRadius: '25%', border: '1px black solid' }} />
          <p className="topUsername">UserName: {profile?.username}</p>
          <div className="profileBtns">
            <div className="col-4">
              <ProfileForm obj={theProfile} onUpdate={getProfile} />
            </div>
            <div className="col-4">
              <PostForm onUpdate={getPosts} />
            </div>
          </div>
        </div>
        <div className="topAbout">
          <div>
            <h6 className="profileAbout">About Me</h6>
            <li>My Availability:
              <ul>{profile?.generalAvailability}</ul>
            </li>
            <li>My Games:
              <ul>{profile?.games}</ul>
            </li>
            <li>My Consoles:
              <ul>{profile?.consoles}</ul>
            </li>
            <li>Preferred Game Times:
              <ul>{profile?.PreferredGameTimes}</ul>
            </li>
          </div>
          <div>
            <div className="profileAbout">Post Title List (ordered?)</div>
            <div>{userPosts?.map((post) => (
              <ul>{post?.title}</ul>
            ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bottomPosts">
        <h5 className="bottomPostHeader">My Posts:</h5>
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
