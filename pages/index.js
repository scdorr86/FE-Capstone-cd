import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllProfiles, getSingleProfile } from '../api/profileData';
// import { getAllComments } from '../api/commentData';
import { getAllPosts } from '../api/postData';
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import useFirebaseProfile from '../utils/hooks/useFirebaseProfile';
import ProfileForm from '../components/forms/ProfileForm';
import PostCard from '../components/PostsCard';
import PostForm from '../components/forms/PostForm';

function Home({ searchInput }) {
  const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH
  const theProfile = useFirebaseProfile();
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const [checkprof, setCheckprof] = useState([]);
  console.warn('this is user id', user.uid);
  console.warn('this is all profile list', profiles);
  console.warn('this is posts', posts);
  console.warn('this is the single prof', profile);
  console.warn(checkprof);
  console.warn('Hook result', theProfile);

  const getProfiles = () => {
    getAllProfiles()?.then(setProfiles);
  };

  const getUserProfile = () => {
    getSingleProfile(user.uid)?.then(setProfile);
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
    const profileCheck = profiles?.filter((index) => index?.uid === user?.uid);
    setCheckprof(profileCheck);
  }, [profiles, user.uid]);

  const searchedPosts = posts?.filter((index) => index?.title.toLowerCase().includes(searchInput)
  || index?.sessionDay?.toLowerCase().includes(searchInput)
  || index?.sessionTime?.toLowerCase().includes(searchInput)
  || index?.postText?.toLowerCase().includes(searchInput));

  // || index?.NotAttendingNames?.includes(searchInput)
  // || index?.attendingNames?.toLowerCase().includes(searchInput)
  // || index?.maybeNames?.toLowerCase().includes(searchInput)

  // console.warn('these are the gets', getAllComments(), getAllPosts(), getAllProfiles());

  return (
    <>
      {
      theProfile !== null ? (
        <>
          <title>Cameron Dorris</title>

          <PostForm onUpdate={getPosts} />
          <div className="d-flex flex-wrap">
            {/* map over posts using Card component */}
            {searchedPosts?.map((post) => (
              <PostCard key={post?.firebaseKey} profileObj={profiles} postObj={post} onUpdate={getPosts} />
            ))}
          </div>
        </>
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
        )
    }
    </>
  );
}

export default Home;

Home.propTypes = {
  searchInput: PropTypes.string,
};

Home.defaultProps = {
  searchInput: '',
};
