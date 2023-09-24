import './App.css';
import {useState, useEffect} from 'react'
import Post from './components/Post';
import AddPost from './components/AddPost';
import axios from 'axios'

function App() {

const [posts, setPosts] = useState([]);

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/posts'
});

const fetchPosts = async() => {
 try{
  const response = await client.get('?_limit=4')
  setPosts(response.data);
 } catch (error) {
  console.log(error);
 }
  
}

useEffect(() => {
  fetchPosts()
}, []);


const addPost = async(title, body) => {

    // this is code using fetch method to consume APIs

  // const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //         title: title,
  //         body: body,
  //         userId: Math.random().toString(36).slice(2),
  //     }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //   },
  // })
  //  const data = response.json();
  //     setPosts((prevPosts) => [data, ...prevPosts])

//------------ fetching data using axios for APIs

  const response = await client.post('', {
    title,
    body
  });
  setPosts((prevPosts) => [response.data, ...prevPosts]);
};

const deletePost = async(id) => {
  // code using fetch with APIs to delete data
  
  // const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  //     method: 'DELETE'
  //   })
  //     if(response.status === 200) {
  //       setPosts(
  //         posts.filter((post) => {
  //           return post.id !== id;
  //         })
  //       )
  //     }

  //-------------- here is code to use Axios with APIs

  const response = await client.delete(`${id}`)
  setPosts(posts.filter((post) => {
    return post.id !== id;
  }))
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
