import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
  } from "react-router-dom";

import './signup.css';
const FormOne=(props)=>{
    return(
        <div class="signup-form">
        <h1 className="text-signup">Sign up</h1>
        <form className="form" autocomplete="off">
            <div className="form-group">
                <input type="email" id="fname" name="email" className="form-input" placeholder="Email Address"/>
            </div>
            <div className="form-group">
                <input type="password" id="lname" name="createpassword" className="form-input" placeholder="Create Password"/>
            </div>
            <div className="form-group">
                <input type="password" id="lname" name="firstname" className="form-input" placeholder="Confirm Password"/>
            </div>
            <div className="form-group">
            <Link to="/signup/adddetails" className="form-input btn">Continue</Link>
            </div>
        </form>
        <Link to="/signup/login" style={{ textDecoration: 'none' }}><p className="text">Already have an account? <span className="login-link">Log in</span></p></Link>
    </div>
    )
}
export default FormOne;