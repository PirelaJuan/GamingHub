import '../CSS/Form.css';
import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { supabase } from './Client.js';

function CreatePost() {
    const [post, setPost] = useState({ title: "", content: "", image: "", time:""});
    const { state } = useLocation();
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const editPost = async (event) => {
        event.preventDefault();
        await supabase
        .from('Posts')
        .update({title: post.title, content: post.content, image: post.image})
        .eq('id', state.id)

        window.location = '/';
    }

return(

    <div className='create-page'>
        <div className='whole-page'>

            <form className="form-container" onSubmit={editPost}>

                <div className='mini-container'>
                    <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    placeholder='Tiltle'
                    onChange={handleChange}/>
                     
                </div>

                <div className='mini-container'>
                    <input 
                    type="text" 
                    id='content'
                    name='content'
                    placeholder='Content (Optional)'
                    onChange={handleChange}/>
                     
                </div>

                <div className='mini-container'>
                    <input 
                    type="text" 
                    id='image' 
                    name='image' 
                    placeholder='Paste Image URL (Optional)' 
                    onChange={handleChange} />
                    
                </div>
                
                <div>
                    <input className="button" type="submit" value="Edit" onClick={editPost}/>
                </div>

            </form>
            
            
        </div>
    </div>

)


}

export default CreatePost;