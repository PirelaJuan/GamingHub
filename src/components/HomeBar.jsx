import '../CSS/HomeBar.css';

function HomeBar() {

  return (
    <div className="topnav">
      <h3>GamingHub</h3>
      
      <input type="text" placeholder="Search.."/>
      <a href='/' className="home">Home</a>
      <a href="/create" className="create">Create New Post</a>
      
  </div>
  );
}

export default HomeBar;