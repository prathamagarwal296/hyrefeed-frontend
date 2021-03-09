import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
  } from "react-router-dom";

import './signup.css';
const Login=(props)=>{
    return(
        <div class="signup-form">
            <h1 className="text-signup">Log in</h1>
            <form className="form" autocomplete="off">
                <div className="form-group">
                    <input type="email" id="fname" name="email" className="form-input" placeholder="Email Address"/>
                </div>
                <div className="form-group">
                    <input type="password" id="lname" name="createpassword" className="form-input" placeholder="Create Password"/>
                </div>
                <div className="form-group">
                <Link to="/home/user" className="form-input btn">Log in</Link>
                </div>
            </form>
            <Link to="/signup" style={{ textDecoration: 'none' }}><p className="text">Create a new account.<span className="login-link"> Sign up</span></p></Link>
        </div>
        
    )
}
export default Login;