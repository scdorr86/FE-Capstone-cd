import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getSinglePost } from '../../../api/postData';

export default function PostRsvp() {
  const [post, setPost] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  console.warn('dynamic route', firebaseKey, router, post);

  useEffect(() => {
    getSinglePost(firebaseKey).then(setPost);
  }, [firebaseKey]);

  return (
    <Table striped="columns">
      <thead>
        <tr>
          <th>RSVP</th>
          <th>Joining Session</th>
          <th>Not Joining</th>
          <th>Maybe</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
}
