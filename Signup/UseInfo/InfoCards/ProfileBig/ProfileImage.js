import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./profileimage.css";

var imgSrc = "";

const ProfileImage = (props) => {

  // const [imgSrc, setImgSrc] = useState("");
  const [refresh, setRefresh] = useState(false);

  const onChangeHandler = () => {
    console.log('Profile Image On Change');
    let avatar = document.querySelector("#avatar");
    if (avatar.files && avatar.files[0]) {
      window.profileImage = avatar;
      imgSrc = URL.createObjectURL(avatar.files[0]);
      console.log(URL.createObjectURL(avatar.files[0]));
      setRefresh(!refresh);
    }
  };

  console.log( "ProfileImage: " + props.profileImage);
  if (imgSrc === "") {
    if (props.profileImage) {
      imgSrc = "http://localhost:5000/" + props.profileImage;
    }
  }

  const showImage = () => {
    console.log("Imgsrc: ", imgSrc);
    if (imgSrc === "") {
      return (
        <svg
          id="camera_1_"
          data-name="camera (1)"
          xmlns="http://www.w3.org/2000/svg"
          width="49.136"
          height="38.673"
          viewBox="0 0 49.136 38.673"
        >
          <g id="Group_384" data-name="Group 384" transform="translate(0 0)">
            <g id="Group_383" data-name="Group 383">
              <path
                id="Path_2652"
                data-name="Path 2652"
                d="M47.5,50.825a5.283,5.283,0,0,0-3.877-1.635H35.871V49.1a4.194,4.194,0,0,0-1.261-3.036A4.274,4.274,0,0,0,31.574,44.8H17.562a4.306,4.306,0,0,0-4.344,4.3v.093H5.511a5.283,5.283,0,0,0-3.877,1.635A5.553,5.553,0,0,0,0,54.7v23.26a5.283,5.283,0,0,0,1.635,3.877,5.553,5.553,0,0,0,3.877,1.635H43.624A5.283,5.283,0,0,0,47.5,81.839a5.553,5.553,0,0,0,1.635-3.877V54.7A5.283,5.283,0,0,0,47.5,50.825Zm-.794,27.137H46.66A3.03,3.03,0,0,1,43.624,81H5.511a3.03,3.03,0,0,1-3.036-3.036V54.7a3.03,3.03,0,0,1,3.036-3.036h9.014A1.256,1.256,0,0,0,15.787,50.4V49.05a1.758,1.758,0,0,1,1.822-1.822H31.574A1.758,1.758,0,0,1,33.4,49.05V50.4a1.256,1.256,0,0,0,1.261,1.261h9.014A3.03,3.03,0,0,1,46.707,54.7Z"
                transform="translate(0 -44.8)"
                fill="#32afb5"
              />
              <path
                id="Path_2653"
                data-name="Path 2653"
                d="M123.49,130.8a11.482,11.482,0,1,0,8.127,3.363A11.51,11.51,0,0,0,123.49,130.8Zm6.352,17.889a9.021,9.021,0,0,1-12.7,0,8.929,8.929,0,0,1-2.616-6.352,9.127,9.127,0,0,1,2.616-6.352,8.929,8.929,0,0,1,6.352-2.616,9.128,9.128,0,0,1,6.352,2.616,8.929,8.929,0,0,1,2.616,6.352A8.74,8.74,0,0,1,129.842,148.689Z"
                transform="translate(-98.922 -120.758)"
                fill="#32afb5"
              />
              <circle
                id="Ellipse_181"
                data-name="Ellipse 181"
                cx="2.289"
                cy="2.289"
                r="2.289"
                transform="translate(38.907 9.995)"
                fill="#32afb5"
              />
            </g>
          </g>
        </svg>
      );
    } else {
      return (
        <img
          style={{ borderRadius: "50%" }}
          src={imgSrc}
          alt="can't find"
          width="100%"
          height="100%"
        />
      );
    }
  };

  return (
    <div className="user-profile-pic">
      <div className="user-profile-inner">{showImage()}</div>
      <label id="edit-userpic">
        <input
          style={{ display: "none" }}
          type="file"
          onChange={onChangeHandler}
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 17.74 17.676"
        >
          <path
            id="Path_55"
            data-name="Path 55"
            d="M21.076,7.7,18.037,4.659a2.218,2.218,0,0,0-2.949-.078L5.109,14.56A2.218,2.218,0,0,0,4.477,15.9L4,20.525a1.106,1.106,0,0,0,1.109,1.209h.1l4.624-.421a2.218,2.218,0,0,0,1.342-.632L21.153,10.7a2.129,2.129,0,0,0-.078-3Zm-3.77,3.7L14.334,8.429,16.5,6.211l3.027,3.027Z"
            transform="translate(-3.996 -4.058)"
            fill="#fff"
          />
        </svg>
      </label>
    </div>
  );
};
export default ProfileImage;
