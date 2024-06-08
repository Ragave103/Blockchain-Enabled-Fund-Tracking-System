import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Member.css";
import WithPermission from "./WithPermission";

const Member = () => {
  return (
    <>
      <WithPermission roleRequired="MEMBER" message="Only Member can view this">
        <h1 id="head">
          Welcome Member{" "}
          <span id="user_name">{localStorage.getItem("fname")}</span>
        </h1>
        <h1 id="head">Choose the category</h1>
        <div className="box2 ">
          <div className=" container4">
            <Link to="/user/edu" className="btn2">
              Education
            </Link>

            <Link to="/user/relief" className="btn2">
              ReliefFunds
            </Link>
            <Link to="/user/pension" className="btn2">
              Pensions
            </Link>

            <Link to="/user/health" className="btn2">
              Health
            </Link>
            <Link to="/user/agri" className="btn2">
              Agriculture
            </Link>
          </div>
        </div>
      </WithPermission>
    </>
  );
};

export default Member;
