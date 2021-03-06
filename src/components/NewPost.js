import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../authContext';
import { db } from '../firebase';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaPlus} from 'react-icons/fa';
import moment from 'moment';
import { MdClose } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa'


const NewPost = ({ toggleSidebar, openSidebar }) => {
    
    const { blogPost, currentUser } = useAuth();
    const [ blogItems, setBlogItems ] = useState([]);
    const [check, setCheck] = useState(true);
    const title = useRef();
    const body = useRef();
    const [ form, setForm ] = useState(false)
    const [loading, setLoading] = useState(true);

    const postBlog = (e) => {
        e.preventDefault();
        blogPost(title.current.value, body.current.value);
        title.current.value = '';
        body.current.value = '';
        setForm(false);
        fetchPost()
    }

    const openForm = () => {
        setForm(true)
    }

    const closeForm = () => {
        setForm(false);
    }

    const [items, setItems] = useState('')
    

    const fetchPost = async () => {

        try{
            const response = db.collection('blogs').orderBy('createdAt', 'desc')

            const data = await response.get()

            setBlogItems([])

            data.docs.forEach(blogItem => {

                if(blogItem.data().uid ===  currentUser.uid){
                    setLoading(false)
                    setBlogItems(item => [...item, blogItem.data()])

                }else{
                    return null
                }

            })
            
                        
        }catch(error) {
            console.log(error)
        }
            
    }

    
    useEffect(() => {

        fetchPost()
        
    }, [])

    return ( 
        <div className="new-post">
            <div className={`pop-up ${form ? 'open' : 'close'}`}>
                <form onSubmit={ postBlog }>
                    <div className="form-icon"  >
                        <MdClose id="icon" onClick = { closeForm }/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text"  placeholder="title" ref={title} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea name="content" cols="30" rows="5" placeholder="blog" ref={body} required></textarea>
                    </div>
                
                    <div className="post-btn">
                        <button type="submit">POST</button>
                    </div>            
                </form>
            </div>

           
           <div className="blog-section">
                <div className="post-header">
                    <h2>POSTS</h2>
                    <div className="toggle" onClick={ toggleSidebar }>
                        { openSidebar ? <FaTimes className="hamburger-icon"/> : <GiHamburgerMenu  className="hamburger-icon"/>}
                    </div>
                </div>
                
                <button onClick={ openForm } className="open-btn">CREATE BLOG POST<FaPlus className='open-btn-icon' /></button>
                <p className="p">Your Blogs Appear Here</p>
                <div className="blog-card-section">
                    {
                    !loading ?    
                    blogItems.map((blog) => {
                            return(
                                <div className="card" key={blog.id}>
                                    <h2>{blog.title}</h2>
                                    <hr  style={{ color: 'rgb( 243, 243, 243)'}}/>
                                    <p>{blog.blog}</p>                                    
                                    <i>{moment(blog.createdAt.toDate().toString()).calendar()}</i>
                                </div>
                            )
                        })
                    :
                    <h3>No Blog Post yet...</h3>                        
                    }
                </div>
            </div>
        </div>
     );
}
 
export default NewPost;