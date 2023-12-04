import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Link,
  //    NavLink, useHistory, useLocation
} from "react-router-dom";
//import Swal from "sweetalert2";
import "../css/landing.css";
import { Collapse } from "react-bootstrap";
//import Rightcontainer from "../Components/Rightcontainer";
import Downloadbutton from "../Components/Downloadbutton";
import Header from "../Components/Header";

import ludoBanner from "../../assets/images/ludo-banner.png";
import ludoMatch from "../../assets/images/ludo-match.png";
export default function Landing() {
  const beckendLocalApiUrl = process.env.REACT_APP_BACKEND_LOCAL_API;
  const beckendLiveApiUrl = process.env.REACT_APP_BACKEND_LIVE_API;
  const nodeMode = process.env.NODE_ENV;
  // var baseUrl;
  // if (nodeMode === "development") {
  //   baseUrl = beckendLocalApiUrl;
  // } else {
  //   baseUrl = beckendLiveApiUrl;
  // }

  const baseUrl = nodeMode === "development" ? beckendLocalApiUrl : beckendLiveApiUrl;

  const [open, setOpen] = useState(false);
  const [userAllData, setUserAllData] = useState();
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

  const role = async () => {
    const access_token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    await axios
      .get(baseUrl + `me`, { headers })
      .then((res) => {
        setUserAllData(res.data);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          localStorage.removeItem("token");
          //window.location.href = "/login";
          window.location.reload()
          //history.push("/login")
        }
      });
  };

  useEffect(() => {
    let access_token = localStorage.getItem("token");
    access_token = localStorage.getItem("token");
    if (access_token) {
      //window.location.reload();
      role();
    }
    fetchData();
  }, []);

  return (
    <>
      <Header user={userAllData} />

      <div className="leftContainer">
        <div className="main-area" style={{ paddingTop: "60px" }}>
          
          {/* <div className="collapseCard-container">
            <div className="collapseCard">
              <Link to={"/refer"} style={{ textDecoration: "none" }}>
                <div
                  className="collapseCard-body"
                  style={{
                    height: "64px",
                    opacity: 1,
                    transition: "height 0.3s ease 0s, opacity 0.3s ease 0s",
                  }}
                >
                  <div className="blink collapseCard-text text-dark">
                    {" "}
                    <span className=" text-danger">
                      {" "}
                      {WebSitesettings?.msg}{" "}
                    </span>
                  </div>
                </div>
              </Link>

              <div
                className="collapseCard-header"
                style={{ left: "22px", transition: "left 0.3s ease 0s" }}
              >
                <picture>
                  <img
                    height="10px"
                    width="14px"
                    src="/Images/LandingPage_img/global-rupeeIcon.png"
                    alt=""
                  />
                </picture>
                <div className="collapseCard-title ml-1 mt-1">Refer & Earn</div>
              </div>
            </div>
          </div> */}
        <Link
                  className="gameCard-container"
                  to={`#`}
                >
          <div className="card-banner">
            <img src={ludoBanner} alt="" />
          </div>
          </Link>
          <section className="games-section p-3">
            <div className="d-flex align-items-center games-section-title mb-3">
              <h1 className="text-white">Our Tournaments</h1>
            </div>
            <div className="games-section-headline mt-2 mb-1">
              
              <div className="games-window">
                <Link
                  className="gameCard-container"
                  to={`/Homepage/Ludo%20Classics`}
                >
                  <div className="ludo-classic-banner">
                  <img src={ludoMatch} alt="ludo match" />
                  </div>
                  <span className="live-text d-none blink text-success d-block text-right">
                    ◉ LIVE
                  </span>
                </Link>
              </div>
            </div>
          </section>

          <div className="downloadButton" style={{position:"fixed", zIndex:9999999999}}>
            <Downloadbutton />
          </div>
          <section className="footer">
            <div className="footer-divider" />
            <a
              className="px-3 py-4 d-flex align-items-center"
              href="#!"
              style={{ textDecoration: "none" }}
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              <picture className="icon">
                <img
                  src="/Images/LandingPage_img/ludo_wizard_game.png"
                  width="5rem"
                  height="auto"
                  alt="profile"
                  style={{ width: "5rem", height: "auto" }}
                />
              </picture>

            
              <span
                style={{
                  color: "#fff",
                  fontSize: ".9em",
                  fontWeight: 400,
                }}
                className={!open ? "d-block" : "d-none"}
              >
                {" "}
                 Terms, Privacy, Support
              </span>

              {open ? (
                <i
                  className="mdi mdi-chevron-up ml-auto"
                  style={{ fontSize: "1.7em", color: "#fff" }}
                ></i>
              ) : (
                <i
                  style={{ fontSize: "1.7em", color: "#fff" }}
                  className="mdi mdi-chevron-down ml-auto"
                ></i>
              )}
            </a>
            <Collapse in={open}>
              <div id="example-collapse-text" className="px-3 overflow-hidden">
                <div className="row footer-links">
                  <Link className="col-6" to="/term-condition">
                    Terms &amp; Condition
                  </Link>
                  <Link className="col-6" to="/PrivacyPolicy">
                    Privacy Policy
                  </Link>
                  <Link className="col-6" to="/RefundPolicy">
                    Refund/Cancellation Policy
                  </Link>
                  <Link className="col-6" to="/contact-us">
                    Contact Us
                  </Link>
                  <Link className="col-6" to="/responsible-gaming">
                    Responsible Gaming
                  </Link>
                </div>
              </div>
            </Collapse>
            <div className="footer-divider" />
            <div className="px-3 py-4">
              <div className="footer-text-bold mb-2">About Us</div>
            
              <div className="footer-text">
                {WebSitesettings ? WebSitesettings.WebsiteName : ""} is a
                real-money gaming product owned and operated by{" "}
                {WebSitesettings ? WebSitesettings.CompanyName : ""} ("
                {WebSitesettings ? WebSitesettings.WebsiteName : ""}" or "We" or
                "Us" or "Our").
              </div>
              <div className="footer-text-bold mb-2 mt-5">
                Our Business &amp; Products
              </div>
              <div className="footer-text">
                We are an HTML5 game-publishing company and our mission is to
                make accessing games fast and easy by removing the friction of
                app-installs.
              </div>
              <div className="footer-text">
                {WebSitesettings ? WebSitesettings.WebsiteName : ""} is a
                skill-based real-money gaming platform accessible only for our
                users in India. It is accessible on{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={WebSitesettings ? WebSitesettings.CompanyWebsite : ""}
                >
                  {WebSitesettings ? WebSitesettings.CompanyWebsite : ""}
                </a>
                . On {WebSitesettings ? WebSitesettings.WebsiteName : ""}, users
                can compete for real cash in Tournaments and Battles. They can
                encash their winnings via popular options such as Paytm Wallet,
                Amazon Pay, Bank Transfer, Mobile Recharges etc.
              </div>
              <div className="footer-text-bold mb-2 mt-5">Our Games</div>
              <div className="footer-text">
                {WebSitesettings ? WebSitesettings.WebsiteName : ""} has a
                wide-variety of high-quality, premium HTML5 games. Our games are
                especially compressed and optimised to work on low-end devices,
                uncommon browsers, and patchy internet speeds.
              </div>
              <div className="footer-text">
                We have games across several popular categories: Arcade, Action,
                Adventure, Sports &amp; Racing, Strategy, Puzzle &amp; Logic. We
                also have a strong portfolio of multiplayer games such as Ludo,
                Chess, 8 Ball Pool, Carrom, Tic Tac Toe, Archery, Quiz, Chinese
                Checkers and more! Some of our popular titles are: Escape Run,
                Bubble Wipeout, Tower Twist, Cricket Gunda, Ludo With Friends.
                If you have any suggestions around new games that we should add
                or if you are a game developer yourself and want to work with
                us, don't hesitate to drop in a line at{" "}
                <a
                  href={
                    WebSitesettings
                      ? "mailto:" + WebSitesettings.CompanyEmail
                      : ""
                  }
                >
                  {WebSitesettings ? WebSitesettings.CompanyEmail : ""}
                </a>
                !
              </div>
            </div>
          </section>
         
        </div>
      </div>
      {/* // <div className='rightContainer'>
            //     <Rightcontainer/>
            // </div> */}
    </>
  );
}
