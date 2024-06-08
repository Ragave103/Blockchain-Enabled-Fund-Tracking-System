import React from "react";
import { Icon, Dimmer, Loader, Image, Segment } from "semantic-ui-react";
import Spinner from "./Spinner";
import "./Member.css";
function TransferModal({ open, onClose }) {
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
              <h1 className="head1">Transferring...</h1>
              <Spinner />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransferModal;
