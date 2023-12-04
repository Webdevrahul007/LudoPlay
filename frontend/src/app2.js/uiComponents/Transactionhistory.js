import React, { useState, useEffect } from "react";
import css from "../css/gamehis.module.css";
import ReactPaginate from "react-paginate";
import axios from "axios";

const Transactionhistory = () => {
  const backendLocalApiUrl = process.env.REACT_APP_BACKEND_LOCAL_API;
  const backendLiveApiUrl = process.env.REACT_APP_BACKEND_LIVE_API;
  const nodeMode = process.env.NODE_ENV;
  let baseUrl;

  if (nodeMode === "development") {
    baseUrl = backendLocalApiUrl;
  } else {
    baseUrl = backendLiveApiUrl;
  }

  const [user, setUser] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const role = async () => {
    const access_token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try {
      const response = await axios.get(baseUrl + "me", { headers });
      setUser(response.data);
      Allgames(response.data._id, pageNumber, limit);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handlePageClick = (data) => {
    const currentPage = data.selected + 1;
    setPageNumber(currentPage);
  };

  const dateFormat = (e) => {
    const date = new Date(e);
    return date.toLocaleString("default", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    });
  };

  const [cardData, setGame] = useState(null);
  const limit = 50;

  const Allgames = async (id) => {
    const access_token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try {
      const response = await axios.get(
        baseUrl + `temp/deposite/${id}?page=${pageNumber}&_limit=${limit}`,
        { headers }
      );
      setGame(response.data.ress);
      setNumberOfPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  useEffect(() => {
    role();
  }, [pageNumber]);

  return (
    <div>
      <div
        className="leftContainer"
        style={{ minHeight: "100vh", height: "100%" }}
      >
        <div className="pt-5 mt-3 mx-2">
          {/* game-cards */}
          {cardData &&
            cardData.map((card) => {
              // Extracting data from card._id
              const id = card._id.toString();
              let ctr = 0;
              const timestamp = id.slice(ctr, (ctr += 8));
              const machineID = id.slice(ctr, (ctr += 6));
              const processID = id.slice(ctr, (ctr += 4));
              const counter = id.slice(ctr, (ctr += 6));
              const counterid = parseInt(timestamp, 16);

              // Define titleMsg and signIcon based on card properties
              let titleMsg = "";
              let signIcon = "";

              if (card.Req_type === "deposit" || card.Req_type === "bonus") {
                if (card.status !== "FAILED") {
                  titleMsg = "Cash added";
                  signIcon =
                    card.status === "Pending" && card.Req_type === "deposit" ? (
                      <div className="text-danger">(X)</div>
                    ) : (
                      <div className="text-success">(+)</div>
                    );
                }
              } else if (
                card.Req_type === "withdraw" &&
                card.status !== "FAILED"
              ) {
                titleMsg = `Withdraw using ${card.Withdraw_type}`;
                signIcon = <div className="text-danger">(-)</div>;
              } else if (
                card.Req_type === "penalty" &&
                card.status !== "FAILED"
              ) {
                titleMsg = "Penalty";
                signIcon = <div className="text-danger">(-)</div>;
              } else if (
                card.status === "Pending" ||
                card.status === "FAILED"
              ) {
                titleMsg = "FAILED";
                signIcon = <div className="text-danger">(X)</div>;
              }

              return (
                <div
                  className={`w-100 mt-3 py-3 d-flex align-items-center ${css.list_item}`}
                  key={card._id} style={{background: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '5px'}}
                >
                  
                  <div className={`${css.list_divider_y}`} />
                  <div className={`mx-3 d-flex ${css.list_body}`} style={{width: '70%'}}>
                    <div className="d-flex align-items-center">
                      <picture className="mr-2">
                        <img
                          height="85px"
                          width="85px"
                          src={`${process.env.PUBLIC_URL}/Images/LandingPage_img/ludo.jpeg`}
                          alt=""
                          style={{ borderRadius: "5px" }}
                        />
                      </picture>
                    </div>

                    <div className="d-flex flex-column font-8">
                      <div>
                        <b>{titleMsg}</b>
                        <h6>OrderID: JP-{counterid}</h6>
                      </div>
                      <div className={`${css.games_section_headline}`}>
                        Status:
                        {card.status === "none" ||
                        (card.status === "Pending" &&
                          card.Req_type === "withdraw")
                          ? "Processing"
                          : card.status === "Pending" &&
                            card.Req_type === "deposit"
                          ? "Cancelled"
                          : card.status}
                        <br></br>
                        {card.txn_msg ? card.txn_msg : ""}
                      </div>
                      <div style={{alignItems: 'left', margin: '0px', fontSize: '10px', color: '#2754beb8'}} className={`${css.center_xy} ${css.list_date}`}>
                    <div>{dateFormat(card.createdAt).split(",")[0]}</div>
                    <small>{dateFormat(card.createdAt).split(",")[1]}</small>
                  </div>
                    </div>
                  </div>

                  <div className="right-0 d-flex align-items-end pr-3 flex-column" style={{width: '30%'}}>
                    <div className="d-flex float-right font-8">
                      {signIcon}
                      <picture className="ml-1 mb-1">
                        <img
                          alt="img"
                          height="21px"
                          width="21px"
                          src={`${process.env.PUBLIC_URL}/Images/LandingPage_img/global-rupeeIcon.png`}
                          className="snip-img"
                        />
                      </picture>
                      <span className="pl-1">{card.amount}</span>
                    </div>
                    {card.closing_balance && (
                      <div
                        className={`${css.games_section_headline}`}
                        style={{ fontSize: "0.6em", whiteSpace: "nowrap" }}
                      >
                        closing balance: {card.closing_balance}
                      </div>
                    )}
                    {/* <div
                      className="games-section-headline"
                      style={{ fontSize: "0.6em" }}
                    ></div> */}
                  </div>
                  {/* <div className={`${css.games_section_headline}`}>
                    Status:
                    {card.status === "none" ||
                    (card.status === "Pending" && card.Req_type === "withdraw")
                      ? "Processing"
                      : card.status === "Pending" && card.Req_type === "deposit"
                      ? "Cancelled"
                      : card.status}
                    <br></br>
                    {card.txn_msg ? card.txn_msg : ""}
                  </div> */}
                </div>
              );
            })}
          {cardData && cardData.length === 0 && (
            <div className="text-center">
              <img
                src={`${process.env.PUBLIC_URL}/Images/notransactionhistory.png`}
                alt="no data"
                width={300}
                height={300}
                className="img-fluid "
                style={{ marginTop: "25%" }}
              />
              <div className="mt-2">
                <h3 className="font-weight-bold">No transaction History</h3>
                <p className="text-muted">
                  You have not made any transactions yet.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* pagination */}
        <div className="pt-2">
          <div className="mt-4" style={{marginBottom: '60px'}}>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={numberOfPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactionhistory;
