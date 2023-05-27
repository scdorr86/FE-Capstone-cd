import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getSinglePost } from '../../../api/postData';
import { getAllProfiles, getSingleProfile } from '../../../api/profileData';

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

  // const attendRows = post?.attendingNames.forEach((index) => (
  //   <tr>{index}</tr>
  // ));

  console.log('table profile obj', profile, post);

  return (
    <Table striped="columns">
      <thead>
        <tr>
          <th colSpan={3} style={{ color: 'red' }}><img style={{ height: '150px' }} src={profile?.avatar} alt="" />{post?.title}</th>
        </tr>
        <tr>
          <th>Joining Session</th>
          <th>Not Joining</th>
          <th>Maybe</th>
        </tr>
      </thead>
      <tbody>
        <></>
      </tbody>
    </Table>
  );
}
