import React, { useState, useEffect } from "react";
import WithPermission from "./WithPermission";
import { Link } from "react-router-dom";
import "./Member.css";
import { db } from "./firebase.js";

import { Icon } from "semantic-ui-react";

const HPageHealth = () => {
  localStorage.setItem("category", "Health");

  const [query, setQuery] = useState("");
  const [funds, setFunds] = useState([]);
  useEffect(() => {
    const fetchAll = () => {
      db.collection("Health")
        .get()
        .then((fund) => {
          if (fund.docs.length > 0) {
            fund.docs.forEach((doc) => {
              setFunds((prev) => {
                return [...prev, { data: doc.data(), id: doc.id }];
              });
            });
          }
        });
    };
    fetchAll();
  }, []);

  return (
    <>
      <h1 className="head1">Health</h1>

      <div className="search">
        <div className="vertical-flex">
          <Icon size="large" name="search" className="search-icon" />
          <input
            placeholder="Search funds"
            onChange={(event) => setQuery(event.target.value)}
            className="search-input "
          />
        </div>
        <div className="flex-label-horizontal1">
          {funds
            .filter((fund) => {
              if (query === "") {
                if (fund.data.status === true) {
                  return fund;
                }
              } else if (
                fund.data.fundName
                  .toString()
                  .toLowerCase()
                  .includes(query.toLowerCase())
              ) {
                return fund;
              }
            })
            .map((fund) => (
              <div className="container3">
                <div className="container2">
                  <div className="left">
                    <p>
                      <span className="l_space">FUND NAME:</span>
                      <span className="c_space">{fund.data.fundName}</span>
                    </p>
                    <p>
                      <span className="l_space">TOTAL BENEFITERS:</span>
                      <span className="c_space">{fund.data.total}</span>
                    </p>
                    <p id="amt">
                      <span className="l_space">AMOUNT (IN ETH COINS): </span>
                      <span className="c_space">{fund.data.amount} eth</span>
                    </p>
                    <p>
                      <span className="l_space">DURATION:</span>
                      <span className="c_space">
                        {fund.data.from} to {fund.data.to}
                      </span>
                    </p>
                    <p>
                      <span className="l_space">TRANSFEROR NAME:</span>
                      <span className="c_space">{fund.data.mem_name}</span>
                    </p>
                    {/* <p>
                      <span className="l_space">TRANSFERRED ON:</span>
                      <span className="c_space">
                        {fund.data.from} to {fund.data.to}
                      </span>
                    </p> */}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default HPageHealth;
