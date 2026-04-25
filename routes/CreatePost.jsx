import { useState } from "react"
import supabase from '../client.js'

const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [upvotes, setUpvotes] = useState(0)
    //const [poster_id, setPosterId] = useState(0)

    const [post, setPost] = useState([])

    const submitPost = async () => {
        setUpvotes(0);
        //setPosterId(0);

        const {data, error} = await supabase.from("post").insert([{title: title, content: content, image: imgUrl, upvotes: upvotes}]);
        
        if (error) {
            console.error(error.message)
        }else{
            setPost([...post, data[0]]);
        }
    }

    return (
        <>
        <h1>Create a New Post</h1>

        <div className="create-post-container">
            <input type="text" placeholder="Post Title" id="post-title" name="post-title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <input type="text" placeholder="Post Contents..." id="post-content" name="post-content" value={content} onChange={(e) => setContent(e.target.value)}></input>
            <label>Add an image URL:</label>
            <input type="text" placeholder="Insert Image URL..." id="post-img" name="post-img" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)}></input>

            <button className="submit-btn" onClick={submitPost}>Create Post</button>
        </div>
        </>
    )
}

export default CreatePost;