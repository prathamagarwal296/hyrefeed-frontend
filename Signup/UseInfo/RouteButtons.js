import React from 'react';
import {Link} from 'react-router-dom';
const RouteButton = (props) => {
    return(
        <div className="profile-routebutton">
            {props.displayBack && <Link to={props.linkBack} style={{textDecoration:"none"}} className="btn-profile-back">Back</Link>}
            <Link to={props.linkNext} style={{textDecoration:"none"}} className="btn btn-profileActions">Save and continue</Link>
        </div>
    )
}
export default RouteButton;