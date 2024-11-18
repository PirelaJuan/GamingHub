import '../CSS/HomeBar.css';
import { useState } from 'react';

function HomeBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    onSearch(value); // Pass the search query to the parent component
  };

  return (
    <div className="topnav">
      <div className='name'>
        <h3>GamingHub</h3>
      </div>
      
      <input 
        type="text" 
        placeholder="Search by title..." 
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <a href='/' className="home">Home</a>
      <a href="/create" className="create">Create New Post</a>
    </div>
  );
}

export default HomeBar;
