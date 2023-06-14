import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { getSinglePost } from '../../../api/postData';
import PostForm from '../../../components/forms/PostForm';

export default function EditPost() {
  const [editPost, setEditPost] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  // console.warn('dynamic route', firebaseKey, router);

  useEffect(() => {
    getSinglePost(firebaseKey).then(setEditPost);
  }, [firebaseKey]);

  return (
    <div className="updatePage">
      <Image className="" src="/logotest.png" />
      <PostForm obj={editPost} />
    </div>
  );
}
