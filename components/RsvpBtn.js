import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
// import { useAuth } from '../utils/context/authContext';
// import useFirebaseProfile from '../utils/hooks/useFirebaseProfile';

function RsvpBtn({ postObj }) {
  // const theProfile = useFirebaseProfile();

  return (
    <>
      <Link href={`/posts/rsvp/${postObj?.firebaseKey}`} passHref>
        <Button variant="outline-warning" size="sm" onClick={console.warn('this is the', postObj.firebaseKey)}>Session RSVP List</Button>
      </Link>
    </>
  );
}

RsvpBtn.propTypes = {
  postObj: PropTypes.shape({
    dateOfPost: PropTypes.string,
    postText: PropTypes.string,
    title: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
    attending: PropTypes.number,
    notAttending: PropTypes.number,
    maybe: PropTypes.number,
    sessionDay: PropTypes.string,
    sessionTime: PropTypes.string,
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};

export default RsvpBtn;
