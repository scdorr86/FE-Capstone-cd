import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Image } from 'react-bootstrap';
import { getSinglePost } from '../../../api/postData';
import { getAllProfiles } from '../../../api/profileData';
import CommentForm from '../../../components/forms/CommentForm';
import { getCommentsByPostId } from '../../../api/commentData';

export default function PostRsvp() {
  const [post, setPost] = useState({});
  const [profile, setProfile] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [comments, setComments] = useState([]);
  // getSinglePost(firebaseKey).then((data) => setPost(data)).then(console.log('effect post', post));

  const getPostComments = () => {
    getCommentsByPostId(firebaseKey).then(setComments);
  };

  useEffect(() => {
    getSinglePost(firebaseKey)?.then((data) => setPost(data));
    getAllProfiles()?.then((data) => data?.filter((index) => index?.uid === post?.uid))?.then(setProfile);
    getPostComments();
  }, [firebaseKey]);

  console.log('images', post?.profileAvatar, post);

  // getAllProfiles().then((data) => console.log('this is the', data));
  // console.log('dynamic route', firebaseKey, router, post);
  // console.log('dynamic post', post);
  // console.log('get post', getSinglePost(firebaseKey));

  console.log('tablcomments', comments);

  return (
    <>
      <div className="post-details justify-content-center">
        <Image className="avatar" src={post?.profileAvatar} alt="no avatar" />
        <h1 className="title">Game Session: {post?.title}</h1>
      </div>
      <div className="tables justify-content-center">
        <Table striped>
          <thead>
            <tr>
              <th className="table-header">Attending Session: <span className="tableCount" style={{ color: 'orange' }}>{post?.attending}</span></th>
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
              <th className="table-header">Not Attending: <span className="tableCount" style={{ color: 'orange' }}>{post?.notAttending}</span></th>
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
              <th className="table-header">Possible Attendees: <span className="tableCount" style={{ color: 'orange' }}>{post?.maybe}</span></th>
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
        <CommentForm postId={firebaseKey} onUpdate={getPostComments} comments={comments} />
      </div>
    </>
  );
}
