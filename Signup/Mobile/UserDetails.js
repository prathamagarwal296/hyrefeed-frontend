import { React, useState } from 'react';
import Nav from '../../Nav/Nav';
import './menu.css';
import { Link } from "react-router-dom";

const Menu = (props) => {

    let [dropdown, setDropdown] = useState(false);
    let dropDownStyle = dropdown ? { display: "block" } : { display: "none" };

    const handleDropdownClick = (props) => {
        if (dropdown) {
            setDropdown(false);
        }
        else {
            setDropdown(true);
        }
    }

    return (
        <div className="nav-menu">
            <Nav />
            <form className="menu-form">
                <div className="menu-form-group">
                    <label>Company Name</label>
                    <div className="menu-input-block">
                        <input type="text" id="fname" name="" className="menu-form-input" placeholder="Search" />
                        <div onClick={handleDropdownClick} className="menu-drop-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15.82" height="9.453" viewBox="0 0 15.82 9.453">
                                <path id="Path_15" data-name="Path 15" d="M14.875,18.949a1.574,1.574,0,0,1-1.118-.457l-6.3-6.3A1.581,1.581,0,1,1,9.695,9.959l5.18,5.212,5.2-5.007a1.574,1.574,0,1,1,2.173,2.267l-6.3,6.077A1.574,1.574,0,0,1,14.875,18.949Z" transform="translate(-6.996 -9.496)" fill="#fff" />
                            </svg>
                        </div>
                    </div>
                    <div style={dropDownStyle} className="menu-dropdown">
                        <ul>
                            <li>
                                <label className="menu-radio-label">Amazon
                            <input type="checkbox" name="radio" />
                                    <span className="menu-radio-button"></span>
                                </label>
                            </li>
                            <li>
                                <label className="menu-radio-label">Wipro
                            <input type="checkbox" name="radio" />
                                    <span className="menu-radio-button"></span>
                                </label>
                            </li>
                            <li>
                                <label className="menu-radio-label">Infosys
                            <input type="checkbox" name="radio" />
                                    <span className="menu-radio-button"></span>
                                </label>
                            </li>
                            <li>
                                <label className="menu-radio-label">Reliance
                            <input type="checkbox" name="radio" />
                                    <span className="menu-radio-button"></span>
                                </label>
                            </li>
                            <li>
                                <label className="menu-radio-label">Tata
                            <input type="checkbox" name="radio" />
                                    <span className="menu-radio-button"></span>
                                </label>
                            </li>
                            <li>
                                <label className="menu-radio-label">TCS
                            <input type="checkbox" name="radio" />
                                    <span className="menu-radio-button"></span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="menu-form-group">
                    <label>Location</label>
                    <div className="menu-input-block">
                        <input type="text" id="fname" name="" className="menu-form-input" placeholder="Search" />
                        <div className="menu-drop-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15.82" height="9.453" viewBox="0 0 15.82 9.453">
                                <path id="Path_15" data-name="Path 15" d="M14.875,18.949a1.574,1.574,0,0,1-1.118-.457l-6.3-6.3A1.581,1.581,0,1,1,9.695,9.959l5.18,5.212,5.2-5.007a1.574,1.574,0,1,1,2.173,2.267l-6.3,6.077A1.574,1.574,0,0,1,14.875,18.949Z" transform="translate(-6.996 -9.496)" fill="#fff" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="menu-form-group">
                    <label>Experience</label>
                    <div className="menu-input-block">
                        <input type="text" id="fname" name="" className="menu-form-input" placeholder="Search" />
                        <div className="menu-drop-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15.82" height="9.453" viewBox="0 0 15.82 9.453">
                                <path id="Path_15" data-name="Path 15" d="M14.875,18.949a1.574,1.574,0,0,1-1.118-.457l-6.3-6.3A1.581,1.581,0,1,1,9.695,9.959l5.18,5.212,5.2-5.007a1.574,1.574,0,1,1,2.173,2.267l-6.3,6.077A1.574,1.574,0,0,1,14.875,18.949Z" transform="translate(-6.996 -9.496)" fill="#fff" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="menu-form-group">
                    <label>Job Type</label>
                    <div className="menu-input-block">
                        <input type="text" id="fname" name="" className="menu-form-input" placeholder="Search" />
                        <div className="menu-drop-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15.82" height="9.453" viewBox="0 0 15.82 9.453">
                                <path id="Path_15" data-name="Path 15" d="M14.875,18.949a1.574,1.574,0,0,1-1.118-.457l-6.3-6.3A1.581,1.581,0,1,1,9.695,9.959l5.18,5.212,5.2-5.007a1.574,1.574,0,1,1,2.173,2.267l-6.3,6.077A1.574,1.574,0,0,1,14.875,18.949Z" transform="translate(-6.996 -9.496)" fill="#fff" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="menu-form-group">
                    <Link to="/home" className="btn btn-details">Confirm</Link>
                    <Link to="/home" className="menu-skip">Skip</Link>
                </div>
            </form>
        </div>
    );
}

export default Menu;