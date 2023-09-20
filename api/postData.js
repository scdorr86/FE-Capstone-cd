import { deleteComment } from './commentData';

const dbUrl = 'https://front-end-capstone-11a38-default-rtdb.firebaseio.com';

const getAllPosts = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSinglePost = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createPost = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updatePost = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deletePost = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getPostComments = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/comments/.json?orderBy="postId"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deletePostCommentRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getPostComments(firebaseKey).then((postCommentsArray) => {
    const deleteCommentPromises = postCommentsArray.map((comment) => deleteComment(comment.firebaseKey));

    Promise.all(deleteCommentPromises).then(() => {
      deletePost(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export {
  deletePost,
  createPost,
  updatePost,
  getAllPosts,
  getSinglePost,
  getPostComments,
  deletePostCommentRelationship,
};
