import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
// import { useAuth } from '../utils/context/authContext';
// import useFirebaseProfile from '../utils/hooks/useFirebaseProfile';

function RsvpBtn({ postObj }) {
  // const theProfile = useFirebaseProfile();

  return (
    <>
      <div className="justify-content-center">
        <Link href={`/posts/rsvp/${postObj?.firebaseKey}`} passHref>
          <Button className="btn-sm mx-auto" variant="warning" size="sm">Session RSVP List</Button>
        </Link>
      </div>
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
