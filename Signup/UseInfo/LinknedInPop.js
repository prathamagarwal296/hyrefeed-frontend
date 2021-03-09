import React from 'react';

const LinkedInPop = (props) => {
    return (
        <div style={{ filter: "none" }} className="linkedIn-popup">
            <h1 className="linkedIn-header">Here's how it works</h1>
            <ol>
                <li>Look at opportunity that you wish to apply </li>
                <li>Submit your profile</li>
                <li>Record your answers for question prompted during video</li>
            </ol>
            <p>How would you like to fill out your profile?</p>
            <button onClick={props.click} className="btn btn-linkedIn">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22 22">
                        <g id="linkedin" transform="translate(0.027 -0.027)">
                            <rect id="Rectangle_3871" data-name="Rectangle 3871" width="22" height="22" transform="translate(21.973 22.027) rotate(180)" fill="#fff" opacity="0" />
                            <path id="Path_2655" data-name="Path 2655" d="M14.676,8.4A5.357,5.357,0,0,0,9.3,13.748v5.4a.827.827,0,0,0,.827.827h1.93a.827.827,0,0,0,.827-.827v-5.4a1.783,1.783,0,0,1,1.976-1.774,1.838,1.838,0,0,1,1.608,1.838v5.339a.827.827,0,0,0,.827.827h1.93a.827.827,0,0,0,.827-.827v-5.4A5.357,5.357,0,0,0,14.676,8.4Z" transform="translate(-0.754 -0.681)" fill="#fff" />
                            <rect id="Rectangle_3872" data-name="Rectangle 3872" width="4.135" height="10.751" rx="0.9" transform="translate(2.757 8.546)" fill="#fff" />
                            <circle id="Ellipse_185" data-name="Ellipse 185" cx="2.068" cy="2.068" r="2.068" transform="translate(2.757 2.757)" fill="#fff" />
                        </g>
                    </svg>
                </div>
                <span>Prefill with Linkedin</span>
            </button>
            <button onClick={props.click} className="btn btn-green">

                Fill out manually</button>
        </div>
    )
}
export default LinkedInPop;