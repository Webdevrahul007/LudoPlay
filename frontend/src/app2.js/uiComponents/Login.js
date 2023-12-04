import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
//import Rightcontainer from '../Components/Rightcontainer'
import "../css/layout.css";
import "../css/login.css";
import loginss from "../../assets/images/ludowizard.png";
export default function Login() {
  const history = useHistory();
  const access_token = localStorage.getItem("token");

  const beckendLocalApiUrl = process.env.REACT_APP_BACKEND_LOCAL_API;
  const beckendLiveApiUrl = process.env.REACT_APP_BACKEND_LIVE_API;
  const nodeMode = process.env.NODE_ENV;
  if (nodeMode === "development") {
    var baseUrl = beckendLocalApiUrl;
  } else {
    baseUrl = beckendLiveApiUrl;
  }

  const [WebSitesettings, setWebsiteSettings] = useState("");

  const fetchData = async () => {
    const response = await fetch(baseUrl + "settings/data");
    const data = await response.json();
    return setWebsiteSettings(data);
  };
  //console.log(WebSitesettings);
  useEffect(() => {
    if(access_token) {
      fetchData(); 
    }
  }, []);

  const [Phone, setPhone] = useState();
  const [twofactor_code, settwofactor_code] = useState();
  const [otp, setOtp] = useState(false);
  const [secretCode, setSecretCode] = useState();
  const [referral, setReferral] = useState(
    useLocation().pathname.split("/")[2]
  );

  const handleClick = async (e) => {
    e.preventDefault();

    if (!Phone) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter your phone number",
      });
    } else if (Phone.length !== 10) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please  enter currect phone number",
      });
    } else {
      await axios
        .post(baseUrl + `login`, {
          Phone,
          referral,
        })
        .then((respone) => {
          if (respone.data.status === 101) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: respone.data.msg,
            });
          } else if (respone.data.status === 200) {
            setOtp(true);
            console.log(respone.data);
            setSecretCode(respone.data.secret);
            if (respone.data.myToken) {
              Swal.fire({
                icon: "success",
                title: "OTP",
                text: "Demo Account Testing OTP: " + respone.data.myToken,
              });
            }
          }
        })
        .catch((e) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong",
            // width: '20%',
            // height:'20%',
          });
        });
    }
  };

  const varifyOtp = async (e) => {
    e.preventDefault();
    console.log("verify otp sumbut req");
    if (!Phone) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter your phone number",
      });
    } else {
      await axios
        .post(baseUrl + `login/finish`, {
          Phone,
          twofactor_code,
          referral,
          secretCode,
        })
        .then((respone) => {
          if (respone.data.status === 101) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: respone.data.msg,
            });
          } else if (respone.data.status === 200) {
            const token = respone.data.token;
            localStorage.setItem("token", token);
            window.location.reload(true);
            setTimeout(function () {
              history.push("/Games");
            }, 1000);
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        })
        .catch((e) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    }
  };

  const setError = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid Number",
      confirmation: true,
    });
  };
  return (
    <>
    
      <div className={`login-section ${!access_token ? "w-100 max-w-none" : ""}`} style={{ minHeight: "100vh" }}>
      
        <div className="main-area">
            <div className="branding mt-5 mb-3">
                <img width={200} src={loginss} alt="logo" className="img-fluid" />
            </div>
          <div className={`${!access_token ? "login-outer" : ""}`}>
            <div className="w-100 center-xy mx-auto">
              <div className="d-flex mb-2">
                    <h1 className="text-white font-25 ">Sign in</h1>
                </div>
              <div
                className="flex-column w-100">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      +91
                    </div>
                  </div>
                  <input
                    className="form-control"
                    name="mobile"
                    type="tel"
                    placeholder="Mobile number"
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (e.target.value.length > 10) {
                        setError(true);
                      }
                    }}
                  />
                </div>
              </div>
              {otp && (
                <div
                  className="flex-column w-100 mt-3">
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        OTP
                      </div>
                    </div>
                    <input
                      className="form-control"
                      name="password"
                      type="tel"
                      placeholder="Enter OTP"
                      onChange={(e) => settwofactor_code(e.target.value)}
                    />
                  </div>
                

                </div>
              ) }
               {otp && (
                <button style={{background:"none", border:"none", textAlign:"left"}}
                  className="resed_otp mt-3 w-100"
                  onClick={(e) => handleClick(e)}
                >
                  Resend OTP
                </button>
              )}



              {!otp && (
                <button
                  className="Login-button mt-3 w-100"
                  onClick={(e) => handleClick(e)}
                >
                  Continue
                </button>
              )}
              {otp && (
                <button
                  className="Login-button mt-3 w-100"
                  onClick={(e) => varifyOtp(e)}
                >
                  Verify
                </button>
              )}
            </div>
            <div className="login-footer text-white">
              By continuing I agree that{" "}
              {WebSitesettings ? WebSitesettings.CompanyName : ""}. may store
              and process my data in accordance with the{" "}
              <Link to="/term-condition">Terms of Use</Link>,{" "}
              <Link to="/PrivacyPolicy">Privacy Policy</Link> and that I am 18
              years or older. I am not playing from Assam, Odisha, Nagaland,
              Sikkim, Meghalaya, Andhra Pradesh, or Telangana.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
