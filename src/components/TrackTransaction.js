import { Link } from "react-router-dom";
import { Buffer } from "buffer";
// import Spinner from "./Spinner";
import { Icon, Dimmer, Loader, Image, Segment } from "semantic-ui-react";

import React, { useState, useEffect } from "react";
import "./Member.css";
import Table from "./Table.js";
let name = [];
let timeStamp;
let member_transferred;
let mem_wallet;
let eth, gas, blockNumber;
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

const TrackTransaction = (props) => {
  const [showPosts, setshowPosts] = useState();
  const [tPosts, settPosts] = useState();
  const [address, setAddress] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const printBuffer = () => {
  //   const obj = { fundName: "fund 1", duration: 2023, total: 100 };
  //   const buf = new Buffer.from(JSON.stringify(obj));
  //   // return buf;
  //   async function addFile() {
  //     // 1. Create IPFS instant
  //     const ipfs = create({
  //       url: "http://localhost:3000",
  //     });

  //     // 2. Add file to ipfs
  //     const { cid } = await ipfs.add(buf);

  //     // 3. Get file status from ipfs
  //     const fileStat = await ipfs.files.stat("/ipfs/" + cid.path);
  //     console.log({
  //       cid: cid.path,
  //       size: fileStat.cumulativeSize,
  //     });

  //     return {
  //       cid: cid.path,
  //       size: fileStat.cumulativeSize,
  //     };
  //   }
  //   addFile();
  //   // console.log(buf);
  //   // console.log(JSON.parse(buf.toString()));
  // };

  const apiUrl = "https://ipfs.filebase.io/ipfs/" + localStorage.getItem("cid");
  console.log("localStorage.getItem(uid)" + localStorage.getItem("cid"));
  // const trackUrl =
  //   "https://api-sepolia.etherscan.io/api?module=account&action=txlistinternal&txhash=0xd79c0ab76b475d543568373de1d6bb82c59b0f55866e5873803a1119914c5055&apikey=BATJX2CN1DFA4HJJCZ1FYPDU9P1PXI6BU1";
  //
  let displayData, displayData1;
  const trackUrl =
    "https://api-sepolia.etherscan.io/api?module=account&action=txlistinternal&txhash=" +
    localStorage.getItem("mem_hash").toString() +
    "&apikey=BATJX2CN1DFA4HJJCZ1FYPDU9P1PXI6BU1";
  async function pullJson1() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    displayData = data.map(function (fund) {
      console.log(fund.name);
      name.push(fund.name);
    });
    console.log(data);
    setshowPosts(displayData);
  }
  async function pullJson2() {
    const response = await fetch(trackUrl);

    const data = await response.json();
    console.log(data);
    let d = data.result;
    let unixTimestamp = parseInt(d[0].timeStamp);
    let dateObj = new Date(unixTimestamp * 1000);
    timeStamp = dateObj.toUTCString();
    member_transferred = localStorage.getItem("mem_name");
    mem_wallet = d[0].from;
    eth = d[0].value;
    gas = d[0].gas;
    blockNumber = d[0].blockNumber;
    console.log(timeStamp);
    console.log(member_transferred);
    console.log(mem_wallet);
    console.log(eth);
    console.log(name);
    displayData = data.result.map(function (tx) {
      return (
        <>
          <div>
            <p>{tx.blockNumber}</p>
            <p>{tx.timeStamp}</p>
            <p>{tx.from}</p>
            <p>{tx.to}</p>
            <p>{tx.value}</p>
            <p>{tx.contractAddress}</p>
          </div>
        </>
      );
    });
    setDataTable(data.result);
    console.log(data.result);
    settPosts(displayData.result);
  }
  const column = [
    // { heading: "Block Number", value: "blockNumber" },
    // { heading: "From", value: "from" },
    { heading: "BENEFITERS NAME", value: "name" },
    { heading: "BENEFITERS WALLET ADDRESS", value: "to" },
    // { heading: "Value", value: "value" },
    // { heading: "Gas", value: "gas" },
    // { heading: "Timestamp", value: "timeStamp" },
  ];
  useEffect(() => {
    console.log(localStorage.getItem("uid"));

    pullJson1();
    pullJson2();
  }, []);

  return (
    <>
      <div class="flexcontainer">
        <Link to="/user/add" className="btn">
          Add Funds
        </Link>
        <Link to="/user/member" className="btn">
          Manage Funds
        </Link>
      </div>
      {/* <button onClick={printBuffer}>Click here</button> */}
      <br />
      <br />
      <div className="container3">
        <div className="container2">
          <div className="left">
            <p>
              <span className="l_space">FUND NAME: </span>
              <span className="c_space">
                {localStorage.getItem("fundName")}
              </span>
            </p>
            <p>
              <span className="l_space">MEMBER WALLET ADDRESS: </span>
            </p>
            <p>
              <span className="c_space">{mem_wallet}</span>
            </p>
            <p>
              <span className="l_space">
                AMOUNT FOR EACH BENEFITERS (IN ETH) :{" "}
              </span>
              <span className="c_space" id="amt">
                {eth} eth
              </span>
            </p>
            <p>
              <span className="l_space">TRANSACTION DATE AND TIME</span>
              <span className="c_space">{timeStamp}</span>
            </p>
            <p>
              <span className="l_space">TRANSACTION FEE(GAS): </span>
              <span className="c_space" id="amt">
                {gas} Gwei
              </span>
            </p>
            <p>
              <span className="l_space">BLOCK NUMBER: </span>
              <span className="c_space">{blockNumber}</span>
            </p>
          </div>
        </div>
      </div>
      {isLoading && <Loader1 />}
      <Table data={dataTable} column={column} name={name} />
    </>
  );
};

export default TrackTransaction;
