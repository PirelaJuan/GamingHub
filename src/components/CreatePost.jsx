import '../CSS/Form.css';
import React, { useState } from "react";
import { supabase } from './Client.js';

function CreatePost() {
    const [post, setPost] = useState({ title: "", content: "", image: "", time:""});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const createPost = async (event) => {
        event.preventDefault();
           
         await supabase
        .from('Posts')
        .insert([
            { title: post.title, content: post.content, image: post.image, time: new Date().toLocaleString(), upvotes: 0 },
        ])
        .select()
        
        window.location = "/";
    };

return(

    <div className='create-page'>
        <div className='whole-page'>

            <form className="form-container" onSubmit={createPost}>

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
                    <input className="button" type="submit" value="Submit" onClick={createPost}/>
                </div>

            </form>
            
            
        </div>
    </div>

)


}


export default CreatePost;