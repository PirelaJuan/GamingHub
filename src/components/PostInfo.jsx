import '../CSS/PostInfo.css';
import { useLocation, Link } from "react-router-dom";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { supabase } from './Client.js';
import { useEffect, useState } from 'react';

function PostInfo() {
    const { state } = useLocation();
    const [count, setCount] = useState(state.upvotes);
    const [userComment, setUserComment] = useState("");
    const [comments, setComments] = useState([]); // State for storing comments

    const handleChange = (event) => {
        setUserComment(event.target.value);
    };

    let formattedTime = formatDistanceToNow(parseISO(state.time), { addSuffix: true });
    formattedTime = formattedTime.replace('about ', '');

    const updateCount = async (event) => {
        event.preventDefault();

        await supabase
            .from('Posts')
            .update({ upvotes: count + 1 })
            .eq('id', state.id);

        setCount((prevCount) => prevCount + 1);
    };

    const deletePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .delete()
            .eq('id', state.id);

        window.location = '/';
    };

    const commentPost = async (event) => {
        event.preventDefault();

        const { error } = await supabase
            .from('comments')
            .insert([
                { comment: userComment, idComment: state.id }
            ]);

        if (error) {
            console.error("Error posting comment:", error);
        } else {
            console.log("Comment posted successfully");
            setUserComment(""); 
            fetchComments(); // Re-fetch comments to include the new one
        }
    };

    const fetchComments = async () => {
        const { data, error } = await supabase
            .from('comments')
            .select()
            .eq('idComment', state.id);

        if (error) {
            console.error("Error fetching comments:", error);
        } else {
            setComments(data); // Set the fetched comments in state
        }
    };

    useEffect(() => {
        fetchComments();
    }, []); // Fetch comments when the component mounts

    return (
        <div className="post-info">
            <h3>Posted: {formattedTime}</h3>
            <h1>{state.title}</h1>
            <p>{state.content}</p>
            {state.image && <img src={state.image} alt="post" />}

            <div className='button-layout'>
                <button className='vote' onClick={updateCount}>{count} 👍</button>
                <Link to={`/edit`} state={state}>
                    <button className='edit'>🖊️</button>
                </Link>
                <button className='delete' onClick={deletePost}>🗑️</button>
            </div>

            <form onSubmit={commentPost}>
                <input 
                    type="text" 
                    name="comment" 
                    id="comment" 
                    placeholder="Leave a comment"
                    value={userComment}
                    onChange={handleChange}
                />
                <div>
                    <input className="button" type="submit" value="Submit" />
                </div>
            </form>

            <div className="comments-section">
                <h3>Comments</h3>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <p key={index}>{comment.comment}</p>
                    ))
                ) : (
                    <p>No comments yet. Be the first to comment!</p>
                )}
            </div>
        </div>
    );
}

export default PostInfo;
