import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import supabase from "../client";

const FullPost = () => {
    const {post} = useParams();
    const [postDetails, setPostDetails] = useState([]);

    useEffect(() => {
        getPostDetails();
    }, []);

    async function getPostDetails() {
        const { data } = await supabase.from("post").select("*").eq('id', post);
        setPostDetails(data[0]);
    }

    return (
        <>
        {/* <h1>{postDetails.title}</h1> */}
        <div className="full-post">
            {postDetails && (
                <>
                    <h2 id="post-title">{postDetails.title}</h2>
                    <h4 id="post-time">{postDetails.created_at}</h4>
                    <img src={postDetails.image}></img>
                    {/* <h4>{postDetails.created_at.slice(0, 10)}</h4> */}
                    <p id="post-content">{postDetails.content}</p>
                </>
            )}
            <div className="button-container">
                <Link to={`/edit_post/${post}`}>Edit Post</Link>
                <Link to="/">Return Home</Link>
            </div>
        </div>
        </>
    )
}

export default FullPost;