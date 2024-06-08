import React, { useState, useEffect, useRef, useId } from "react";
import { useForm } from "react-hook-form";
import "./Member.css";
import { db } from "./firebase.js";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
const AddFunds = () => {
  const unique_id = uuid();
  const uid = unique_id.slice(0, 5);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
    db.collection(localStorage.getItem("category"))
      .add({
        fundName: data.fundName,
        from: data.from,
        to: data.to,
        total: data.total,
        cid: data.cid,
        amount: data.amount,
        status: false,
        req: "no",
        ack: "no",
        admin_hash: "",
        mem_hash: "",
        mem_name: localStorage.getItem("fname"),

        id: uid,
      })
      .then((docRef) => {
        const docId = docRef.id;
        console.log(docId);
      })
      .catch((err) => {
        console.log("Error: " + err.message);
      });
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
    </>
  );
};

export default AddFunds;
