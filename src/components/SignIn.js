import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase.js";
import Spinner from "./Spinner";
import "./SignIn.css";
import { Icon, Dimmer, Loader, Image, Segment } from "semantic-ui-react";

let fname, name;
const SignIn = () => {
  const [role, setRole] = useState("");
  let correctLog = false;

  const [isLoading, setIsLoading] = useState(false);

  const [userId, setUserId] = useState([]);
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
  /*const userId = [
    {
      auth_id: "56428",
      name: "MEMBER",
      wallet: "0x8b61fC079287EEf6c65303041a0f9299Ec508ed8",
    },
    {
      auth_id: "68495",
      name: "MEMBER",
      wallet: "0x5ff7fF0d7AeE9A19128B2E2D38c1295c6d5AFBb3",
    },
    {
      auth_id: "89785",
      name: "MEMBER",
      wallet: "0x13aDfAA3213f9D8948e57b24557bEE759BD85A0B",
    },
    {
      auth_id: "78989",
      name: "ADMIN",
      wallet: "0x167cd006f841A7602Cc5352B07323435118b7d3b",
    },
  ];

  /*
  useEffect(() => {
    const fetchAll = () => {
      db.collection("Auth")
        .get()
        .then((fund) => {
          fund.docs.forEach((doc) => {
            setUserId((prev) => {
              return [...prev, doc.data()];
            });
          });
        });
    };
    console.log(userId);
    fetchAll();
  }, []); */

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const options = {
    auth_id: { required: "ID IS REQUIRED" },
    role: { required: "Role IS REQUIRED" },
  };
  const onSubmit = (data) => {
    setIsLoading(true);
    console.log(data);
    console.log(data.auth_id);
    var req_doc = db.collection("Auth").doc(data.auth_id);
    console.log(data);
    req_doc
      .get()
      .then((doc) => {
        if (doc.exists) {
          correctLog = true;
          setIsLoading(false);
          console.log("Document data:", doc.data());
          const data_doc = doc.data();
          console.log("Document req", data_doc.req);
          fname = data_doc.fname;
          name = data_doc.name;
          localStorage.setItem("fname", fname);
          localStorage.setItem("user", JSON.stringify({ role: data_doc.name }));
          localStorage.setItem("mem_wallet", data_doc.wallet);
          reset();
          navigate("./home");
          alert("Welcome  " + fname + "!");
          alert("You are logged in as " + data_doc.name);
        } else {
          setIsLoading(false);
          // doc.data() will be undefined in this case
          alert("Invalid details .Cannot Login");
          console.log("No such document!");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Error getting document:", error);
      });
    /*let i;
    for (i = 0; i < userId.length; i++) {
      if (userId[i].auth_id === data.auth_id) {
        localStorage.setItem("user", JSON.stringify({ role: userId[i].name }));
        localStorage.setItem("mem_wallet", userId[i].wallet);
        console.log(localStorage.getItem("mem_wallet"));
        log = true;
        break;
      }
    }*/

    /*if (log) {
      reset();
      navigate("./home");
      alert("Logged in successfully");
    } else {
      alert("Invalid details .Cannot Login");
    }
    */
  };

  return (
    <>
      <div id="box">
        <h1 id="head1">SignIn</h1>
        {isLoading && <Loader1 />}
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="form-label">Enter UID</label>
            <input
              type="text"
              className="input text"
              {...register("auth_id", options.auth_id)}
            />
            <small className="error">
              {errors?.auth_id && errors.auth_id.message}
            </small>

            <br />
            <br />
            <br />

            {/* <select className="role" {...register("role", options.role)}>
                <option value="USER">Select role</option>
                <option value="ADMIN">Admin</option>
                <option value="MEMBER">Member</option>
              </select>
              <br />
              <br />
              <br /> */}
            <button className="btn">Proceed</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
