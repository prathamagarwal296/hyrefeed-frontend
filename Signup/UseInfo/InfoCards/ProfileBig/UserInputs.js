import React, { useState } from 'react';
import { Radio } from '../../../../Inputs/Radio';
import { profileBigFromHandler } from '../../HandleForms/formHandler';
import TodaysDate from '../../TodaysDate';

const UserInputs = (props) => {

    return (
        <form id="userinputs" className="user-profile-form">
            <div className="profile-group">
                <label style={{ borderLeft: "2px solid #FFCF44" }} className="profile-label">Name</label>
                <div className="profile-input-group">
                    <input onChange={(event) => profileBigFromHandler(event, props.setProfileInputs, props.profileInputs)}
                        className="profile-input profile-name" placeholder="First Name" type="text" name="firstName"
                        value={props.profileInputs.firstName}
                        required
                    />
                    <p id="firstName">{props.validate.nameError}</p>

                    <input onChange={(event) => profileBigFromHandler(event, props.setProfileInputs, props.profileInputs)}
                        name="lastName" className="profile-input profile-name" placeholder="Last Name" type="text"
                        value={props.profileInputs.lastName}
                        required
                    />
                    {/* <p id="lastName">{props.validate.lastNameError}</p> */}
                </div>
            </div>
            <div className="profile-group">
                <label style={{ borderLeft: "2px solid #FFFF77" }} className="profile-label">Mobile number</label>
                <input onWheel={(e) => { e.currentTarget.blur(); }} onChange={(event) => profileBigFromHandler(event, props.setProfileInputs, props.profileInputs)}
                    name="phno" id="profile-ph" className="profile-input profile-normal" placeholder="8989546123"
                    type="number" value={props.profileInputs.phno}
                    required
                />
                <span  id="ph-code">+91</span>
                <p id="phno">{props.validate.phnoError}</p>
            </div>
            <div className="profile-group">
                <label style={{ borderLeft: "2px solid #FF6859" }} className="profile-label">Email</label>
                <input onChange={(event) => profileBigFromHandler(event, props.setProfileInputs, props.profileInputs)}
                    name="email" className="profile-input profile-normal" placeholder="Eg. abc@xxxx.com" type="email"
                    value={props.profileInputs.email}
                    required
                />
                <p id="email">{props.validate.emailError}</p>
            </div>
            <div className="profile-group">
                <label style={{ borderLeft: "2px solid #FF9A86" }} className="profile-label">Gender</label>
                <input
                    style={{ width: "100%" }} className="profile-input profile-normal" disabled type="email" />
                <div onChange={(event) => profileBigFromHandler(event, props.setProfileInputs, props.profileInputs)} id="radio-gender">
                    <div>
                        <Radio name="gender" value="Male" gender={props.profileInputs.gender} /><span>Male</span>
                    </div>
                    <div>
                        <Radio name="gender" value="Female" gender={props.profileInputs.gender} /><span>Female</span>
                    </div>
                </div>
            </div>
            <div className="profile-group">
                <label style={{ borderLeft: "2px solid #FFBE86" }} className="profile-label">Date of birth </label>
                <input onChange={(event) => profileBigFromHandler(event, props.setProfileInputs, props.profileInputs)}
                    style={{ width: "100%", padding: "1rem 0rem 1rem 1rem" }} className="profile-input profile-normal"
                    name="date" type="date" value={props.profileInputs.date} 
                    max={TodaysDate()} required />
                    <p id="date" >{props.validate.dateError}</p>
            </div>
        </form>
    )
}

export default UserInputs;