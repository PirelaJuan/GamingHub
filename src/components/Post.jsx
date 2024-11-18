import PropTypes from 'prop-types';
import '../CSS/Post.css';
import { Link } from 'react-router-dom';

const Post = ({ id, title, content, image, time, upvotes }) => {
    const postDate = new Date(time);
    const now = new Date();
    const diffInSeconds = Math.floor((now - postDate) / 1000);
    let timeAgo;

    if (diffInSeconds < 60) {
        timeAgo = "just now";
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        timeAgo = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        timeAgo = `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        timeAgo = `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 2629800) {
        const weeks = Math.floor(diffInSeconds / 604800);
        timeAgo = `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 31557600) {
        const months = Math.floor(diffInSeconds / 2629800);
        timeAgo = `${months} month${months > 1 ? "s" : ""} ago`;
    } else {
        const years = Math.floor(diffInSeconds / 31557600);
        timeAgo = `${years} year${years > 1 ? "s" : ""} ago`;
    }

    return (
        <div className="post">
            <div className='post-content'>
                <h3 className='time'>{"Posted: " + timeAgo}</h3>
                <Link to={`/${id}`} state={{ id, title, content, image, time, upvotes }}>
                    <h2 className="title">{title}</h2>
                </Link>
                <h3 className='upvotes'>{upvotes} upvotes</h3>
            </div>
        </div>
    );
};

Post.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    upvotes: PropTypes.number.isRequired
};

export default Post;