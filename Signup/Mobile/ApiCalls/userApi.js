import { useEffect } from "react";

const registerUser = async (phno, sessionId, userOtp) => {
  let registerResponse = await fetch(
    "http://localhost:5000/register",
    {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contactNumber: phno,
        sessionID: sessionId,
        code: userOtp,
        password: "password",
      }),
    }
  );
  let registerResponseData = await registerResponse.json();
  return registerResponseData;
};

const countDown = (timer, setTimer) => {
  let stop;
  if (timer >= 0) {
    stop = setTimeout(() => {
      setTimer(timer);
    }, 1000);
  } else {
    clearInterval(stop);
  }
};

const sendOtp = async (phno) => {
  let response = await fetch(
    `http://localhost:5000/sendOTP?contactNumber=+91${phno}`
  );
  let responseData = await response.json();
  if (responseData.success === true) {
    return responseData;
  } else {
    return false;
  }
};

// const verifyOtp = async (sessionId, otp) => {
//   let response = await fetch(
//     `https://2factor.in/API/V1/ac5a30a8-c579-11e8-a895-0200cd936042/SMS/VERIFY/${sessionId}/${otp}`
//   );
//   let responseData = await response.json();
//   if (responseData.Status == "Success") {
//     return responseData;
//   } else {
//     return false;
//   }
// };

const isUserRegistered = async (phno, sessionId, userOtp) => {
  let registerResponse = await fetch(
    " http://localhost:5000/login",
    {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contactNumber: phno,
        sessionID: sessionId,
        code: userOtp,
        password: "password",
      }),
    }
  );

  let registerResponseData = await registerResponse.json();
  console.log("in userApi: ", registerResponseData);
  return registerResponseData;
};

export { registerUser, countDown, sendOtp, isUserRegistered };

async function sum() {
  return 1;
}
