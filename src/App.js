import './App.css';
import {useState, useEffect} from 'react'
import Post from './components/Post';
import AddPost from './components/AddPost';

function App() {

const [posts, setPosts] = useState([]);

const fetchPosts = () => {
  fetch('https://jsonplaceholder.typicode.com/posts?_limit=4')
  .then ((response) => response.json())
  .then((data) => setPosts(data))
}

useEffect(() => {
  fetchPosts()
}, []);


const addPost = (title, body) => {
  fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
          title: title,
          body: body,
          userId: Math.random().toString(36).slice(2),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setPosts((prevPosts) => [data, ...prevPosts])
    
    })
};

const deletePost = (id) => {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE'
    })
    .then((response) => {
      if(response.status === 200) {
        setPosts(
          posts.filter((post) => {
            return post.id !== id;
          })
        )
      }
    })
};

  return (
   <main>
    <h1> Consuming REST api tutorial </h1>
    <AddPost addPost={addPost}/>

    <section className='posts-container'>
      <h2>Posts</h2>
      {posts.map((post) =>
        <Post 
          key={post.id}
          id={post.id}
          title={post.title}
          body={post.body}
          deletePost={deletePost}
        />
      )}
    </section>
   </main>
  );
}

export default App;
