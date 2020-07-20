import React from "react";

import logo from "../../logo.svg";
import amazon from "../../assets/amazon.png";
import facebook from "../../assets/facebook.png";
import google from "../../assets/google.png";
import apple from "../../assets/apple.png";
import "../../stylesheets/login.css";

const Default = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h3 className="h3">Welcome Back</h3>
      <br />
      <button className="btn custom">
        <img src={logo} alt="imdb-logo" className="btn-logo" />
        <span className="btn-txt">Sign in with IMDb</span>
      </button>
      <br />
      <button className="btn custom">
        <img src={amazon} alt="amazon-logo" className="btn-logo-1" />
        <span className="btn-txt">Sign in with Amazon</span>
      </button>
      <br />
      <button className="btn custom">
        <img src={facebook} alt="facebook-logo" className="btn-logo-1" />
        <span className="btn-txt">Sign in with Facebook</span>
      </button>
      <br />
      <button className="btn custom">
        <img src={google} alt="google-logo" className="btn-logo-1" />
        <span className="btn-txt">Sign in with Google</span>
      </button>
      <br />
      <button className="btn custom">
        <img src={apple} alt="apple-logo" className="btn-logo-1" />
        <span className="btn-txt">Sign in with Apple</span>
      </button>
    </div>
  );
};

export default Default;
