import React, { useEffect, useState } from "react";
import { supabase } from "./Client.js";
import Post from './Post.jsx'; 

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('newest'); 

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('Posts')
                .select();

            if (error) {
                console.error("Error fetching posts:", error);
            } else {
              
                const sortedPosts = data.sort((a, b) => new Date(b.time) - new Date(a.time));
                setPosts(sortedPosts);
            }
            setLoading(false);
        };

        fetchPosts();
    }, []);

   
    const sortPosts = (order) => {
        if (order === 'newest') {
            setPosts((prevPosts) => 
                [...prevPosts].sort((a, b) => new Date(b.time) - new Date(a.time))
            );
        } else if (order === 'most-upvotes') {
            setPosts((prevPosts) => 
                [...prevPosts].sort((a, b) => b.upvotes - a.upvotes)
            );
        }
        setSortOrder(order);
    };

    return (
        <div className="whole-page">
            <br />
            <br />
            <div className="filters">
                <button onClick={() => sortPosts('newest')} 
                        disabled={sortOrder === 'newest'}>
                    Sort by Newest
                </button>
                <button onClick={() => sortPosts('most-upvotes')} 
                        disabled={sortOrder === 'most-upvotes'}>
                     Most Upvotes
                </button>
            </div>
            <div className="ReadPosts">
                {loading ? (
                    <h2>Loading...</h2>
                ) : posts && posts.length > 0 ? (
                    posts.map((post) => 
                        <Post key={post.id} id={post.id} title={post.title} 
                              content={post.content} image={post.image} 
                              time={post.time} upvotes={post.upvotes} />
                    )
                ) : (
                    <a href="/create"><button>No Post made yet, Create One!!</button></a>
                )}
            </div>
        </div>
    );
};

export default ReadPosts;
