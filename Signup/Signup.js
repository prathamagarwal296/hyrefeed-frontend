import { React, useState } from 'react';
import FormOne from './FormOne';
import './signup.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    withRouter
} from "react-router-dom";
import FormTwo from './Formtwo';
import Home from '../Home/Home';
import Login from './Login';
import MobileLogin from './Mobile/MobileLogin';
import MobileLoginTwo from './Mobile/MobileLoginTwo';
import Menu from './Mobile/UserDetails';
import MobileSignUp from './Mobile/MobileSignUp';
import MobileSignUpOtp from './Mobile/MobileSignUpOtp';
const Signup = (props) => {
    let match = useRouteMatch();
    let [session, setSession] = useState({});
    let [phno, setPhno] = useState("")
    const setOtpSession = (sessionObj) => {
        setSession(sessionObj);
    }
    const setPhoneNumber = (phno) => {
        setPhno(phno);
    }
    console.log(session);
    return (
        <div className="container">
            <div className="image-holder">
                <div className="heading">
                    <h1 className="heading-primary">The Difference between who you are and who you want to be is what you do</h1>
                    {/* <p className="heading-secondary">Think out of the box.</p> */}
                </div>
            </div>
            <Switch>
                <Route path={`${match.path}/notinuse`} component={FormOne} />
                <Route path={`${match.path}/adddetails`} component={FormTwo} />
                <Route path={`${match.path}/login`} component={Login} />
                <Route exact path={`${match.path}`} component={() => <MobileLogin setOtpSession={setOtpSession}
                    setPhoneNumber={setPhoneNumber} />} />
                <Route exact path={`${match.path}/signup`} component={() => <MobileSignUp setOtpSession={setOtpSession}
                    setPhoneNumber={setPhoneNumber}
                />} />
                <Route path={`${match.path}/signup/otp`} component={() => <MobileSignUpOtp setOtpSession={setOtpSession} sessionObj={session}
                    phno={phno}
                />} />
                <Route path={`${match.path}/mobile/otp`} component={() => <MobileLoginTwo setOtpSession={setOtpSession} sessionObj={session}
                    phno={phno} />} />
                <Route path={`${match.path}/mobile/details`} component={Menu} />
            </Switch>
        </div>
    );
}
export default Signup;