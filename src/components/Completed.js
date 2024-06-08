import React, { useState, useEffect } from "react";
// import Spinner from "./Spinner";
import WithPermission from "./WithPermission";
import { Link, Route, Routes, useHistory } from "react-router-dom";
import "./Member.css";
// import Spinner from "react-bootstrap/Spinner";
import { db } from "./firebase.js";
import { Icon, Dimmer, Loader, Image, Segment } from "semantic-ui-react";

import { ContractAddress } from "./address.js";
import multitransaction from "./utils/multitransaction.json";
const ethers = require("ethers");
let a;
const Completed = () => {
  localStorage.setItem("category", "Agriculture");
  let req;
  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [funds, setFunds] = useState([]);
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
  useEffect(() => {
    const fetchAll = () => {
      db.collection("NotCompleted")
        .get()
        .then((fund) => {
          if (fund.docs.length > 0) {
            fund.docs.forEach((doc) => {
              setFunds((prev) => {
                // return [...prev, doc.data()];
                return [...prev, { data: doc.data(), id: doc.id }];
              });
            });
          }
        });
    };
    fetchAll();
  }, []);
  const findStatus = (status) => {
    if (status === true) {
      return "Completed";
    } else {
      return "Not Completed";
    }
  };
  const fStatus = (status) => {
    return status;
  };
  const submitTask = (status, cat, did) => {
    if (status === true) {
      setIsLoading(false);
      alert("Fund is transferred to members successfully");
    } else {
      Connectwallet();
      TransferEth(cat, did);
    }
  };
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
  async function TransferEth(cat, did) {
    setIsLoading(true);
    let add = localStorage.getItem("mem_wallet");
    let address = [];
    address.push(add);
    console.log(address);
    try {
      const { ethereum } = window;

      if (ethereum) {
        const amount = localStorage.getItem("amount");
        //let INETH=ethers.utils.formatEther(amount);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const transcontract = new ethers.Contract(
          ContractAddress,
          multitransaction.abi,
          signer
        );
        let tot = localStorage.getItem("total");
        let amt = amount * tot;
        console.log("amt: " + amt);
        let hash = await transcontract.hashmsg(ContractAddress, amt);
        console.log("hashmsg is..");
        console.log(hash);
        let messageBytes = ethers.utils.arrayify(hash);
        console.log(messageBytes);
        let signature = await signer.signMessage(messageBytes);
        const tx = await transcontract.sendether(address, amt, signature, {
          value: ethers.utils.parseEther("0.05"),
        });
        await tx.wait();
        console.log(tx);
        console.log("Transaction hash is " + tx.hash);

        function req1() {
          console.log("req1");
          console.log("Category =" + cat);
          console.log("doc_id =" + did);
          var req_modify = db.collection(cat).doc(did);
          return req_modify
            .update({
              ack: "yes",
              admin_hash: tx.hash,
            })
            .then(async () => {
              console.log("Document successfully updated");
            })
            .catch((err) => {
              console.log("error" + err);
            });
        }
        function req2() {
          var r_modify = db
            .collection("NotCompleted")
            .doc(localStorage.getItem("admin_doc_id"));
          return r_modify
            .update({
              ack: "yes",
              status: true,
            })
            .then(() => {
              console.log("Document successfully updated");
            })
            .catch((err) => {
              console.log("error" + err);
            });
        }
        req1();
        req2();
        setIsLoading(false);
        alert("Fund Transferred Successfully");
      } else {
        setIsLoading(false);
        alert("Ethereum wallet is not connected!");
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      setIsLoading(false);
      alert("Error in transaction. Please try again");
      console.log("Error transacting ether", error);
      console.log(multitransaction, typeof multitransaction);
    }
  }

  return (
    <>
      <WithPermission roleRequired="ADMIN" message="Only Admin can view this">
        <h1 className="head1">
          Welcome Admin
          <span id="user_name">{localStorage.getItem("fname")}</span>
        </h1>
        <h1 className="head1">DashBoard</h1>
        <div>
          <div class="flexcontainer">
            <Link to="/user/admin" className="btn">
              Funds To Transfer
            </Link>
          </div>
        </div>
        <div className="search">
          {isLoading && <Modal />}
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
                    .includes(query.toString().toLowerCase())
                ) {
                  if (fund.data.status === true) {
                    return fund;
                  }
                } else if (
                  fund.data.id
                    .toString()
                    .toLowerCase()
                    .includes(query.toString().toLowerCase())
                ) {
                  if (fund.data.status === true) {
                    return fund;
                  }
                }
              })
              .map((fund) => (
                <div className="container3">
                  <div className="container2">
                    <div className="left">
                      <p>ID: {fund.data.id}</p>
                      <p>Fund Name: {fund.data.fundName}</p>
                      <p>Category: {fund.data.category}</p>
                      {/* <p>Doc_ID:{fund.doc_id}</p> */}
                      <p>Total: {fund.data.total}</p>
                      <p>Amount: {fund.data.amount}</p>
                      <p>From: {fund.data.from}</p>
                      <p>To: {fund.data.to}</p>
                      <p>Cid: {fund.data.cid}</p>
                      <p>Status: {findStatus(fund.data.status)}</p>
                      <p>Member Wallet: {fund.data.mem_wallet}</p>
                    </div>
                    <br />
                    <br />(
                    <button className="btn1 right">
                      <span
                        onClick={() => {
                          setIsLoading(true);
                          localStorage.setItem("cid", fund.data.cid);
                          localStorage.setItem("fundName", fund.data.fundName);
                          localStorage.setItem("total", fund.data.total);
                          localStorage.setItem("doc_id", fund.data.doc_id);
                          console.log("Admin Btn doc_id " + fund.data.doc_id);
                          localStorage.setItem("category", fund.data.category);
                          console.log(
                            "Admin Btn Category " + fund.data.category
                          );
                          localStorage.setItem("amount", fund.data.amount);
                          localStorage.setItem("from", fund.data.from);
                          localStorage.setItem("to", fund.data.to);
                          localStorage.setItem("status", fund.data.status);
                          localStorage.setItem("req", fund.data.req);
                          localStorage.setItem("id", fund.data.id);
                          localStorage.setItem(
                            "mem_wallet",
                            fund.data.mem_wallet
                          );
                          let cat = fund.data.category;
                          let did = fund.data.doc_id;
                          localStorage.setItem("admin_doc_id", fund.id);

                          submitTask(fund.data.status, cat, did);
                        }}
                      >
                        {fStatus(fund.data.status)
                          ? "Fund transferred"
                          : "Send Funds"}
                      </span>
                    </button>
                    )
                  </div>
                </div>
              ))}
          </div>
        </div>
      </WithPermission>
    </>
  );
};

const findAck = () => {
  var docRef = db.collection(category).doc(doc_id);
  let data_doc;
  let doc_id = localStorage.getItem("admin_doc_id");
  let category = localStorage.getItem("category");
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

export default Completed;
