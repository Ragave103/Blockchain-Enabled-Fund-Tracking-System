import React, { useState, useEffect } from "react";
import WithPermission from "./WithPermission";
import { Link } from "react-router-dom";
import "./Member.css";
import { db } from "./firebase.js";

import { Icon } from "semantic-ui-react";

const Agriculture = () => {
  localStorage.setItem("category", "Agriculture");

  const [query, setQuery] = useState("");
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    const fetchAll = () => {
      db.collection(localStorage.getItem("category"))
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
  const findStatus = (status) => {
    if (status) {
      return "Completed";
    } else {
      return "Not Completed";
    }
  };

  return (
    <>
      <WithPermission roleRequired="MEMBER" message="Only Member can view this">
        <div>
          <div class="flexcontainer">
            <Link to="/user/add" className="btn">
              Add Funds
            </Link>
          </div>
        </div>
        <h1 className="head1">Agriculture</h1>
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
                  return fund;
                } else if (
                  fund.data.fundName
                    .toString()
                    .toLowerCase()
                    .includes(query.toString().toLowerCase())
                ) {
                  return fund;
                } else if (
                  fund.data.id
                    .toString()
                    .toLowerCase()
                    .includes(query.toString().toLowerCase())
                ) {
                  return fund;
                }
              })
              .map((fund) => (
                <div className="container3">
                  <div className="container2">
                    <div className="left">
                      <p>
                        <span className="l_space">ID: </span>
                        <span className="c_space">{fund.data.id}</span>
                      </p>
                      <p>
                        <span className="l_space">FUND NAME: </span>
                        <span className="c_space">{fund.data.fundName}</span>
                      </p>
                      <p>
                        <span className="l_space">TOTAL BENEFITERS:</span>
                        <span className="c_space">{fund.data.total}</span>
                      </p>
                      <p id="amt">
                        <span className="l_space">
                          AMOUNT FOR EACH(IN ETH COINS):{" "}
                        </span>
                        <span className="c_space">{fund.data.amount} eth</span>
                      </p>
                      <p id="amt">
                        <span className="l_space">
                          AMOUNT TOTAL(IN ETH COINS):{" "}
                        </span>
                        <span className="c_space">
                          {parseInt(fund.data.amount) *
                            parseInt(fund.data.total)}{" "}
                          eth
                        </span>
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
                      <p>
                        <span className="l_space">DATABASE CID:</span>
                      </p>
                      <p>
                        <span className="c_space">{fund.data.cid}</span>
                      </p>
                      <p>
                        <span className="l_space">STATUS: </span>
                        <span className="c_space">
                          {findStatus(fund.data.status)}
                        </span>
                      </p>
                    </div>
                    <Link to="/user/manage" className="btn1 right">
                      <span
                        onClick={() => {
                          localStorage.setItem("fundName", fund.data.fundName);
                          localStorage.setItem("total", fund.data.total);
                          localStorage.setItem("amount", fund.data.amount);
                          localStorage.setItem("from", fund.data.from);
                          localStorage.setItem("to", fund.data.to);
                          localStorage.setItem("cid", fund.data.cid);
                          localStorage.setItem("status", fund.data.status);
                          localStorage.setItem("req", fund.data.req);
                          localStorage.setItem("id", fund.data.id);
                          localStorage.setItem("doc_id", fund.id);
                          localStorage.setItem("mem_name", fund.data.mem_name);
                          localStorage.setItem("mem_hash", fund.mem_hash);
                        }}
                      >
                        Manage Funds
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </WithPermission>
    </>
  );
};

export default Agriculture;
