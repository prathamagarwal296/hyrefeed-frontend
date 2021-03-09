import { React, useState, Fragment, useEffect } from "react";
import ProfileBig from "./ProfileBig/ProfileBig";
import ProfileSmall from "./ProfileSmall/ProfileSmall";
import ProfileImage from "./ProfileBig/ProfileImage";
import "./profilecard.css";
import UserInputs from "./ProfileBig/UserInputs";
import Select from "../../../Inputs/Select";
import { CheckBox } from "../../../Inputs/Radio";
import { profileBigFromHandler } from "../HandleForms/formHandler";
import { useHistory } from "react-router-dom";

const ProfileCards = (props) => {

    const history = useHistory();
    const [refresh, setRefresh] = useState(true);
    const [btnDisplay, setBtnDisplay] = useState('none');
    const [validate, setValidate] = useState({
        nameError: "",
        phnoError: "",
        emailError: "",
        dateError: ""
    });

    let [profileInputs, setProfileInputs] = useState({
        fileName: "",
        firstName: "",
        lastName: "",
        phno: "",
        date: "",
        email: "",
        gender: "",
        industry: "",
        resume: "",
        functionalArea: "",
        noticePeriod: "",
        experience: "",
        location: "",
        salary: "",
        expSalary: "",
        hideSalary: false,
        salaryNegotiable: false,
        profileTag: ""
    });

    const getUserDetails = async () => {

        let response = await fetch(
            "http://localhost:5000/user/update",
            {
                method: "GET",
                credentials: "include",
            }
        );
        let json = await response.json();
        console.log(json.user);
        if (json.error) history.push("../../login");
        let userData = json.user.user;
        console.log("user data from server: ", userData);

        if (userData) {
            let profileData = {
                fileName: userData.profileImage,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phno: userData.contactNumber.substring(2),
                date: userData.dateOfBirth,
                email: userData.email,
                gender: userData.gender,
                industry: userData.industry ? userData.industry : "",
                resume: userData.resume ? userData.resume : "",
                functionalArea: userData.functionalArea ? userData.functionalArea : "",
                noticePeriod: userData.noticePeriod ? userData.noticePeriod : "",
                experience: userData.experience ? userData.experience : "",
                location: userData.city ? userData.city : "",
                salary: userData.annualSalary ? userData.annualSalary : "",
                expSalary: userData.expectedSalary ? userData.expectedSalary : "",
                hideSalary: userData.hideSalary,
                salaryNegotiable: userData.salaryNegotiable,
                profileTag: userData.tagline ? userData.tagline : "",
            };

            setProfileInputs(profileData);
            setBtnDisplay('');
        }

    };

    useEffect(() => {

        getUserDetails();

    }, []);

    const saveData = () => {

        let err = false;

        let nameError, phnoError, emailError, dateError;
        nameError = phnoError = emailError = dateError = "";

        if (!profileInputs.firstName) {
            nameError = "Name Required"
            err = true;
        }
        if (!profileInputs.lastName) {
            nameError = "Name Required"
            err = true;
        }
        if (!profileInputs.phno && (profileInputs.phno).length != 10) {
            phnoError = "Phone Number Required"
            err = true;
        }
        if (!profileInputs.email || !((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(profileInputs.email)))) {
            emailError = "Email Required"
            err = true;
        }
        if (!profileInputs.date) {
            dateError = "Date Required"
            err = true;
        }
        setValidate({
            nameError: nameError,
            phnoError: phnoError,
            emailError: emailError,
            dateError: dateError
        });
        if (err) {
            window.scrollTo(0, 0)
            return;
        }

        let resume = document.querySelector('#resumeId');
        resume = resume.files[0];

        let profileImage = {};
        if (window.profileImage) {
            profileImage = window.profileImage.files[0];
        }
        let data = {
            firstName: profileInputs.firstName,
            lastName: profileInputs.lastName,
            contactNumber: "91" + profileInputs.phno,
            email: profileInputs.email,
            dateOfBirth: profileInputs.date,
            gender: profileInputs.gender,
            resume: resume,
            profileImage: profileImage,
            city: profileInputs.location,
            annualSalary: profileInputs.salary,
            expectedSalary: profileInputs.expSalary,
            tagline: profileInputs.profileTag,
            industry: profileInputs.industry,
            functionalArea: profileInputs.functionalArea,
            noticePeriod: profileInputs.noticePeriod,
            experience: profileInputs.experience,
            hideSalary: profileInputs.hideSalary,
            salaryNegotiable: profileInputs.salaryNegotiable,
        };

        let form_data = new FormData();

        Object.keys(data).forEach((key) => form_data.append(key, data[key]));

        console.log('data', data);

        fetch(" http://localhost:5000/user/update", {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
            },
            body: form_data,
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.error || res.success === false) {
                    history.push("/login");
                }
                console.log('res ',res);
            })
            .catch((err) => {
                console.log(JSON.stringify(err));
            })
            .finally(() => {
                window.profileImage = "";
            });

        history.push('/user/education');

    }

    const countChar = (e) => {
        var textEntered, countRemaining, counter;
        textEntered = e.target.value;
        counter = (140 - (textEntered.length));
        countRemaining = document.getElementById('remainingChar');
        countRemaining.textContent = counter;
    }

    // const isAllRequiredFilled = () => {
    //     if (profileInputs.firstName && profileInputs.lastName && profileInputs.phno && profileInputs.email && profileInputs.date) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    console.log(validate)

    return (
        <Fragment>
            <div className="profileCard-grid">
                <ProfileBig grid="1.5fr 2.3fr 3fr">
                    <ProfileImage profileImage={profileInputs.fileName} />
                    <UserInputs validate={validate} profileInputs={profileInputs} setProfileInputs={setProfileInputs} />
                    <form id="upload-container">
                        <div onClick={() => { document.getElementById("resumeId").click(); }} d="btn-profile-upload" className="btn btn-upload">
                            <label style={{ cursor: 'pointer' }} for="profile-upload-input" id="upload-label">
                                <svg style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                    <g id="Group_413" data-name="Group 413" transform="translate(-18 -18)">
                                        <path id="Path_2663" data-name="Path 2663" d="M33.188,18H20.813A2.813,2.813,0,0,0,18,20.813v2.813h2.25V20.813a.563.563,0,0,1,.563-.562H33.188a.562.562,0,0,1,.563.563v2.813H36V20.813A2.812,2.812,0,0,0,33.188,18Z" fill="#fff" />
                                        <path id="Path_2664" data-name="Path 2664" d="M38.432,47.5V37.84l2.25,2.25L42.274,38.5,38.1,34.327a1.125,1.125,0,0,0-1.592,0L32.34,38.5l1.592,1.592,2.25-2.25V47.5Z" transform="translate(-10.307 -11.498)" fill="#fff" />
                                    </g>
                                </svg>Upload Resume
                            </label>
                        </div>
                        <span id="upload-filename"><a style={{ textDecoration: "none", color: "#fff" }} href={"http://localhost:5000/" + profileInputs.resume}>{profileInputs.resume}</a></span>
                        <input style={{ display: "none" }} name="resume" id="resumeId" onChange={(e) => { let obj = profileInputs; obj["resume"] = e.target.files[0].name; setProfileInputs(obj); setRefresh(!refresh); }} type="file" accept=".pdf, .doc, .docx" />
                    </form>
                </ProfileBig>
                <ProfileSmall id="smallCard-one">
                    <form>
                        <div className="coresorClass">
                            <Select changeHandler={(event) => profileBigFromHandler(event, setProfileInputs, profileInputs)} name="industry" className="industry-grid" label="Industry" color="#B15DFF"
                                dropdownData={["software development", "software design", "product design"]} placeholder="SELECT"
                                profileInputs={profileInputs.industry}
                            />
                        </div>
                        <div className="coresorClass">
                            <Select changeHandler={(event) => profileBigFromHandler(event, setProfileInputs, profileInputs)} name="functionalArea" className="industry-grid" label="Functional area" color="#E78EFF"
                                dropdownData={["It", "Marketing", "Sales", "Management"]} placeholder="SELECT"
                                profileInputs={profileInputs.functionalArea}
                            />
                        </div>
                        <div className="coresorClass">
                            <Select changeHandler={(event) => profileBigFromHandler(event, setProfileInputs, profileInputs)} name="noticePeriod" className="industry-grid" label="Notice period" color="#72DEFF"
                                placeholder="MONTHS"
                                profileInputs={profileInputs.noticePeriod}
                            />
                        </div>
                        <div className="coresorClass">
                            <Select changeHandler={(event) => profileBigFromHandler(event, setProfileInputs, profileInputs)} name="experience" className="industry-grid" label="Experience" color="#A9FFFF"
                                dropdownData={["It", "Marketing", "Sales", "Management"]} placeholder="SELECT"
                                profileInputs={profileInputs.experience}
                            />
                        </div>
                    </form>
                </ProfileSmall>
                <ProfileSmall id="smallCard-two">
                    <div className="divided-div">
                        <div className="currLoc">
                            <Select changeHandler={(event) => profileBigFromHandler(event, setProfileInputs, profileInputs)} name="location" label="Current Location" color="#B15DFF"
                                placeholder="City"
                                profileInputs={profileInputs.location}
                            />
                        </div>
                        <div className="annSal">
                            <Select changeHandler={(event) => profileBigFromHandler(event, setProfileInputs, profileInputs)} name="salary" radio={false} radioTag="Cofidential" label="Annual Salary (INR)" color="#E78EFF"
                                placeholder="In Lakhs per annum"
                                profileInputs={profileInputs.salary}
                            />
                            <div style={{ alignItems: "center" }}> <CheckBox id="confidentialCheck" name="hideSalary" changeHandler={() => { let obj = profileInputs; obj["hideSalary"] = !(profileInputs.hideSalary); setProfileInputs(obj); setRefresh(!refresh); }} isChecked={profileInputs.hideSalary} /> </div>
                            <label style={{ color: "#fff", marginLeft:'-3rem', fontSize: '1.5rem' }}> Confidential </label>
                        </div>
                        <div className="expecSal">
                            <Select changeHandler={(event) => profileBigFromHandler(event, setProfileInputs, profileInputs)} name="expSalary" radio={false} radioTag="Negotiable" label="Expected Salary (INR)" color="#72DEFF"
                                placeholder="In Lakhs per annum"
                                profileInputs={profileInputs.expSalary}
                            />
                            <div> <CheckBox id="negotiableCheck" name="salaryNegotiable" changeHandler={() => { let obj = profileInputs; obj["salaryNegotiable"] = !(profileInputs.salaryNegotiable); setProfileInputs(obj); setRefresh(!refresh); }} isChecked={profileInputs.salaryNegotiable} /> </div>
                            <label style={{ color: "#fff", marginLeft:'-3rem', fontSize: '1.5rem' }}> Negotiable </label>
                        </div>
                        <div className="textareaSection">
                            <div id="profile-tag">
                                <label style={{ borderLeft: "2px solid #FFCF44" }} className="profile-label">Profile Tagline
                                <br />
                                    <span style={{ fontSize: "1.2rem" }}>Characters remaining <span id="remainingChar">140</span></span></label>
                                <textarea onChange={(event) => profileBigFromHandler(event, setProfileInputs, profileInputs)} onKeyUp={(event) => countChar(event)} id="profile-tag-input" name="profileTag" maxLength="140" placeholder="About yourself (Max 140 characters)" style={{ width: "100%" }} value={profileInputs.profileTag}>

                                </textarea>
                                {/* <p>Characters remaining <span id="remainingChar">140</span></p> */}
                            </div>
                        </div>
                    </div>
                </ProfileSmall>
            </div>

            <div style={{ display: btnDisplay }} onClick={saveData} className="profile-routebutton">
                <div style={{ textDecoration: "none", cursor: "pointer" }} className="btn btn-profileActions">Save and continue</div>
            </div>

        </Fragment>
    )
}
export default ProfileCards;
