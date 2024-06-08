import "./Home.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Member.css";
import WithPermission from "./WithPermission";
const Home = () => {
  return (
    <div>
      <h1 className="head1">HomePage</h1>
      <h1 id="head">Choose the category</h1>
      <div className="box2 ">
        <div className=" container4">
          <Link to="/edu" className="btn2">
            Education
          </Link>

          <Link to="/relief" className="btn2">
            ReliefFunds
          </Link>
          <Link to="/pension" className="btn2">
            Pensions
          </Link>

          <Link to="/health" className="btn2">
            Health
          </Link>
          <Link to="/agri" className="btn2">
            Agriculture
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
