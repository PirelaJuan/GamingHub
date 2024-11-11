import { Outlet } from "react-router-dom";
import HomeBar from '../components/HomeBar.jsx';

const Layout = () => {
    return (
      <div>
      <HomeBar />
      <Outlet />
    </div>
    );
  };
  
  export default Layout;