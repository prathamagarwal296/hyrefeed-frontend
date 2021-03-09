import { React, useState, Fragment, useEffect } from 'react';
import SideNav from '../../Nav/SideNav';
import ProfileCards from './InfoCards/ProfileCards';
import {
    Switch,
    Route,
    useRouteMatch,
    Link,
} from "react-router-dom";
import './userprofile.css';
import UserEducation from './UserEducation';
import UserPro from './UserPro';
import LinkedInPop from './LinknedInPop';
import FloatingNav from '../../Nav/FloatingNav';
import Logo from '../../Nav/Logo';

var new_user = false;

const UserProfile = (props) => {
    
    let match = useRouteMatch();
    let [backDrop, setBackDrop] = useState(false);

    let LinkStyle = backDrop ? { filter: "blur(5px)", height: "100vh", overflow: "hidden" } : {};

    const backDropClickhandle = () => {
        setBackDrop(false);
    }

    useEffect(() => {

        new_user = localStorage.getItem("new_user");
        localStorage.removeItem("new_user");
        if (new_user === "true") setBackDrop(true);

    }, []);

    return (
        <div className="user-profile">
            {backDrop && <LinkedInPop click={backDropClickhandle} />}
            <div style={LinkStyle} className="user-info">
                <div className="profile-logo-mobile">
                    <Logo />
                </div>
                <SideNav />
                <Switch>
                    <Route path={`${match.path}/profile`} component={() => {
                        return (
                            <Fragment>
                                <div id="user-info-header">
                                    <Link to="/home/user" id="back-link" style={{ display: "inline-block", textDecoration: "none" }}>
                                        <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                                            <g id="arrow-back">
                                                <rect id="Rectangle_31" data-name="Rectangle 31" width="54" height="54" transform="translate(0 54) rotate(-90)" fill="#fff" opacity="0" />
                                                <path id="Path_1" data-name="Path 1" d="M33.508,17.871H7.014l8.109,9.74a2.237,2.237,0,1,1-3.44,2.859L.514,17.067a2.658,2.658,0,0,1-.2-.335.283.283,0,0,0-.156-.29,2.146,2.146,0,0,1,0-1.608.283.283,0,0,1,.156-.29,2.659,2.659,0,0,1,.2-.335L11.683.8a2.237,2.237,0,1,1,3.44,2.859L7.014,13.4H33.508a2.234,2.234,0,1,1,0,4.468Z" transform="translate(8.612 11.801)" fill="#fff" />
                                            </g>
                                        </svg>
                                    </Link>
                                    <p style={{paddingLeft:'2rem', display: "inline-block"}} >{new_user ? "Sign Up" : "Edit Profile"}</p></div>
                                <ProfileCards />
                            </Fragment>
                        )
                    }} />
                    <Route path={`${match.path}/education`} component={UserEducation} />
                    <Route path={`${match.path}/pro`} component={UserPro} />
                </Switch>
                <FloatingNav />
            </div>
        </div>
    )
}
export default UserProfile;