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
  console.warn('dynamic route', firebaseKey, router, post);

  useEffect(() => {
    getSinglePost(firebaseKey).then(setPost);
    getAllProfiles().then((data) => data?.filter((index) => index?.uid === post.uid)).then(setProfile);
  }, [firebaseKey]);

  console.log('table profile obj', profile, post);

  return (
    <Table striped="columns">
      <thead>
        <tr>
          <th colSpan={1} style={{ color: 'red' }}><img style={{ height: '150px' }} src={profile?.avatar} alt="" />{post?.title}</th>
        </tr>
        <tr>
          <th>Joining Session</th>
        </tr>
      </thead>
      <tbody>
        {post?.attendingNames.map((index) => (
          <tr>
            <td>{index.attendingNames}</td>
          </tr>
        ))};

      </tbody>
    </Table>
  );
}
