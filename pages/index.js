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
import FilterComponent from '../components/FilterComponent';

function Home({ searchInput, query, setQuery }) {
  const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH
  const theProfile = useFirebaseProfile();
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState();
  const [checkprof, setCheckprof] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState(posts);
  // console.warn('this is user id', user.uid);
  // console.warn('this is all profile list', profiles);
  // console.warn('this is posts', posts);
  // console.warn('this is the single prof', profile);
  // console.warn(checkprof);
  // console.warn('Hook result', theProfile);

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

  useEffect(() => {
    const filteredPosts = (posts?.filter((index) => (query === 'All' ? index : (

      index?.title.toLowerCase().includes(searchInput)
  || index?.sessionDay?.toLowerCase().includes(searchInput)
  || index?.sessionTime?.toLowerCase().includes(searchInput)
  || index?.username?.toLowerCase().includes(searchInput)
  || index?.title?.toLowerCase().includes(searchInput)
  || index?.postText?.toLowerCase().includes(searchInput)) && (
      index?.sessionDay?.includes(query)
 || index?.sessionTime?.includes(query))
    )));
    console.log('the query', query);
    console.log('the posts', posts);
    console.log('filtered posts', filteredPosts);
    setSearchedPosts(filteredPosts);
  }, [query, posts, searchInput]);
  // || index?.NotAttendingNames?.includes(searchInput)
  // || index?.attendingNames?.().includes(searchInput)
  // || index?.maybeNames?.().includes(searchInput)
  // || index?.sessionDay?.includes(query)
  // || index?.sessionTime?.includes(query)

  // console.warn('these are the gets', getAllComments(), getAllPosts(), getAllProfiles());

  return (
    <>
      {
      theProfile !== null ? (
        <>
          <title>Cameron Dorris</title>
          <div className="d-flex">
            <PostForm onUpdate={getPosts} />
            <FilterComponent getPosts={getPosts} setQuery={setQuery} />
          </div>
          <div className="d-flex flex-wrap">
            {/* map over posts using Card component */}
            {searchedPosts?.map((item) => (
              <PostCard key={item?.firebaseKey} profileObj={profiles} postObj={item} onUpdate={getPosts} />
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
  query: PropTypes.string,
  setQuery: PropTypes.func,
};

Home.defaultProps = {
  searchInput: '',
  query: '',
  setQuery: () => {},
};
