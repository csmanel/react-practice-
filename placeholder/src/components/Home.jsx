import { fetchPosts } from './placeholderFetch';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts()
      .then((res) => setPosts(res))
      .catch((error) => console.error('error fetching posts:', error));
    console.log(posts);
  }, []);

  //useEffect is an async function and therefore cannot use await inside, you would need another async function
  // useEffect(() => {
  //   const dataResult = async () => {
  //     const res = await fetchPosts();
  //     if (res.ok) {
  //       setPosts(res);
  //     } else {
  //       console.log('error fetching posts');
  //     }
  //   };
  //   dataResult();
  // }, []);

  return (
    <div>
      {posts.length > 0 &&
        posts.map((post) => {
          return (
            <div key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{post.body}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
