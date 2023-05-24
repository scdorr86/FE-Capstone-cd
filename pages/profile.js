import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import { getAllPosts } from '../api/postData';
import useFirebaseProfile from '../utils/hooks/useFirebaseProfile';
import PostCard from '../components/PostsCard';

function Profile() {
  const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH
  const theProfile = useFirebaseProfile();
  const [posts, setPosts] = useState([]);
  const userProfile = [theProfile];

  console.warn('the profile', theProfile, userProfile);

  const getPosts = () => {
    getAllPosts().then(setPosts);
  };

  const userPosts = posts.filter((index) => index?.uid === user.uid);

  useEffect(() => {
    getPosts();
  }, []);

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
        <img src={userProfile[0]?.avatar} alt="avatar" />
        <p>{userProfile[0]?.username}</p>
      </div>

      <div>
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
