import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Layout from './routes/Layout.jsx';
import CreatePost from './components/CreatePost.jsx'
import PostInfo from './components/PostInfo.jsx';
import EditPost from './components/EditPost.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>

        <Route path='/' element={<Layout/>} >
          <Route index={true} element={<App />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path="/:id" element={<PostInfo/>}/>
          <Route path="/edit" element={<EditPost/>}/>
        </Route>
    </Routes>
    
  </BrowserRouter>
    

)
