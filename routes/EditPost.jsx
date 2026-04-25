import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import supabase from "../client";

const EditPost = () => {
    const {post} = useParams();
    const [postDetails, setPostDetails] = useState([]);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [upvotes, setUpvotes] = useState(0);

    useEffect(() => {
        getPostDetails();
    }, [post]);

    async function getPostDetails() {
        const { data } = await supabase.from("post").select('*').eq('id', post);
        setPostDetails(data[0]);

        setTitle(data[0].title)
        setContent(data[0].content)
        setImgUrl(data[0].image)
        setUpvotes(data[0].upvotes)
    }

    const editPostDetails = async () => {
        const {data, error} = await supabase.from("post").update([{title: title, content: content, image: imgUrl, upvotes: upvotes}]).eq('id', post).select();
        if (error) {
            console.error(error.message)
        }else{
            setPostDetails([data[0]]);

            setTitle(data[0].title)
            setContent(data[0].content)
            setImgUrl(data[0].image)
            setUpvotes(data[0].upvotes)
        }
    }

    const deletePost = async () => {
        const {error} = await supabase.from("post").delete().eq('id', post);
        if (error) {
            console.error(error.message)
        }else{
            setPostDetails.filter(item => item !== postDetails);
        }
    }

    return (
        <>
        <h1>Edit Post</h1>
        {/* {title} */}
        {postDetails && (
            <div className="create-post-container">
                <input type="text" placeholder="Post Title" id="post-title" name="post-title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <input type="text" placeholder="Post Contents..." id="post-content" name="post-content" value={content} onChange={(e) => setContent(e.target.value)}></input>
                <label>Add an image URL:</label>
                <input type="text" placeholder="Insert Image URL..." id="post-img" name="post-img" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)}></input>
            </div>
        )}

        <div className="button-container">
            <button onClick={deletePost}>Delete Post</button>
            <button onClick={editPostDetails}>Confirm Edits</button>
        </div>
        </>
    )

}

export default EditPost;