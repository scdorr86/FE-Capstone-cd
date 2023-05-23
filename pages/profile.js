import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH

import { getAllComments } from '../api/commentData';
import { getAllPosts } from '../api/postData';
import { getAllProfiles, getSingleProfile } from '../api/profileData';

function Profile() {
  const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH

  console.warn('these are the gets', getAllComments(), getAllPosts(), getAllProfiles(), getSingleProfile());

  return (
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
    </div>
  );
}

export default Profile;
