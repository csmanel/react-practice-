import { useEffect, useState } from 'react';
import { fetchPost } from './placeholderFetch';
import { useParams } from 'react-router-dom';

function PostPage() {
  const { postId } = useParams();
  const [fetchedPost, setFetchedPost] = useState(null);

  useEffect(() => {
    fetchPost(postId)
      .then((result) => setFetchedPost(result))
      .then((res) => console.log(res))
      .catch((error) => console.log('error fetching post:', error));
  }, []);

  console.log(fetchedPost);

  return (
    <div>
      {fetchedPost ? (
        <div>
          <h1>{fetchedPost.title}</h1>
          <p>{fetchedPost.body}</p>
        </div>
      ) : (
        <div>
          <h1>Post not found</h1>
        </div>
      )}
    </div>
  );
}

export default PostPage;
