import React, { useState } from "react";
import "./SignIn.css";
import {
  useLocation,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import Member from "./Member";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AddFunds from "./AddFunds";
import ManageFunds from "./ManageFunds";
import TrackTransaction from "./TrackTransaction";
import Education from "./Education";
import Sample from "./Sample";
import ReliefFunds from "./ReliefFunds";
import Pension from "./Pension";
import Health from "./Health";
import Agriculture from "./Agriculture";
import Completed from "./Completed";
import HPageAgri from "./HPageAgri";
import HPagePension from "./HPagePension";
import HPageRelief from "./HPageRelief";
import HPageEducation from "./HPageEducation";
import HPageHealth from "./HPageHealth";

import "./Navbar.css";
import ProtectedRoutes from "./ProtectedRoutes";

const Navbar = () => {
  const useAuth = () => {
    const user = localStorage.getItem("user");
    if (user) {
      return true;
    } else {
      return false;
    }
  };
  const user = useAuth();
  const location = useLocation();
  const navigation = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigation("/signin");
  };
  return (
    <>
      <nav className="nav">
        <ul>
          {user && (
            <>
              <li>
                <Link to="/home" exact className="element" c="elnment-active">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/user/member" className="element" c="elnment-active">
                  Member
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link to="/user/admin" className="element" c="elnment-active">
                  Admin
                </Link>
              </li>
            </>
          )}
          {!user && (
            <>
              <li>
                <Link
                  to="/home"
                  exact
                  className="element"
                  activeclassname="element-active"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link to="/signin" className="element" c="elnment-active">
                  SignIn
                </Link>
              </li>
              {/* <li>
                <Link to="/signup" className="element" c="elnment-active">
                  SignUp
                </Link>
              </li> */}
            </>
          )}

          {location.pathname !== "/signin" &&
            location.pathname !== "/signup" &&
            location.pathname !== "/home" && (
              <button className="btn" onClick={logout}>
                logout
              </button>
            )}
        </ul>
      </nav>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/edu" element={<HPageEducation />} />
        <Route path="/relief" element={<HPageRelief />} />
        <Route path="/pension" element={<HPagePension />} />
        <Route path="/health" element={<HPageHealth />} />
        <Route path="/agri" element={<HPageAgri />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/sample" element={<Sample />} />

        <Route path="/user" element={<ProtectedRoutes />}>
          <Route path="admin" element={<Admin />} />
          <Route path="track" element={<TrackTransaction />} />
          <Route path="completed" element={<Completed />} />
        </Route>
        <Route path="/user" element={<ProtectedRoutes />}>
          <Route path="member" element={<Member />} />
          <Route path="add" element={<AddFunds />} />
          <Route path="manage" element={<ManageFunds />} />
          <Route path="track" element={<TrackTransaction />} />
          <Route path="edu" element={<Education />} />
          <Route path="relief" element={<ReliefFunds />} />
          <Route path="pension" element={<Pension />} />
          <Route path="health" element={<Health />} />
          <Route path="agri" element={<Agriculture />} />
        </Route>

        <Route
          path="/denied"
          element={
            <>
              <h1>Permission denied</h1>
            </>
          }
        />
      </Routes>
    </>
  );
};

/*
function SignIn() {
  const [Role, setRole] = useState("USER");
  const navigate = useNavigate();
  const signin = () => {
    localStorage.setItem("user", JSON.stringify({ role: Role }));
    navigate("./home");
  };
  return (
    <>
      <div className="box">
        <h1 id="head">SignIn</h1>
        <div className="container">
          <form onSubmit={signin}>
            <label className="form-label">Enter Your Role:</label>
            <br />
            <br />
            <br />
            <select className="role" onChange={(e) => setRole(e.target.value)}>
              <option value="USER">Select role</option>
              <option value="ADMIN">Admin</option>
              <option value="MEMBER">Member</option>
            </select>
            <br />
            <br />
            <br />
            <button className="btn">Proceed</button>
          </form>
        </div>
      </div>
    </>
  );
}*/

export default Navbar;
