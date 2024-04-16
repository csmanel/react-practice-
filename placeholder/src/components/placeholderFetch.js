const API_URL = 'https://jsonplaceholder.typicode.com/posts';

//fetching a post
export const fetchPost = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (response.ok) {
    const post = await response.json();
    return post;
  } else {
    console.log('Error fetching post:', response.statusText);
  }
};

//fetching all posts
export const fetchPosts = async () => {
  const response = await fetch(`${API_URL}`);
  if (response.ok) {
    const posts = await response.json();
    return posts;
  } else {
    console.log('Error fetching posts:', response.statusText);
  }
};

//creating a resource
export const createPost = async (title, body, userId) => {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      body: body,
      userId: userId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.log('Error creating post', response.statusText);
  }
};

//updating a resource
export const updatePost = async (id, title, body, userId) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id: id,
      title: title,
      body: body,
      userId: userId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.log('Error updating post', response.statusText);
  }
};

//patching a resource
export const patchPost = async (id, title) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      id: id,
      title: title,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.log('Error patching post', response.statusText);
  }
};

//deleting a resource
export const deletePost = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    console.log('Post successfully deleted');
  } else {
    console.log('Error deleting post', response.statusText);
  }
};
