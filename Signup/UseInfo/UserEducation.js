import { React, useState, useEffect, Fragment } from 'react';
import ProfileBig from './InfoCards/ProfileBig/ProfileBig';
import './usereducation.css';
import Select from '../../Inputs/Select'
import RouteButton from './RouteButtons';
import { handleEducation } from './HandleForms/formHandler';
import { CheckBox } from '../../Inputs/Radio';
import { useHistory } from 'react-router';

const UserEducation = (props) => {

    let [height, setHeight] = useState(0);
    let [width, setWidth] = useState(0);
    let [grid, setGrid] = useState("1fr 4fr");
    let [edDetails, setEdDetails] = useState({
        education: [{}],
        certificate: [{}],
    });
    const [btnDisplay, setBtnDisplay] = useState('none');
    const history = useHistory();

    const onAddEducation = () => {
        console.log(edDetails);
        let newEducation = [...edDetails.education, {}];
        setEdDetails({
            ...edDetails,
            education: newEducation,
        });
    }
    const onAddCertificate = () => {
        let newCertificate = [...edDetails.certificate, {}];
        setEdDetails({
            ...edDetails,
            certificate: newCertificate,
        });
    }
    useEffect(() => {
        // Update the document title using the browser API
        updateWindowDimensions();
        window.addEventListener('resize', updateWindowDimensions);
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

            let education = [{}];
            let certificate = [{}];

            if (userData.educations) {
                education = userData.educations
            }
            if (userData.certifications) {
                certificate = userData.certifications
            }
            setEdDetails({
                education: education,
                certificate: certificate
            });
            setBtnDisplay('');
        }

    }

    useEffect(() => {
        getUserDetails();
    }, []);

    const saveData = () => {

        let data = {
            educations: JSON.stringify(edDetails.education),
            certifications: JSON.stringify(edDetails.certificate),
        };

        let form_data = new FormData();

        Object.keys(data).forEach((key) => form_data.append(key, data[key]));

        console.log("data: ",data);

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
            })
            .catch((err) => {
                console.log(JSON.stringify(err));
            });
    }

    const updateWindowDimensions = () => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
        if (width <= 600) {
            setGrid("1fr 2.5fr");
        }
        else {
            setGrid("1fr 4fr");
        }
    }
    return (
        <div className="education-gird">
            <div className="educationInfo-top">
                {edDetails.education.map((item, i) => {
                    return (
                        <Fragment>
                            <h1 className="userEducation-header">Education {i + 1} </h1>
                                {i && <button style={{margin:'1rem 2rem', padding: '1rem 2rem'}} className="removeedu">Remove</button>}
                            <div className="education-inputs">
                                <div>
                                    <Select changeHandler={(event) => { handleEducation(event, edDetails, setEdDetails, i) }} profileInputs={edDetails.education[i].institute} setProfileInputs={setEdDetails} name="institute" grid={grid} label="Institute" color="#FFCF44" />
                                    <div id="ed-batch" className="education-year">
                                        <label style={{ borderLeft: "2px solid #FFFF77" }} id="education-bacth">Batch</label>
                                        <div>
                                            <input style={{ color: "#fff" , width: "37%"}} type="date" max="2021-01-01" value={edDetails.education[i].from} onChange={(event) => { handleEducation(event, edDetails, setEdDetails, i) }} name="from" />
                                            <label id="education-yaer-text">To</label>
                                            <input style={{ color: "#fff" , width: "37%"}} type="date" max="2021-01-01" value={edDetails.education[i].to} onChange={(event) => { handleEducation(event, edDetails, setEdDetails, i) }} name="to" />
                                        </div>
                                    </div>
                                    <Select changeHandler={(event) => { handleEducation(event, edDetails, setEdDetails, i) }} profileInputs={edDetails.education[i].courseType} setProfileInputs={setEdDetails} name="courseType" grid={grid} label="Course Type" color="#FF6859" />
                                    <Select changeHandler={(event) => { handleEducation(event, edDetails, setEdDetails, i) }} profileInputs={edDetails.education[i].degree} setProfileInputs={setEdDetails} name="degree" grid={grid} label="Degree" color="#FF9A86" />
                                    <div className="input-button">
                                        <div></div>
                                        <button onClick={onAddEducation} className="btn btn-add-file">+ Add Degree</button>
                                    </div>
                                </div>
                                <div style={{marginTop:'2.6rem'}}>
                                    <CheckBox type="checkbox" id="confidentialCheck" name="confidentialCheck" /> 
                                </div>
                                <label style={{ color: "#fff", marginTop:'2.6rem', marginLeft:'-7rem', fontSize: '1.25rem'  }}> This is my most relevant / important educational qualification </label>
                            </div>
                        </Fragment>
                    )
                })
                }
            </div>
            <div className="educationInfo-top">
                {edDetails.certificate.map((item, i) => {
                    return (
                        <Fragment>
                            <h1 className="userEducation-header">Certifications {i + 1}</h1>
                            {i && <button style={{margin:'1rem 2rem', padding: '1rem 2rem'}} className="removeedu">Remove</button>}
                            <div className="certification-inputs">
                                <div className="newlyAdded">
                                    <div className="profile-group profile-group-education">
                                        <label id="profile-label-education" style={{ borderLeft: "2px solid #B15DFF" }} className="profile-label">Certification</label>
                                        <input className="profile-input profile-normal" placeholder="Certificate" type="text"
                                            onChange={(event) => { handleEducation(event, edDetails, setEdDetails, i) }}
                                            value={edDetails.certificate[i].Certification}
                                            name="Certification"
                                        />
                                    </div>
                                    <Select changeHandler={(event) => { handleEducation(event, edDetails, setEdDetails, i) }} profileInputs={edDetails.certificate[i].certInstitute} setProfileInputs={setEdDetails} name="certInstitute" grid={grid} label="Institute" color="#E78EFF" />
                                    <div className="education-year">
                                        <label style={{ borderLeft: "2px solid #72DEFF" }} id="education-bacth">Batch</label>
                                        <div>
                                            <input style={{ color: "#fff" }} type="date" max="2021-01-01" placeholder="YYYY" name="cfrom"
                                                value={edDetails.certificate[i].cfrom} max="2021-01-01" onChange={(event) => { handleEducation(event, edDetails, setEdDetails, i) }}
                                            />
                                            <label id="education-yaer-text">To</label>
                                            <input style={{ color: "#fff" }} type="date" max="2021-01-01" placeholder="YYYY" name="cto"
                                                value={edDetails.certificate[i].cto} max="2021-01-01" onChange={(event) => { handleEducation(event, edDetails, setEdDetails, i) }}
                                            />
                                        </div>
                                    </div>
                                    <Select changeHandler={(event) => { handleEducation(event, edDetails, setEdDetails, i) }} profileInputs={edDetails.certificate[i].certType} setProfileInputs={setEdDetails} name="certType" grid={grid} label="Type" color="#A9FFFF" />
                                    <div className="input-button">
                                        <div></div>
                                        <button onClick={onAddCertificate} className="btn btn-add-file">+ Add Certification</button>
                                    </div>
                                </div>
                                <div></div>
                            </div>
                        </Fragment>
                    )
                })}

            </div>
            <div style={{ display: btnDisplay }} onClick={saveData} >
                <RouteButton linkBack="/user/profile" displayBack={true} linkNext="/user/pro" />
            </div>
        </div>
    )
}
export default UserEducation;