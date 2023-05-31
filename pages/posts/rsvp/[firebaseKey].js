import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getSinglePost } from '../../../api/postData';
import { getAllProfiles } from '../../../api/profileData';

export default function PostRsvp() {
  const [post, setPost] = useState({});
  const [profile, setProfile] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  // getSinglePost(firebaseKey).then((data) => setPost(data)).then(console.log('effect post', post));

  useEffect(() => {
    getSinglePost(firebaseKey)?.then((data) => setPost(data));
    getAllProfiles()?.then((data) => data?.filter((index) => index?.uid === post?.uid))?.then(setProfile);
  }, [firebaseKey]);

  // getAllProfiles().then((data) => console.log('this is the', data));
  // console.log('dynamic route', firebaseKey, router, post);
  // console.log('dynamic post', post);
  // console.log('get post', getSinglePost(firebaseKey));

  // console.log('table profile obj', profile);
  // console.log('post map', post?.attendingNames);

  return (
    <>
      <div>
        <img style={{ height: '150px' }} src={profile?.avatar} alt="avatar here" />
        <h2 style={{ color: 'red' }}>{post?.title}</h2>
      </div>
      <div className="tables">
        <Table striped>
          <thead>
            <tr>
              <th>Attending Session</th>
            </tr>
          </thead>
          <tbody>
            {post?.attendingNames?.map((index) => (
              <tr>
                <td>{index}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Table striped>
          <thead>
            <tr>
              <th>Not Attending</th>
            </tr>
          </thead>
          <tbody>
            {post?.NotAttendingNames?.map((index) => (
              <tr>
                <td>{index}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Table striped>
          <thead>
            <tr>
              <th>Possible Attendees</th>
            </tr>
          </thead>
          <tbody>
            {post?.maybeNames?.map((index) => (
              <tr>
                <td>{index}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
