import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiSun } from 'react-icons/hi';
import { BsFillMoonFill } from 'react-icons/bs';
import { useAuth } from '../authContext';
import Post from './Post';

const Home = ({ toggle, toggleLightMode }) => {

    const { currentUser } = useAuth()

    return ( 
        <div className="home">
            <nav>
                <div className="nav-inner">
                    <header>
                        <h1>BLOG.</h1>
                    </header>
                    <div className="nav-items">
                        {currentUser ? 

                            
                        <div className="login-btn">
                            <Link to="/dashboard">
                                <button>VIEW PROFILE</button>
                            </Link>
                        </div>
                            
                        :
                        
                        <div className="login-btn">
                            <Link to="/login">
                                <button>LOGIN</button>
                            </Link> 
                        </div>
                        
                        }   
                        <div className="light-dark-icon" onClick={ toggle }>
                            {toggleLightMode ? <HiSun /> : <BsFillMoonFill />}
                        </div>
                    </div>
                </div>
            </nav>
            <div className="home-items">
                { currentUser ? <h2>Welcome Back</h2>:
                <h2>Welcome to my Blog Site</h2>
                }
                <Post />
            </div>
        </div>
     );
}
 
export default Home;