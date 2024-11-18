import React, { useEffect, useState } from "react";
import { supabase } from "./Client.js";
import Post from './Post.jsx'; 
import HomeBar from './HomeBar.jsx'; 

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
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
                setFilteredPosts(sortedPosts); // Initialize filteredPosts with sorted data
            }
            setLoading(false);
        };

        fetchPosts();
    }, []);

    const sortPosts = (order) => {
        let sorted;
        if (order === 'newest') {
            sorted = [...posts].sort((a, b) => new Date(b.time) - new Date(a.time));
        } else if (order === 'most-upvotes') {
            sorted = [...posts].sort((a, b) => b.upvotes - a.upvotes);
        }
        setPosts(sorted);
        setFilteredPosts(sorted);
        setSortOrder(order);
    };

    const handleSearch = (query) => {
        if (query.trim() === '') {
            setFilteredPosts(posts); // Reset to all posts when query is empty
        } else {
            const filtered = posts.filter(post => 
                post.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPosts(filtered);
        }
    };

    return (
        <div className="whole-page">
            <HomeBar onSearch={handleSearch} /> {/* Include HomeBar and pass handleSearch */}
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
                ) : filteredPosts && filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => 
                        <Post key={post.id} id={post.id} title={post.title} 
                              content={post.content} image={post.image} 
                              time={post.time} upvotes={post.upvotes} />
                    )
                ) : (
                    <a href="/create"><button>No posts found, create one!</button></a>
                )}
            </div>
        </div>
    );
};

export default ReadPosts;
