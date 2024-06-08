import React, { useState, useEffect } from "react";
import { Web3Storage } from "web3.storage";
import { useForm } from "react-hook-form";
import "./Member.css";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import abi from "./utils/Funds.json";
import { ethers } from "ethers";
const contractAddress = "0x338147Bcb778B8084705c29fd39e11C5B0A047c0";
const contractABI = abi.abi;

const Sample = () => {
  const [ethereum, setEthereum] = useState(undefined);
  const [connectedAccount, setConnectedAccount] = useState(undefined);
  const [funds, setFunds] = useState([]);
  const [newFund, setNewFund] = useState("");

  function getAccessToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU5MUQ4RkU0OWEwNkYyQTBkNTk4Yjk3MkE1OTZCMjQ4NjQ0NERCQjUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODAwMTgwNzU2NzMsIm5hbWUiOiJ3ZWJhcHAifQ.lMVD1_R7AV9i-fyncbHgxbJo8WCdkgZyMBE8-aHk6WA";
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data, e) => {
    getFunds();

    const uid = uuid();
    const unique_id = uid.slice(0, 5);
    data.fund_id = unique_id;
    data.status = false;
    data.req = false;
    data.member_wallet = "";
    data.admin_hash = "";
    data.member_hash = "";
    console.log(data);
    const blob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });
    const client = makeStorageClient();
    const files = [new File([blob], "fund.json")];
    const cid = await client.put(files);
    console.log("stored files with cid:", cid);
    // return cid;
    /*const apiUrl = "https://" + cid + ".ipfs.w3s.link/fund.json";
    const response = await fetch(apiUrl);
    const d = await response.json();
    console.log(d);*/

    if (!ethereum) {
      console.error("Ethereum object is required to create a fund");
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const fundsContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    const createTxn = await fundsContract.create({
      cid,
      unique_id,
    });
    console.log("Create transaction started...", createTxn.hash);

    await createTxn.wait();
    console.log("Created fund!", createTxn.hash);
    getFunds();

    // };
    // submitCreate();

    reset();
    alert("Fund added successfully");
  };

  const options = {
    fundName: { required: "NAME IS REQUIRED" },
    total: {
      required: "TOTAL BENEFITERS IS REQUIRED",
      min: {
        value: 1,
        message: "CAN'T BE NEGATIVE OR ZERO",
      },
    },
    amount: {
      required: "AMOUNT IS REQUIRED",
      min: {
        value: 1,
        message: "CAN'T BE NEGATIVE OR ZERO",
      },
    },
    from: {
      required: "START YEAR IS REQUIRED",
      minLength: {
        value: 4,
        message: "ATLEAST 4 CHARACTERS",
      },
      maxLength: {
        value: 4,
        message: "ONLY 4 CHARACTERS",
      },
      min: {
        value: new Date().getFullYear(),
        message: "ATLEAST CURRENT YEAR",
      },
    },
    to: {
      required: "END YEAR IS REQUIRED",
      minLength: {
        value: 4,
        message: "ATLEAST 4 CHARACTERS",
        maxLength: {
          value: 4,
          message: "ONLY 4 CHARACTERS",
        },
      },
    },
    cid: {
      required: "DATABASE ID IS REQUIRED",
    },
  };

  const getFunds = async () => {
    if (ethereum && connectedAccount) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const fundsContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const funds = await fundsContract.getFunds();
      console.log("Retrieved funds...", funds);
      setFunds(funds);
    }
  };
  useEffect(() => {
    // return () => {};
  }, [connectedAccount]);

  const handleAccounts = (accounts) => {
    if (accounts.length > 0) {
      const account = accounts[0];
      console.log("We have an authorized account: ", account);
      setConnectedAccount(account);
    } else {
      console.log("No authorized accounts yet");
    }
  };

  const getConnectedAccount = async () => {
    if (window.ethereum) {
      setEthereum(window.ethereum);
    }

    if (ethereum) {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      handleAccounts(accounts);
    }
  };
  useEffect(() => {
    getConnectedAccount();
    return () => {};
  }, []);

  const connectAccount = async () => {
    if (!ethereum) {
      alert("MetaMask is required to connect an account");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    handleAccounts(accounts);
  };

  if (!ethereum) {
    return <p>Please install MetaMask to connect to this site</p>;
  }

  if (!connectedAccount) {
    return <button onClick={connectAccount}>Connect MetaMask Wallet</button>;
  }

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
      <h1 className="head1">Add Funds</h1>
      <div className="modalContainer3">
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-label-vertical">
            <div className="flex-label-horizontal">
              <label className="form-label">Enter the Fund Name: </label>
              <input
                type="text"
                className="input text"
                {...register("fundName", options.fundName)}
              />
            </div>

            <small className="error">
              {errors?.fundName && errors.fundName.message}
            </small>

            <div className="flex-label-horizontal">
              <label className="form-label">Enter the Total Benefiters:</label>
              <input
                type="number"
                className="input num"
                {...register("total", options.total)}
              ></input>
            </div>
            <small className="error">
              {errors?.total && errors.total.message}
            </small>

            <div className="flex-label-horizontal">
              <label className="form-label">
                Enter the Amount of Individual:
              </label>
              <input
                type="number"
                className="input num"
                {...register("amount", options.total)}
              ></input>
            </div>
            <small className="error">
              {errors?.amount && errors.amount.message}
            </small>

            <div className="flex-label-horizontal">
              <label className="form-label">Enter the Year: </label>
            </div>
            <div className="flex-label-horizontal">
              <label className="form-label">From</label>
              <input
                type="number"
                className="input year"
                {...register("from", options.from)}
              ></input>

              <label className="form-label">To</label>
              <input
                type="number"
                className="input year"
                {...register("to", options.to)}
              ></input>
            </div>
            <small className="error">
              {errors?.from && errors.from.message}
            </small>
            <small className="error">{errors?.to && errors.to.message}</small>
            <div className="flex-label-horizontal">
              <label className="form-label">Enter Database ID:</label>
              <input
                type="text"
                className="input text"
                {...register("cid", options.cid)}
              ></input>
            </div>
            <small className="error">{errors?.cid && errors.cid.message}</small>
            <button className="btn addfund">Proceed</button>
          </div>
        </form>
      </div>
      {/* <button type="submit" onClick={submitCreate}>
            Create Keyboard!
          </button>
        </form>
  </div>*/}

      <div>
        {funds.map((fund, i) => (
          <p key={i}>{fund}</p>
        ))}
      </div>
    </>
  );
};

export default Sample;
