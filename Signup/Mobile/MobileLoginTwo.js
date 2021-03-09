import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../../firebase";

import "../signup.css";
import { useForm } from "react-hook-form";
import { countDown, isUserRegistered } from "./ApiCalls/userApi";

const MobileLoginTwo = (props) => {
  const { register, handleSubmit, errors } = useForm();
  let [error, setError] = useState({ err: false, message: "" });
  let [timer, setTimer] = useState(30);
  let otpStyle = error.err
    ? { border: "2px solid rgba(231, 0, 0, 0.397)" }
    : {};
  let history = useHistory();

  const onSubmit = async (data) => {
    let phno = "91" + props.phno;
    //let sessionId = props.sessionObj.Details;
    let userOtp =
      data.otp1 + data.otp2 + data.otp3 + data.otp4 + data.otp5 + data.otp6;

    const code = userOtp;
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(code)
      .then(async (result) => {
        // User signed in successfully.
        const user = result.user;
        console.log("signedin true: ", user);
        await fetch(" http://localhost:5000/login", {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contactNumber: phno,
            password: "password",
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.id) {
              localStorage.setItem("user_id", res.id);
              history.push("/home/user");
            } else {
              throw error;
            }
          })
          .catch((err) => {
            console.log("login failed", err);
            setError({
              err: true,
              type: "phno",
              message: "This phone number is not registered, please register",
            });
          });
        // ...
      })
      .catch((error) => {
        for (let i = 1; i <= 6; i++) {
          let otp_box = document.getElementsByName("otp" + i)[0];
          otp_box.style["borderColor"] = "var(--orange)";
        }

        console.log("Otp failed", error);
        setError({
          err: true,
          type: "phno",
          message: "Incorrect otp",
        });
      });

    // let verifiedData = await verifyOtp(sessionId, userOtp);
    // if (verifiedData) {
    // let loginResponse = await isUserRegistered(phno, sessionId, userOtp);
    // console.log(loginResponse);
    // if (loginResponse.id) {
    //   // await fetch("http://localhost:5000/job/1/video?videoID=2", {
    //   //   method: "GET",
    //   //   credentials: "include",
    //   //   headers: new Headers({
    //   //     Accept: "application/json",
    //   //     "Access-Control-Allow-Origin": "http://localhost:5000/",
    //   //     "Content-Type": "application/json",
    //   //   }),
    //   // })
    //   //   .then((response) => response.json())
    //   //   .then((data) => console.log(data));
    //   localStorage.setItem("user_id", loginResponse.id);
    //   history.push("/home/user");
    // } else {
    //   setError({
    //     err: true,
    //     type: "phno",
    //     message: "This phone number is not registered, please register, or incorrect otp",

    //   });
    // }

    // } else {
    //   setError({
    //     err: true,
    //     type: "otp",
    //     message: "Invalid otp",
    //   });
    // }
  };

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('invisible-recaptcha', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        //onSubmit();
      }
    });
  }


  const resendOtp = () => {

    //setUpRecaptcha();
    const phoneNumber = "+91" + props.phno;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        console.log(confirmationResult);
        window.confirmationResult = confirmationResult;
      }).catch((error) => {
        console.log('error in resendOtp', error);
        // Error; SMS not sent
        // ...
      });

    // fetch(`http://localhost:5000/sendOTP?contactNumber=+91${props.phno}`)
    //   .then((res) => res.json())
    //   .then((responseData) => {
    //     props.setOtpSession(responseData.response);
    //     alert('OTP resent');
    //   })
    //   .catch((err) => {
    //     console.log('error resending otp: ', err);
    //   });
  }


  useEffect(() => {
    countDown(timer - 1, setTimer);
  }, [timer]);

  useEffect(() => {
    setUpRecaptcha();
  }, []);

  let message = null;
  if (error.type === "otp") {
    message = (
      <p style={{ color: "#F17777" }} id="otp-resend">
        {error.message}
        <span id="resend-otp-click" style={{ color: "#32AFB5" }}>
          {" "}
          Resend
        </span>
      </p>
    );
  } else if (error.type === "phno") {
    message = (
      <p style={{ color: "#F17777" }} id="otp-resend">
        {error.message}
      </p>
    );
  } else if (timer <= 0) {
    message = (
      <p id="otp-resend" onClick={resendOtp} style={{ cursor: "pointer" }}>
        Resent OTP
      </p>
    );
  }
  return (
    <div className="signup-form">
      <h1 className="text-signup" id="otp-header">
        Verify Details
      </h1>
      <p id="otp-tag">OTP sent on your mobile number</p>
      <form
        className="form"
        autocomplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-otp-group">
          <input
            type="tel"
            name="otp1"
            className="form-otp-input"
            size="1"
            maxLength="1"
            placeholder="_"
            autoFocus
            onChange={() => {
              if (document.querySelector(`input[name=otp1]`).value != "")
                document.querySelector(`input[name=otp2]`).focus();
            }}
            ref={register({ required: true })}
          />
          <input
            type="tel"
            name="otp2"
            className="form-otp-input"
            size="1"
            maxLength="1"
            placeholder="_"
            onChange={() => {
              document.querySelector(`input[name=otp2]`).value === "" ||
                document.querySelector(`input[name=otp2]`).value === null
                ? document.querySelector(`input[name=otp1]`).focus()
                : document.querySelector(`input[name=otp3]`).focus();
            }}
            ref={register({ required: true })}
          />
          <input
            type="tel"
            name="otp3"
            className="form-otp-input"
            size="1"
            maxLength="1"
            placeholder="_"
            onChange={() => {
              document.querySelector(`input[name=otp3]`).value === "" ||
                document.querySelector(`input[name=otp3]`).value === null
                ? document.querySelector(`input[name=otp2]`).focus()
                : document.querySelector(`input[name=otp4]`).focus();
            }}
            ref={register({ required: true })}
          />
          <input
            type="tel"
            name="otp4"
            className="form-otp-input"
            size="1"
            maxLength="1"
            placeholder="_"
            onChange={() => {
              document.querySelector(`input[name=otp4]`).value === "" ||
                document.querySelector(`input[name=otp4]`).value === null
                ? document.querySelector(`input[name=otp3]`).focus()
                : document.querySelector(`input[name=otp5]`).focus();
            }}
            ref={register({ required: true })}
          />
          <input
            type="tel"
            name="otp5"
            className="form-otp-input"
            size="1"
            maxLength="1"
            placeholder="_"
            onChange={() => {
              document.querySelector(`input[name=otp5]`).value === "" ||
                document.querySelector(`input[name=otp5]`).value === null
                ? document.querySelector(`input[name=otp4]`).focus()
                : document.querySelector(`input[name=otp6]`).focus();
            }}
            ref={register({ required: true })}
          />
          <input
            type="tel"
            name="otp6"
            className="form-otp-input"
            size="1"
            maxLength="1"
            placeholder="_"
            onChange={() => {
              if (
                document.querySelector(`input[name=otp6]`).value === "" ||
                document.querySelector(`input[name=otp6]`).value === null
              )
                document.querySelector(`input[name=otp5]`).focus();
            }}
            ref={register({ required: true })}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="form-input btn">
            Proceed
          </button>
        </div>
      </form>
      <div id="invisible-recaptcha"></div>
      {error.err ? (
        message
      ) : timer <= 0 ? (
        <p onClick={resendOtp} style={{ color: "#32AFB5", cursor: "pointer" }} id="otp-resend">
          Resend OTP
        </p>
      ) : (
        <p id="otp-resend">
          Resend OTP in {timer} seconds
        </p>
      )}
    </div>
  );
};
export default MobileLoginTwo;
