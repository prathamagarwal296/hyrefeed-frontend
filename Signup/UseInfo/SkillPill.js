import { faAlignCenter } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const SkillPill = (props) => {
    return(
        <div className="pro-skill-pill">
            <span><svg style={{marginLeft:'-4.5rem'}} id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                <g id="checkmark">
                    <rect id="Rectangle_528" data-name="Rectangle 528" width="20" height="20" fill="#fff" opacity="0"/>
                    <path id="Path_112" data-name="Path 112" d="M8.852,15.928a.828.828,0,0,1-.6-.265L4.223,11.383a.829.829,0,1,1,1.209-1.134l3.411,3.635,6.963-7.618a.828.828,0,1,1,1.225,1.11l-7.568,8.28a.828.828,0,0,1-.6.273Z" transform="translate(-0.688 -1.025)" fill="#fff"/>
                </g>
            </svg></span>
            <span id="skillpillname">{props.skillName}</span>
            <p onClick={() => { props.removeSkillPill(props.index) }} id="skillpillcross">	&#10005;</p>
        </div>
    )
}
const SuggestPill = (props)=>{
    return(
        <div style={{backgroundColor:"var(--grey-shade-two)"}} className="pro-skill-pill">
            <span style={{color:"#7A7A7A"}}>+ {props.skillName}</span>
        </div>
    )
}
export {SkillPill, SuggestPill};