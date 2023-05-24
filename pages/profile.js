import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import { getAllPosts } from '../api/postData';
import useFirebaseProfile from '../utils/hooks/useFirebaseProfile';
import PostCard from '../components/PostsCard';

function Profile() {
  const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH
  const theProfile = useFirebaseProfile();
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    getAllPosts().then(setPosts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  console.warn('the profile', theProfile);
  return (
    <>
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
        <p>Profile Page</p>
        {/* <p>{theProfile.avatar}</p>
        <p>{theProfile.username}</p> */}
      </div>

      <div>
        this will be the landing of posts!
        {/* map over posts using Card component */}
        {posts.map((post) => (
          <PostCard key={post?.firebaseKey} profileObj={theProfile} postObj={post} onUpdate={getPosts} />
        ))}
      </div>
    </>
  );
}

export default Profile;
