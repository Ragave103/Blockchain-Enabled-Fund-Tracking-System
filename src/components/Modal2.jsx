import React, { useState, useEffect, useRef } from "react";
import { Icon } from "semantic-ui-react";

function Modal2({ open, onClose }) {
  const [role, setRole] = useState("Member");
  const navigate = useNavigate();

  function handleSubmit({ role }) {
    if (role === "Member") {
      navigate("/member");
    }
    navigate("/admin");
  }
  if (!open) return null;
  return (
    <>
      <div className="overlay">
        <div className="modalContainer">
          <div className="modalRight">
            <Icon
              link
              name="close"
              onClick={onClose}
              color="violet"
              className="closeBtn"
            />
            <div className="content">
              <h1 className="head1">Login</h1>
              <form onSubmit={(role) => handleSubmit(role)}>
                <label className="form-label">Enter Your Role:</label>
                <br />
                <br />
                <select
                  className="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Admin">Admin</option>
                  <option value="Member">Member</option>
                </select>
                <p>The selected role is {role}</p>
                <br />
                <br />
                <br />
                <button className="btn">Proceed</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal2;
