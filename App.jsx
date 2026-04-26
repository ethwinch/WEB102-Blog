import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css'

import supabase from "./client.js"

function App() {
  const [posts, setPosts] = useState([]);

  const [search, setSearch] = useState("");
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  // Filter by Post Title
  useEffect(() => {
    const filtered = allPosts.filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setPosts(filtered);
  }, [search]);

  async function getPosts() {
    const {data} = await supabase.from("post").select();
    setPosts(data);
    setAllPosts(data);
  }

  // Filter posts by upvotes
  async function filterPostsByUpvotes() {
    const { data } = await supabase.from("post").select().order("upvotes", { ascending: false });
    setPosts(data);
  }

  return (
    <>
      <div>
        <img id="tadc-title" src="src/assets/tadc_title.png"></img>
        <h1>F O R U M</h1>
        {/* <h1>THE AMAZING DIGITAL FORUM</h1> */}

        <div className="filter-btns">
          <button className="upvote-search-btn rainbow" onClick={filterPostsByUpvotes}>Sort by Upvotes</button>
          <input type="text" id="search" name="search" placeholder="⌕ Search posts by title..." value={search} onChange={((e) => setSearch(e.target.value))}></input>
        </div>

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
