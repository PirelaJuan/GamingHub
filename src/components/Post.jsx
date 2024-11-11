import PropTypes from 'prop-types';
import '../CSS/Post.css';
import { Link } from 'react-router-dom';
import { formatDistanceToNow} from 'date-fns';
import moment from 'moment-timezone';

const Post = ({id, title, content, image, time, upvotes}) => {
    const estTime = moment(time).tz('America/New_York').toDate();

    let formattedTime = formatDistanceToNow(estTime, { addSuffix: true });
    formattedTime = formattedTime.replace('about ', '');

  return (
      <div className="post">

         <div className='post.content'>

          <h3 className='time'>{"Posted: " + formattedTime}</h3>
          <Link to={`/${id}`} state={{id,title,content, image, time, upvotes}}>
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