import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Icon } from "semantic-ui-react";
import "./Member.css";
import { db } from "./firebase.js";

function FormModal({ open, onClose, newFund }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    newFund(data);
    db.collection("FundDetails")
      .add({
        fundName: data.fundName,
        from: data.from,
        to: data.to,
        total: data.total,
        uid: data.uid,
        status: false,
      })
      .then((docRef) => {
        const docId = docRef.id;
        console.log(docId);
      })
      .catch((err) => {
        console.log("Error: " + err.message);
      });
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
    uid: {
      required: "DATABASE ID IS REQUIRED",
    },
  };

  if (!open) return null;
  return (
    <>
      <div className="overlay">
        <div className="modalContainer1">
          <div className="modalRight">
            <Icon link name="close" onClick={onClose} className="closeBtn" />
            <div className="content">
              <h1 className="head1">Add Funds</h1>
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
                    <label className="form-label">
                      Enter the Total Benefiters:
                    </label>
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
                  <small className="error">
                    {errors?.to && errors.to.message}
                  </small>
                  <div className="flex-label-horizontal">
                    <label className="form-label">Enter Database ID:</label>
                    <input
                      type="text"
                      className="input text"
                      {...register("uid", options.uid)}
                    ></input>
                  </div>
                  <small className="error">
                    {errors?.uid && errors.uid.message}
                  </small>
                  <button className="btn addfund">Proceed</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormModal;
