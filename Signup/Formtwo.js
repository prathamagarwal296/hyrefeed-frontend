import React, {useState} from 'react';
import './signup.css';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarWeek, faCoffee } from '@fortawesome/free-solid-svg-icons'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    withRouter
  } from "react-router-dom";
fontawesome.library.add(faCalendarWeek, faCoffee);
const FormTwo=(props)=>{
    
    return(
        <div class="signup-form">
            <h1 className="text-signup">Add Details</h1>
            <form className="form" autocomplete="off">
                <div className="form-group form-group-2">
                    <input type="text" id="fname" name="email" className="form-input" placeholder="Full Name"/>
                </div>
                <div className="form-group form-group-2">
                    <input type="test" id="lname" name="createpassword" className="form-input" placeholder="Contact Number"/>
                </div>
                <div className="form-group date form-group-2">
                    <input type="date" name="birthday" className="form-input date"/>
                    <FontAwesomeIcon className="calender" icon="calendar-week" />
                </div>
                <div className="form-group date form-group-2">
                    <label className="file-upload">Upload Photo
                        <input type="file" name="birthday" placeholder="Upload Photo" className="form-input file-photo"/>
                        <p className="file-name">File Name</p>
                    </label>
                </div>
                <div className="form-group date form-group-2">
                    <label className="file-upload">Upload Resume
                        <input type="file" name="birthday" className="form-input file-resume"/>
                        <p className="file-name">File Name</p>
                    </label>
                </div>
                <div className="form-group form-group-2">
                <Link to="/home" className="form-input btn login-formtwo">Sign in</Link>
                <Link to="/signup/mobile/loginone" className="form-input btn login-mobile-formtwo">Sign in</Link>
                </div>
            </form>
            <p className="text">Already have an account?<span className="login-link"> Log in</span></p>
        </div>
    );
}
export default withRouter(FormTwo);