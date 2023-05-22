import { Button } from 'react-bootstrap'; // TODO: COMMENT IN FOR AUTH
import { signOut } from '../utils/auth'; // TODO: COMMENT IN FOR AUTH
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH

import { getAllComments } from '../api/commentData';
import { getAllPosts } from '../api/postData';
import { getAllProfiles } from '../api/profileData';

function Home() {
  const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH

  // const user = { displayName: 'Dr. T' }; // TODO: COMMENT OUT FOR AUTH
  console.warn('these are the gets', getAllComments(), getAllPosts(), getAllProfiles());
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
      <p>Click the button below to logout!</p>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
