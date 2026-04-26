import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import supabase from "../client";

const FullPost = () => {
    // POST
    const {post} = useParams();
    const [postDetails, setPostDetails] = useState([]);

    const [upvotes, setUpvotes] = useState(0)
    const [isUpvoted, setIsUpvoted] = useState(false)

    // COMMENT SECTION
    const [commentSection, setCommentSection] = useState([]);

    const [commentContent, setCommentContent] = useState("")
    const [comment, setComment] = useState([]);

    useEffect(() => {
        getPostDetails();
        getComments();
    }, []);

    async function getPostDetails() {
        const { data } = await supabase.from("post").select("*").eq('id', post);
        setPostDetails(data[0]);
        setUpvotes(data[0].upvotes);
    }

    const upvotePost = async () => {
        const newUpvoteCount = isUpvoted ? upvotes - 1 : upvotes + 1;

        setIsUpvoted(!isUpvoted);
        setUpvotes(newUpvoteCount);

        const {data, error} = await supabase.from("post").update([{upvotes: newUpvoteCount}]).eq('id', post).select();
        
        if (error) {
            console.error(error.message)
        }
    }

    async function getComments() {
        const { data } = await supabase.from("comment").select("*").eq('parent_post_id', post);
        setCommentSection(data);
    }
    const submitComment = async () => {
        const {data, error} = await supabase.from("comment").insert([{parent_post_id: post, content: commentContent}]);
        
        if (error) {
            console.error(error.message)
        }else{
            setComment([...comment, data]);
        }
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
                <button className="upvotes-btn" onClick={upvotePost}>🡅 {upvotes}</button>
                <div>
                    <Link to={`/edit_post/${post}`}>Edit Post</Link>
                    <Link to="/">Return Home</Link>
                </div>
            </div>
        </div>

        <div className="create-comment">
            <h4>Write your comment below:</h4>
            <input type="text" placeholder="Write your comment here..." id="comment-content" name="comment-content" value={commentContent} onChange={(e) => setCommentContent(e.target.value)}></input>
            <button className="submit-btn" onClick={submitComment}>Create Comment</button>
        </div>

        <div className="comment-section">
            {commentSection.map((comments) => (
            <div className="comment" key={comments.id}>
              <p className="time"><i>{comments.created_at.slice(0, 10)}</i></p>
              <p className="content">{comments.content}</p>
            </div>
          ))}
        </div>
        </>
    )
}

export default FullPost;