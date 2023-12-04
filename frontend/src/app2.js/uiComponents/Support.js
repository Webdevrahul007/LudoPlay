import React, { useEffect, useState } from "react";
import Rightcontainer from "../Components/Rightcontainer";
import { Link } from "react-router-dom";
import "../Components/Component-css/Support.css";

const Support = () => {
  const beckendLocalApiUrl = process.env.REACT_APP_BACKEND_LOCAL_API;
  const beckendLiveApiUrl = process.env.REACT_APP_BACKEND_LIVE_API;
  const nodeMode = process.env.NODE_ENV;
  const whatsappUrl = +919653845050 ? `https://api.whatsapp.com/send?phone=+${919653845050}&text=Hello` : "";
  console.log("Generated URL:", whatsappUrl);
  // var baseUrl;
  // if (nodeMode === "development") {
  //   baseUrl = beckendLocalApiUrl;
  // } else {
  //   baseUrl = beckendLiveApiUrl;
  // }
  const baseUrl = nodeMode === "development" ? beckendLocalApiUrl : beckendLiveApiUrl;

  const [WebSitesettings, setWebsiteSettings] = useState("");
  const fetchData = async () => {
    try {
      const response = await fetch(baseUrl + "settings/data");
      const data = await response.json();
      return setWebsiteSettings(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div
        className="leftContainer"
        style={{ minHeight: "100vh", height: "100%" }}
      >
        <div className="cxy flex-column " style={{ paddingTop: "16%" }}>
          <img
            src={process.env.PUBLIC_URL + "/Images/contact_us.png"}
            width="280px"
            alt=""
          />
          <div
            className="games-section-title mt-4"
            style={{ fontSize: "1.2em", fontWeight: "700", color: "2c2c2c" }}
          >
            Contact us at below platforms.
          </div>
{/* start first row */}
  {/* <div className="row justify-content-center row-setting">
  <div className="col-2 d-flex justify-content-around w-80 col-4-design">
    <Link
      className="cxy flex-column"
      to={
        WebSitesettings.telegram
          ? "https://t.me/" + WebSitesettings.telegram
          : ""
      }
    >
      <img
        width="50px"
        src={process.env.PUBLIC_URL + "/Images/tel.png"}
        alt=""
      />
    </Link>
  </div>
  <div className="col-10 d-flex col-8-design">
    <Link
      className="cxy flex-column"
      to={
        WebSitesettings.telegram
          ? "https://t.me/" + WebSitesettings.telegram
          : ""
      }
    >
      <span className="footer-text-bold">
        {WebSitesettings.telegram ? WebSitesettings.telegram : ""}
      </span>
    </Link>
  </div>
</div> */}
{/* End first row */}
{/* Start Second Row */}
{/* <div className="row justify-content-center row-setting">
<div className="col-2 d-flex justify-content-around w-80 col-4-design" style={{padding: '10px'}}>
  <Link
    className="cxy flex-column"
    to={
      WebSitesettings.instragram
        ? "https://www.instagram.com/" + WebSitesettings.instragram + "/"
        : "/"
    }
  >
    <img
      width="50px"
      src={process.env.PUBLIC_URL + "/Images/instagram.png"}
      alt=""
    />
  </Link>
</div>
<div className="col-10 d-flex col-8-design">
  <Link
    className="cxy flex-column"
    to={
      WebSitesettings.instragram
        ? "https://www.instagram.com/" + WebSitesettings.instragram + "/"
        : "/"
    }
  >
    <span className="footer-text-bold">
      {WebSitesettings.instragram ? WebSitesettings.instragram : ""}
    </span>
  </Link>
</div>
</div> */}
{/* End second Row */}
{/* Start 3rd Row */}
<div className="row justify-content-center row-setting">
<div className="col-2 d-flex justify-content-around w-80 col-4-design">
  <Link
    className="cxy flex-column"
    to={
      WebSitesettings.whatsapp
        ? "https://api.whatsapp.com/send?phone=" +
          WebSitesettings.whatsapp +
          "&text=Hello"
        : ""
    }
  >
    <img
      width="50px"
      src={process.env.PUBLIC_URL + "/Images/whatsapp.png"}
      alt=""
    />
  </Link>
</div>
<div className="col-10 d-flex col-8-design">
  {
  
  /* <Link
    className="cxy flex-column"
    to={
      WebSitesettings.whatsapp
        ? "https://api.whatsapp.com/send?phone=" +
          WebSitesettings.whatsapp +
          "&text=Hello"
        : ""
    }
  >
    <span className="footer-text-bold">
      {WebSitesettings.whatsapp ? WebSitesettings.whatsapp : ""}
    </span>
  </Link> */}


  {
    
  //   <Link className="cxy flex-column" to={whatsappUrl}>
  //   <span className="footer-text-bold">
  //     +919653845050 
  //   </span>
  // </Link>
  
  <p className="cxy flex-column">
    {/* <span className="footer-text-bold">
      +919653845050 
    </span> */}
    <a className="footer-text-bold" style="font-size:15px" target="_blank" href={`whatsapp://send?text=Hello`}  style={{ width: "100%" }}>+919653845050</a>

  </p>
  
  }
  
</div>
</div>
{/* end 3rd row */
}
{/* Start 4th row */}
<div className="row justify-content-center row-setting">
<div className="col-2 d-flex justify-content-around w-80 col-4-design">
  {/* <Link
    className="cxy flex-column"
    to={WebSitesettings.CompanyEmail?"mailto:" + WebSitesettings.CompanyEmail
        : ""
    }
  >
    <img
      width="50px"
      src={process.env.PUBLIC_URL + "/Images/mail.png"}
      alt=""
    />
  </Link> */}


<Link
    className="cxy flex-column"
    to={WebSitesettings.CompanyEmail?"mailto:" + WebSitesettings.CompanyEmail
        : ""
    }
  >
    <img
      width="50px"
      src={process.env.PUBLIC_URL + "/Images/mail.png"}
      alt=""
    />
  </Link>
</div>
<div className="col-10 d-flex col-8-design">
  {/* <Link
    className="cxy flex-column"
    to={
      WebSitesettings.CompanyEmail
        ? "mailto:" + WebSitesettings.CompanyEmail
        : ""
    }
  >
    <span className="footer-text-bold">
      {WebSitesettings.CompanyEmail
        ? WebSitesettings.CompanyEmail
        : ""}
    </span>
  </Link> */}
    <a className="footer-text-bold" href={`mailto: ${WebSitesettings.CompanyEmail}`}  style={{ width: "100%" }}> ludowizard@gmail.com</a>
  
</div>
</div>

{/* End 4th row */}
          <div className="col-12 my-2 text-center font-weight-bold">
            <div className="cxy flex-column last-sec" to="#">
              <span className="footer-text-bold">
                <Link
                  to={
                    WebSitesettings.CompanyMobile
                      ? "tel:" + WebSitesettings.CompanyMobile
                      : ""
                  }
                >
                  {WebSitesettings.CompanyMobile
                    ? WebSitesettings.CompanyMobile
                    : ""}
                </Link>
              </span>
              <span className="footer-text-bold">
                {WebSitesettings ? WebSitesettings.CompanyName : ""}
              </span>
              <span className="footer-text-bold">
                {WebSitesettings ? WebSitesettings.CompanyAddress : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="rightContainer">
        <Rightcontainer />
      </div>
    </div>
  );
};

export default Support;
