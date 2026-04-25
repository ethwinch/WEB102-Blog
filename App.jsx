import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css'

import supabase from "./client.js"

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const {data} = await supabase.from("post").select();
    setPosts(data);
  }

  return (
    <>
      <div>
        <h1>THE AMAZING DIGITAL FORUM</h1>
        <div className="posts">
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <h2 className="title">{post.title}</h2>
              <p className="time"><i>{post.created_at.slice(0, 10)}</i></p>
              <p className="content">{post.content}</p>
              <h4 className="upvotes">🡅 {post.upvotes}</h4>

              <Link to={`/post/${post.id}`} className="button">View Full Post</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
