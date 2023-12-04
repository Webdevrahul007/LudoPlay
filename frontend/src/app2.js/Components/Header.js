// import { width } from '@mui/system';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "../Components/Component-css/Header.css";
import css from "./Component-css/Nav.module.css";

const w3_close = () => {
  const width = document.getElementById("mySidebar").offsetWidth;
  document.getElementById("mySidebar").style.left = `-${width}px`;
  document.getElementById("sidebarOverlay").style.display = "none";
};
const w3_open = () => {
  document.getElementById("mySidebar").style.left = "0";
  document.getElementById("sidebarOverlay").style.display = "block";
};

const Header = ({ user, loggedIn }) => {
  const beckendLocalApiUrl = process.env.REACT_APP_BACKEND_LOCAL_API;
  const beckendLiveApiUrl = process.env.REACT_APP_BACKEND_LIVE_API;
  const nodeMode = process.env.NODE_ENV;
  // if (nodeMode === "development") {
  //   var baseUrl = beckendLocalApiUrl;
  // } else {
  //   baseUrl = beckendLiveApiUrl;
  // }
  const baseUrl =
    nodeMode === "development" ? beckendLocalApiUrl : beckendLiveApiUrl;

  // const history = useHistory();

  let access_token = localStorage.getItem("token");
  access_token = localStorage.getItem("token");

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
  document.title = WebSitesettings
    ? WebSitesettings.WebTitle
    : "Skill based game";
  //console.log(WebSitesettings);
  useEffect(() => {
    if (access_token) {
      fetchData();
    }
  }, []);

  // const logout = () => {
  //   const headers = {
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   axios
  //     .post(
  //       baseUrl + `logout`,
  //       {
  //         headers: headers,
  //       },
  //       { headers }
  //     )
  //     .then((res) => {
  //       // setUser(res.data)
  //       localStorage.removeItem("token");
  //       window.location.reload();
  //       history.push("/");
  //     })
  //     .catch((e) => {
  //       if (e.response.status === 401) {
  //         localStorage.removeItem("token");
  //         localStorage.removeItem("token");
  //       }
  //     });
  // };

  return (
    <div>
      {access_token ? (
        <React.Fragment>
          <div id="sidebarOverlay" onClick={w3_close}></div>
          <div
            className="w3-sidebar w3-bar-block"
            id="mySidebar"
            style={{ paddingBottom: "70px" }}
          >
            <Link
              to={"/Profile"}
              className="w3-bar-item w3-button"
              onClick={w3_close}
            >
              <picture className="icon">
                {user && user.avatar ? (
                  <img
                    width="30px"
                    height="30px"
                    src='https://ludowizard.com/Images/LandingPage_img/ludo_wizard_game.png'
                    alt="profile"
                    style={{ borderRadius: "50px" }}
                  />
                ) : (
                  <img
                  src='https://ludowizard.com/Images/LandingPage_img/ludo_wizard_game.png'
                    width="25px"
                    height="25px"
                    alt="profile"
                  />
                )}
              </picture>
              <div style={{ marginLeft: ".5rem" }}>My Profile</div>
            </Link>
            <Link
              to={"/Homepage/Ludo Classics"}
              className="w3-bar-item w3-button"
              onClick={w3_close}
            >
              <picture className="icon">
                <img
                  alt="img"
                  src={process.env.PUBLIC_URL + "/Images/Header/gamepad.png"}
                />
              </picture>
              <div style={{ marginLeft: ".5rem" , fontWeight:"bold"}}>Go Home</div>
            </Link>
            <Link
              to={"/landing"}
              className="w3-bar-item w3-button"
              onClick={w3_close}
            >
              <picture className="icon">
                <img
                  alt="img"
                  src={process.env.PUBLIC_URL + "/Images/Header/gamepad.png"}
                />
              </picture>
              <div style={{ marginLeft: ".5rem" }}>Win cash</div>
            </Link>
            <Link
              to={"/wallet"}
              className="w3-bar-item w3-button"
              onClick={w3_close}
            >
              <picture className="icon">
                <img
                  alt="img"
                  src={process.env.PUBLIC_URL + "/Images/Header/wallet.png"}
                />
              </picture>
              <div style={{ marginLeft: ".5rem" }}>My wallet</div>
            </Link>

            <Link
              to={"/Gamehistory"}
              className="w3-bar-item w3-button"
              onClick={w3_close}
            >
              <picture className="icon">
                <img
                  alt="img"
                  src={
                    process.env.PUBLIC_URL + "/Images/Header/gamesHistory.png"
                  }
                />
              </picture>
              <div style={{ marginLeft: ".5rem" }}>Game History</div>
            </Link>

            <Link
              to="/transaction-history"
              className="w3-bar-item w3-button"
              onClick={w3_close}
            >
              <picture className="icon">
                <img
                  alt="img"
                  src={
                    process.env.PUBLIC_URL + "/Images/Header/order-history.png"
                  }
                />
              </picture>
              <div style={{ marginLeft: ".5rem" }}>Transaction History</div>
            </Link>

            <Link
              to={"/refer"}
              className="w3-bar-item w3-button"
              onClick={w3_close}
            >
              <picture className="icon">
                <img
                  alt="img"
                  src={process.env.PUBLIC_URL + "/Images/Header/sreferEarn.png"}
                />
              </picture>
              <div style={{ marginLeft: ".5rem" }}>Refer and Earn</div>
            </Link>

            <Link
              to={"/Referral-history"}
              className="w3-bar-item w3-button"
              onClick={w3_close}
            >
              <picture className="icon">
                <img
                  alt="img"
                  src={
                    process.env.PUBLIC_URL + "/Images/Header/refer-history.webp"
                  }
                />
              </picture>
              <div style={{ marginLeft: ".5rem" }}>Refer History</div>
            </Link>

            <Link
              to={"/Notification"}
              className="w3-bar-item w3-button"
              onClick={w3_close}
            >
              <picture className="icon">
                <img
                  alt="img"
                  src={
                    process.env.PUBLIC_URL + "/Images/Header/notifications.png"
                  }
                />
              </picture>
              <div style={{ marginLeft: ".5rem" }}>Notification</div>
            </Link>

            <Link
              to={"/support"}
              className="w3-bar-item w3-button"
              onClick={w3_close}
            >
              <picture className="icon">
                <img
                  alt="img"
                  src={process.env.PUBLIC_URL + "/Images/Header/support.png"}
                />
              </picture>
              <div style={{ marginLeft: ".5rem" }}>Support</div>
            </Link>
          </div>

          <div className="header-outer">
            <div className="w3-container ">
              <div className={`${css.headerContainer} `}>
                <button
                  className="w3-button  w3-xlarge float-left"
                  onClick={w3_open}
                  id="hambergar"
                >
                  <picture className={`${css.sideNavIcon} mr-0`}>
                    <img
                      src="/Images/LandingPage_img/sidebar.png"
                      className="snip-img"
                      alt=""
                    />
                  </picture>
                </button>
                <Link to="/">
                  <picture className={`ml-2 ${css.navLogo} d-flex panel-logo`}>
                    <img
                      src="/Images/LandingPage_img/ludo_wizard_game.png"
                      className="snip-img"
                      alt="Logo"
                    />
                  </picture>
                </Link>
                <div className="rightMenu">
                  <div className={`${css.menu_items}`}>
                    {/* <Link className={`${css.box}`} to="/Addcase">
                      <picture className={`${css.moneyIcon_container}`}>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/Images/LandingPage_img/global-rupeeIcon.png"
                          }
                          className="snip-img"
                          alt=""
                        />
                      </picture>
                      <div className="mt-1 ml-1">
                        <div className={`${css.moneyBox_header}`}>Cash</div>
                        <div className={`${css.moneyBox_text}`}>
                          {user && user.Wallet_balance}
                        </div>
                      </div>
                      <picture className={`${css.moneyBox_add}`}>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/Images/LandingPage_img/addSign.png"
                          }
                          className="snip-img"
                          alt=""
                        />
                      </picture>
                    </Link>
                     */}
                    <Link
                      className={`${css.box} ml-2`}
                      to="/redeem/refer"
                    >
                      <picture className={`${css.moneyIcon_container}`}>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/Images/LandingPage_img/notification-activity-reward.png"
                          }
                          className="snip-img"
                          alt=""
                        />
                      </picture>
                      <div className="refer-earn">
                        <div className={`${css.moneyBox_header}`}>Earning</div>
                        <div className={`${css.moneyBox_text}`}>
                          {user && user.referral_wallet}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <span className="mx-5"></span>
              </div>
            </div>
          </div>

          <div className="bottom-fixed-menu">
            <ul className="list-unstyled m-0 d-flex gap-10 justify-content-between px-2 py-2">
              <li className="d-flex align-items-center">
                <Link className="d-flex align-items-center" to="/support">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-headset me-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z" />
                  </svg>
                  <small>Contact US</small>
                </Link>
              </li>
              <li className="d-flex align-items-center">
                <Link className="d-flex align-items-center" to="/Addcase">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-patch-plus-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z" />
                  </svg>
                  <small>Add Cash</small>
                </Link>
              </li>
              <li className="d-flex align-items-center">
                <Link className="d-flex align-items-center" to="/wallet">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-wallet2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
                  </svg>
                  <small>My wallet</small>
                </Link>
              </li>
              <li className="d-flex align-items-center">
                <Link className="d-flex align-items-center" to="/Profile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                    />
                  </svg>
                  <small>Profile</small>
                </Link>
              </li>
            </ul>
          </div>
        </React.Fragment>
      ) : (
        <div className="w3-teal ">
          <div className="w3-container ">
            <div className={`${css.headerContainer} justify-content-between`}>
              <Link to="/">
                <picture className={`ml-2 ${css.navLogo} d-flex`}>
                  <img
                    src="/Images/LandingPage_img/ludo_wizard_game.png"
                    className="snip-img"
                    alt="Logo"
                  />
                </picture>
              </Link>

              {/* <div className={`ml-5`}>
                <Link type="button" className="login-btn" to="/login">
                  LOGIN
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
