import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import "../signup.css";
import { sendOtp } from "./ApiCalls/userApi";
import firebase from "../../../firebase";

const MobileLogin = (props) => {
  let [displayPh, setDisplayPh] = useState(true);
  let [error, setError] = useState('');
  // let [error, setError] = useState({ err: false, type: "", message: "" });


  const onInputPhone = () => {
    setDisplayPh(false);
  };

  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const setUpRecaptcha = () => {

    if (window.recaptchaVerifier) { return; }

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "invisible-recaptcha",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          //   onSubmit();
        },
      }
    );
  };

  const onSubmit = async (data) => {
    setError('');
    //setUpRecaptcha();
    await fetch(
      ` http://localhost:5000/user/doesExists/91${data.phno}`,
      { credentials: "include" }
    ).then(async (response) => {
      let r = await response.json();
      console.log("here");
      if (r.success === true) {
        const phoneNumber = "+91" + data.phno;
        console.log(phoneNumber);
        const appVerifier = window.recaptchaVerifier;
        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            console.log(confirmationResult);
            window.confirmationResult = confirmationResult;
            props.setPhoneNumber(data.phno);
            history.push("/login/mobile/otp");
          })
          .catch((error) => {
            console.log("error in sendOtp", error);

            if (error.code === "auth/invalid-phone-number") {
              setError("Invalid phone number");
            }

            // Error; SMS not sent
            // ...
          });
      } else {
        history.push("/login/signup");
      }
    });
  };

  useEffect(() => {

    fetch('http://localhost:5000/isLoggedIn', 
    { credentials: "include" })
      .then((res) => res.json())
      .then(res => {
        console.log('res', res);
        if (res.success) {
          console.log('Logged in true');
          history.replace('/home/user');
        }
      });

    setUpRecaptcha();
  }, []);

  // const onSubmit = async (data) => {
  //     let response = await sendOtp(data.phno);
  //     if (response) {
  //         props.setOtpSession(response.response);
  //         props.setPhoneNumber(data.phno);
  //         history.push("/login/mobile/otp");
  //     }
  //     else {
  //         setError({
  //             err: true,
  //             type: "otp",
  //             message: "otp falied"
  //         });
  //     }
  // }
  return (
    <div class="signup-form">
      <h1 className="text-signup">Log in</h1>
      <p id="otp-tag">Choose registered mobile number to Login</p>
      <form
        className="form"
        autocomplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-group">
          <input
            ref={register({
              required: "phone number is required",
              maxLength: { value: 10, message: "Invalid phone number" },
              minLength: { value: 10, message: "Invalid phone number" },
              pattern: { value: /[0-9]|\./, message: "Invalid phone number" },
            })}
            name="phno"
            type="tel"
            onInput={onInputPhone}
            id="login-phonenumber"
            className="form-input"
            placeholder=""
          />
          <p id="login-phone">
            <span id="login-area">+91</span>
            {displayPh && 8660963054}
          </p>
          <div id="input-error-phno">
            {errors.phno?.type === "required" && " Phone number is required"}
            {errors.phno?.type === "maxLength" && "Invalid phone number"}
            {errors.phno?.type === "minLength" && "Invalid phone number"}
            {error}
          </div>
        </div>
        <div id="invisible-recaptcha"></div>
        <div className="form-group">
          {/* <Link to="/login/mobile/otp" style={{ textDecoration: 'none' }}> */}
          <button type="submit" className="form-input btn-login btn">
            Log in
          </button>
          {/* </Link> */}
        </div>
      </form>
      <Link to="/login/signup" style={{ textDecoration: "none" }}>
        <p className="text">
          Don't have an account? <span className="login-link">Sign up.</span>
        </p>
      </Link>
    </div>
  );
};
export default MobileLogin;
