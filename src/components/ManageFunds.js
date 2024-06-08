import "./Member.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "./firebase.js";
import Spinner from "./Spinner";
import { Icon, Dimmer, Loader, Image, Segment } from "semantic-ui-react";
import TransferModal from "./TransferModal";
import { ContractAddress } from "./address.js";
import multitransaction from "./utils/multitransaction.json";
//import axios from 'axios';
const ethers = require("ethers");
let isLoading = false;
let isTransfer = false;

const mem_w = localStorage.getItem("mem_wallet");
let r, s, a;
function Modal() {
  return (
    <>
      <Segment>
        <Dimmer active>
          <Loader size="huge">Transferring</Loader>
        </Dimmer>
      </Segment>
    </>
  );
}

function Loader1() {
  return (
    <>
      <Segment>
        <Dimmer active>
          <Loader size="huge">Loading</Loader>
        </Dimmer>
      </Segment>
    </>
  );
}
function ManageFunds() {
  console.log("member  wallet : ", mem_w);
  const [showPosts, setshowPosts] = useState();
  const [value, setValue] = useState("");
  const [address, setAddress] = useState([]);

  var req_modify = db
    .collection(localStorage.getItem("category"))
    .doc(localStorage.getItem("doc_id"));

  const apiUrl = "https://ipfs.filebase.io/ipfs/" + localStorage.getItem("cid");
  let displayData;
  async function pullJson() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    displayData = data.map(function (fund) {
      let temp = address;
      temp.push(fund.wallet);
      setAddress(temp);
    });
    console.log("address", address);
    console.log(data);
    setshowPosts(displayData);
  }
  useEffect(() => {
    console.log(localStorage.getItem("cid"));

    pullJson();
  }, []);
  let hash, req;

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

  const sendAdmin = () => {
    db.collection("NotCompleted")
      .add({
        fundName: localStorage.getItem("fundName"),
        from: localStorage.getItem("from"),
        to: localStorage.getItem("to"),
        total: localStorage.getItem("total"),
        cid: localStorage.getItem("cid"),
        amount: localStorage.getItem("amount"),
        status: false,
        doc_id: localStorage.getItem("doc_id"),
        category: localStorage.getItem("category"),
        id: localStorage.getItem("id"),
        mem_wallet: localStorage.getItem("mem_wallet"),
      })
      .then((docRef) => {
        const docId = docRef.id;
        console.log(docId);
        console.log(localStorage.getItem("doc_id"));
        return req_modify
          .update({
            req: "yes",
          })
          .then(() => {
            console.log("Document successfully updated");
          })
          .catch((err) => {
            console.log("error" + err);
          });
      })
      .catch((err) => {
        console.log("Error: " + err.message);
      });
    alert("Requested successfully");
  };

  const findStatus = (status) => {
    console.log("Status: " + status);
    if (status === true) {
      return "Completed";
    } else {
      return "Not Completed";
    }
  };

  /*const fStatus = () => {
    let doc_id = localStorage.getItem("doc_id");
    let category = localStorage.getItem("category");

    var docRef = db.collection(category).doc(doc_id);
    let data_doc;
    let status;

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          data_doc = doc.data();
          console.log("Document status", data_doc.status);
          req = data_doc.status;
          if (status === "yes") {
            console.log("status " + true);
            s = true;
            return true;
          } else {
            console.log("status " + false);
            s = false;
            return false;
          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  const findReq = () => {
    let doc_id = localStorage.getItem("doc_id");
    let category = localStorage.getItem("category");
    var docRef = db.collection(category).doc(doc_id);
    let data_doc;
    let req;

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          data_doc = doc.data();
          console.log("Document req", data_doc.req);
          req = data_doc.req;
          if (req === "yes") {
            console.log("req " + true);
            r = true;
            return true;
          } else {
            console.log("req " + false);
            r = false;
            return false;
          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  const findAck = () => {
    let ack = localStorage.getItem("ack");
    if (ack === "yes") {
      return true;
    } else {
      return false;
    }
  };
  */
  return (
    <>
      <div class="flexcontainer">
        <Link to="/user/add" className="btn">
          Add Funds
        </Link>
        <Link to="/user/member" className="btn">
          Manage Funds
        </Link>
        <Link to="/user/track" className="btn">
          Track a Transaction
        </Link>
      </div>
      <h1 className="head1">{localStorage.getItem("category")}</h1>
      <div className="modalContainer2">
        <div className="content1">
          <h2>FUND DETAILS:</h2>
          <br />
          <p>Fund Name: {localStorage.getItem("fundName")}</p>
          <p>Total Benefiters: {localStorage.getItem("total")}</p>
          <p>From: {localStorage.getItem("from")}</p>
          <p>To: {localStorage.getItem("to")}</p>
          <p>Individual Amount : {localStorage.getItem("amount")}</p>
          <p>
            Total Amount:
            {parseFloat(localStorage.getItem("amount")) *
              parseFloat(localStorage.getItem("total"))}
          </p>
          {showPosts}
          <p>Status : {findStatus(localStorage.getItem("status"))}</p>

          <ChooseButton address={address} />
        </div>
      </div>
    </>
  );
}

function ChooseButton(props) {
  findReq();
  fStatus();
  findAck();
  const isReq = r;
  const isStatus = s;
  const isAck = a;

  if (isStatus === "true") {
    return <TrackBtn />;
  } else {
    if (isAck === "true") {
      return <SignBtn address={props.address} />;
    } else {
      return <RequestAdmin />;
    }
  }
}

function TrackBtn() {
  let doc_id = localStorage.getItem("doc_id");
  let category = localStorage.getItem("category");
  var docRef = db.collection(category).doc(doc_id);
  let data_doc;
  console.log("Track Btn doc_id: " + doc_id + " category: " + category);
  let status;

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        data_doc = doc.data();
        console.log("Document status", data_doc.status);
        let mem_hash = data_doc.mem_hash;

        localStorage.setItem("mem_hash", mem_hash);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  return (
    <button className="btn2">
      <Link to="/user/track" id="link1">
        TRACK A TRANSACTION
      </Link>
    </button>
  );
}

function RequestAdmin() {
  findReq();
  const isReq = r;
  const sendAdmin = () => {
    isLoading = true;
    if (isReq === "true") {
      alert("Fund already requested to the admin");
    } else {
      var req_modify = db
        .collection(localStorage.getItem("category"))
        .doc(localStorage.getItem("doc_id"));
      db.collection("NotCompleted")
        .add({
          fundName: localStorage.getItem("fundName"),
          from: localStorage.getItem("from"),
          to: localStorage.getItem("to"),
          total: localStorage.getItem("total"),
          cid: localStorage.getItem("cid"),
          amount: localStorage.getItem("amount"),
          status: false,
          doc_id: localStorage.getItem("doc_id"),
          category: localStorage.getItem("category"),
          id: localStorage.getItem("id"),
          mem_wallet: localStorage.getItem("mem_wallet"),
        })
        .then((docRef) => {
          const docId = docRef.id;
          console.log(docId);
          console.log(localStorage.getItem("doc_id"));
          return req_modify
            .update({
              req: "yes",
            })
            .then(() => {
              console.log("Document successfully updated");
              alert("Requested successfully");
            })
            .catch((err) => {
              console.log("error" + err);
            });
        })
        .catch((err) => {
          console.log("Error: " + err.message);
        });
    }
    isLoading = false;
  };
  return (
    <button
      className="btn2"
      onClick={() => {
        if (isReq === "true") {
          alert("Fund already requested");
        } else {
          sendAdmin();
        }
      }}
    >
      REQUEST ADMIN
    </button>
  );
}

function SignBtn(props) {
  const [walletAddress, setwalletAddress] = useState("");
  async function requestAccount() {
    //check if meta mask extension exists
    if (window.ethereum) {
      console.log("detected");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setwalletAddress(accounts[0]);
      } catch (error) {
        alert("Install metamask wallet");
      }
    } else {
      console.log("metamask not detected");
    }
  }
  async function Connectwallet() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
    } else {
      alert(
        "ERROR: Ethereum Wallet NOT DETECTED. please connect your ethereum wallet to the browser"
      );
    }
  }
  async function TransferEth() {
    isTransfer = true;
    try {
      const { ethereum } = window;

      if (ethereum) {
        const amount = localStorage.getItem("amount");
        console.log("amount: " + amount);
        //let INETH=ethers.utils.formatEther(amount);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const transcontract = new ethers.Contract(
          ContractAddress,
          multitransaction.abi,
          signer
        );

        let hash = await transcontract.hashmsg(ContractAddress, amount);
        console.log("hashmsg is..");
        console.log(hash);
        let messageBytes = ethers.utils.arrayify(hash);
        console.log(messageBytes);
        let signature = await signer.signMessage(messageBytes);
        console.log("address is..", props.address);

        const tx = await transcontract.sendether(
          props.address,
          amount,
          signature,
          {
            value: ethers.utils.parseEther("0.1"),
          }
        );
        await tx.wait();
        console.log(tx);
        console.log("Transaction hash is" + tx.hash);
        localStorage.setItem("mem_hash", tx.hash);

        var req_modify = db
          .collection(localStorage.getItem("category"))
          .doc(localStorage.getItem("doc_id"));
        return req_modify
          .update({
            status: true,
            mem_hash: tx.hash,
          })
          .then(() => {
            isTransfer = false;
            alert("Funds Transferred to members successfully");
            alert("Transaction hash is " + tx.hash);
            console.log("Document successfully updated");
          })
          .catch((err) => {
            isTransfer = false;
            console.log("error" + err);
          });
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log("Error transacting ether", error);
      console.log(multitransaction, typeof multitransaction);
    }
  }
  return (
    <button
      className="btn2"
      onClick={() => {
        Connectwallet();
        TransferEth();
      }}
    >
      SIGN AND TRANSFER
    </button>
  );
}

const fStatus = () => {
  let doc_id = localStorage.getItem("doc_id");
  let category = localStorage.getItem("category");
  var docRef = db.collection(category).doc(doc_id);
  let data_doc;
  console.log("fStatus: " + doc_id + " category: " + category);
  let status;

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        data_doc = doc.data();
        console.log("Document status", data_doc.status);
        status = data_doc.status;
        if (status === true) {
          console.log("status " + true);
          s = "true";
          return true;
        } else {
          console.log("status " + false);
          s = "false";
          return false;
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
};

const findReq = () => {
  let doc_id = localStorage.getItem("doc_id");
  let category = localStorage.getItem("category");
  console.log("findReq: " + doc_id + " category: " + category);

  var docRef = db.collection(category).doc(doc_id);
  let data_doc;
  let req;

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        data_doc = doc.data();
        console.log("Document req", data_doc.req);
        req = data_doc.req;
        if (req === "yes") {
          console.log("req " + true);
          r = "true";
          return true;
        } else {
          console.log("req " + false);
          r = "false";
          return false;
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
};

const findAck = () => {
  let doc_id = localStorage.getItem("doc_id");
  let category = localStorage.getItem("category");
  var docRef = db.collection(category).doc(doc_id);
  let data_doc;
  let ack;

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        data_doc = doc.data();
        console.log("Document req", data_doc.ack);
        ack = data_doc.ack;
        if (ack === "yes") {
          console.log("ack " + true);
          a = "true";
          return true;
        } else {
          console.log("ack " + false);
          a = "false";
          return false;
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
};

// function TransferModal({ open, onClose }) {
//   if (!open) return null;
//   return (
//     <>
//       <div className="overlay">
//         <div className="modalContainer">
//           <div className="modalRight">
//             <Icon
//               link
//               name="close"
//               onClick={onClose}
//               color="violet"
//               className="closeBtn"
//             />
//             <div className="content">
//               <h1 className="head1">Transferring...</h1>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

export default ManageFunds;
