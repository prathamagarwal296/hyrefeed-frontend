import { React, useState, useEffect, Fragment } from "react";
import RouteButton from "./RouteButtons";
import { SkillPill, SuggestPill } from "./SkillPill";
import Select from "../../Inputs/Select";
import "./userpro.css";
import { CheckBox, Radio, RadioSquare } from "../../Inputs/Radio";
import { handleProForm } from "./HandleForms/formHandler";
import { useHistory } from "react-router-dom";

const UserPro = (props) => {

  const history = useHistory();

  const [pro, setPro] = useState({
    position: [{}],
    skills: [],
  });
  const [btnDisplay, setBtnDisplay] = useState('none');

  const addPro = () => {
    let newPosition = [...pro.position, {}];
    setPro({
      ...pro,
      position: newPosition,
    });
  };

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

      let position = [{}];
      let skills = [];
      if (userData.professionalDetails) {
        position = userData.professionalDetails;
      }
      if (userData.skills) {
        skills = userData.skills;
      }
      setPro({
        position: position,
        skills: skills
      });
      setBtnDisplay('');
    }

  }

  useEffect(() => {
    getUserDetails();
  }, []);

  const saveData = async () => {

    let data = {
      skills: JSON.stringify(pro.skills),
      professionalDetails: JSON.stringify(pro.position)
    };

    let form_data = new FormData();

    Object.keys(data).forEach((key) => form_data.append(key, data[key]));

    console.log('data: ',data);

    await fetch(" http://localhost:5000/user/update", {
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
        console.log(res);
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
      });
  };

  const addSkill = (e) => {
    if (e.key === "Enter") {

      let skillInput = document.getElementById("skill-input");
      let skillText = skillInput.value;
      document.getElementById("skill-input").value = "";
      let skillsArray = pro.skills;
      skillsArray.push(skillText);
      setPro({
        ...pro,
        skills: skillsArray,
      });
    }
    return;
  };

  const getSkillPills = () => {
    console.log("skills set");
    let skills = pro.skills;
    let skillPills = skills.map((skillText, i) => (
      <SkillPill removeSkillPill={removeSkillPill} index={i} skillName={skillText} />
    ));
    return skillPills;
  };

  const removeSkillPill = (index) => {
    console.log('remove skill pill ', index);
    let skills = pro.skills;

    skills.splice(index, 1);
    setPro({
      ...pro,
      skills: skills
    });
  }


  // const currentCheck = (i) => {
  //   alert('check');
  //   let toDate = document.getElementById('to'+i);
  //   toDate.style.display = "none";
  // }

  return (
    <div className="education-gird">
      <div className="educationInfo-top">
        {pro.position.map((item, i) => {
          return (
            <Fragment>
              <h1 id="pro-header" className="userEducation-header">
                Professional Details {i + 1}
              </h1>
              {i && <button style={{margin:'1rem 2rem', padding: '1rem 2rem'}} className="removepro1">Remove</button>}
              <div className="pro-inputs">
                <div className="profNet">
                  <div className="profile-group profile-group-education">
                    <label
                      id="profile-label-education"
                      style={{ borderLeft: "2px solid #B15DFF" }}
                      className="profile-label"
                    >
                      Designation
                    </label>
                    <input
                      className="profile-input profile-normal"
                      placeholder="Designation"
                      type="text"
                      name="designation"
                      value={pro.position[i].designation}
                      onChange={(event) => {
                        handleProForm(event, pro, setPro, i);
                      }}
                    />
                  </div>
                  <div
                    id="pro-org"
                    className="profile-group profile-group-education"
                  >
                    <label
                      id="profile-label-education"
                      style={{ borderLeft: "2px solid #B15DFF" }}
                      className="profile-label"
                    >
                      Organization
                    </label>
                    <input
                      className="profile-input profile-normal"
                      placeholder="Organisation"
                      type="text"
                      name="organisation"
                      value={pro.position[i].organisation}
                      onChange={(event) => {
                        handleProForm(event, pro, setPro, i);
                      }}
                    />
                  </div>
                  <div className="education-year" id="pro-year">
                    <label
                      style={{ borderLeft: "2px solid #72DEFF" }}
                      id="education-bacth"
                    >
                      Time Period
                    </label>
                    <div className="month-year">
                      <div className="">
                        <input
                          style={{ color: "#fff" }}
                          name="fromMonth"
                          type="number"
                          placeholder="Month"
                          value={pro.position[i].fromMonth}
                          onChange={(event) => {
                            handleProForm(event, pro, setPro, i);
                          }}
                        />
                        <input
                          style={{ color: "#fff" }}
                          name="fromYear"
                          type="number"
                          placeholder="YEAR"
                          value={pro.position[i].fromYear}
                          onChange={(event) => {
                            handleProForm(event, pro, setPro, i);
                          }}
                        />
                        <label id="education-yaer-text">To</label>
                      </div>

                      <div id={'to' + i}>
                        <input
                        style={{ color: "#fff" }}
                          name="toMonth"
                          type="number"
                          placeholder="Month"
                          value={pro.position[i].toMonth}
                          onChange={(event) => {
                            handleProForm(event, pro, setPro, i);
                          }}
                        />
                        <input
                        style={{ color: "#fff" }}
                          name="toYear"
                          type="number"
                          placeholder="YEAR"
                          value={pro.position[i].toYear}
                          onChange={(event) => {
                            handleProForm(event, pro, setPro, i);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="input-button">
                    <div></div>
                    <button onClick={addPro} className="btn btn-add-file">
                      + Add Position
                    </button>
                  </div>
                </div>
                {/* <div id="square-check">
                  <CheckBox name={'current' + i} type="checkbox" />
                </div>
                <label>I currently work here</label> */}
                <div style={{marginTop:'2.6rem'}}>
                  <CheckBox type="checkbox" id="confidentialCheck" name={'current' + i} /> 
                </div>
                <label style={{ color: "#fff", marginTop:'2.6rem', marginLeft:'-7rem', fontSize: '1.25rem'  }}>I currently work here</label>
              </div>
            </Fragment>
          );
        })}
      </div>
      <div className="educationInfo-top">
        <h1 id="pro-header" className="userEducation-header">
          Skills
        </h1>
        <div className="pro-input-group">
          <input
            type="text"
            placeholder="Enter skill"
            name="skillName"
            id="skill-input"
            onKeyDown={addSkill}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g id="Layer_2" data-name="Layer 2" opacity="0.4">
              <g id="search">
                <rect
                  id="Rectangle_3868"
                  data-name="Rectangle 3868"
                  width="24"
                  height="24"
                  fill="#fff"
                  opacity="0"
                />
                <path
                  id="Path_2654"
                  data-name="Path 2654"
                  d="M20.71,19.29l-3.4-3.39A7.92,7.92,0,0,0,19,11a8,8,0,1,0-8,8,7.92,7.92,0,0,0,4.9-1.69l3.39,3.4a1,1,0,1,0,1.42-1.42ZM5,11a6,6,0,1,1,6,6,6,6,0,0,1-6-6Z"
                  fill="#fff"
                />
              </g>
            </g>
          </svg>
        </div>
        <span id="skill-limit">Add maximum 10 skills</span>
        <div className="pro-skill-container">
          <span>Added skills</span>
          <div className="pro-pill-container">
            {getSkillPills()}
            {/* <SkillPill skillName="Digital marketing" />
                        <SkillPill skillName="SAS" />
                        <SkillPill skillName="React js" />
                        <SkillPill skillName="Financial Analyst" /> */}
          </div>
        </div>
        {/* <div className="pro-skill-container">
                    <span>Suggested skills</span>
                    <div className="pro-pill-container">
                        <SuggestPill skillName="Digital marketing" />
                        <SuggestPill skillName="Digital marketing" />
                        <SuggestPill skillName="Digital marketing" />
                    </div>
                </div> */}
      </div>
      <div style={{ display: btnDisplay }} onClick={saveData}>
        <RouteButton linkNext="/home/user" linkBack="/user/education" displayBack={true} />
      </div>
    </div>
  );
};
export default UserPro;
