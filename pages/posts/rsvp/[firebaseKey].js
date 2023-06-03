import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getSinglePost } from '../../../api/postData';
import { getAllProfiles } from '../../../api/profileData';
import CommentForm from '../../../components/forms/CommentForm';
import { getCommentsByPostId } from '../../../api/commentData';

export default function PostRsvp() {
  const [post, setPost] = useState({});
  const [profile, setProfile] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  // getSinglePost(firebaseKey).then((data) => setPost(data)).then(console.log('effect post', post));

  const getPostComments = () => { getCommentsByPostId(firebaseKey).then(); };

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
      <div className="post-details">
        <img className="avatar" src={profile?.avatar} alt="avatar here" />
        <h2 className="title">Game Session: {post?.title}</h2>
      </div>
      <div className="tables">
        <Table striped>
          <thead>
            <tr>
              <th className="table-header">Attending Session</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {post?.attendingNames?.map((index) => (
              <tr key={index}>
                <td className="table-cell">{index}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Table striped>
          <thead>
            <tr>
              <th className="table-header">Not Attending</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {post?.NotAttendingNames?.map((index) => (
              <tr key={index}>
                <td className="table-cell">{index}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Table striped>
          <thead>
            <tr>
              <th className="table-header">Possible Attendees</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {post?.maybeNames?.map((index) => (
              <tr key={index}>
                <td className="table-cell">{index}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <span>Comments</span>
      <div>
        <CommentForm postId={firebaseKey} onUpdate={getPostComments} />
      </div>
    </>
  );
}
