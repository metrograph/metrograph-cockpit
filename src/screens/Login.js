import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Alert from "../components/Alert";
import art from "../assets/animation/art.gif";
import dashboardIcon from "../assets/dashboard.svg";

import "../assets/css/animation.css";

const endPoint = "http://157.90.233.37/v1/auth";

export default function Login() {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [onLoad, setOnLoad] = useState(false);
  const navigate = useNavigate();
  const mystate = useSelector((state) => state);
  const dispatch = useDispatch();

  function login() {
    console.log(inputs);
    setOnLoad(true);
    if (!inputs.username || !inputs.password) {
      let payloadAlert = {
        is_hide: false,
        type: "error",
        title: "Login failed.",
        description: "Invalid credentials or password requirements not met",
      };
      dispatch({ type: "setAlert", payload: payloadAlert });
      setTimeout(() => setOnLoad(false), 200);
      return console.log("error");
    }
    axios
      .post(endPoint, inputs)
      .then(function (response) {
        setTimeout(() => setOnLoad(false), 200);
        if (response.status === 200) {
          console.log(response.data.payload);
          localStorage.setItem(
            "localState",
            JSON.stringify(response.data.payload)
          );
          dispatch({ type: "setUser", payload: response.data.payload });
          dispatch({
            type: "setAlert",
            payload: { is_hide: true, type: null },
          });
          return navigate("/home");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          let payloadAlert = {
            is_hide: false,
            type: "error",
            title: "Login failed.",
            description: "Invalid credentials or password requirements not met",
          };
          dispatch({ type: "setAlert", payload: payloadAlert });
          setTimeout(() => setOnLoad(false), 200);
          return console.log("error");
        } else {
          setTimeout(() => setOnLoad(false), 200);
          let payloadAlert = {
            is_hide: false,
            type: "error",
            title: "Login failed.",
            description: "Network Error",
          };
          dispatch({ type: "setAlert", payload: payloadAlert });
        }
      });
  }

  useEffect(() => {
    function loadLocalStorage() {
      const localstorage = localStorage.getItem("localState");
      const data = JSON.parse(localstorage);
      if (data) {
        return navigate("/home");
      }
    }
    loadLocalStorage();
  }, [navigate]);
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login to Metrograph</title>
      </Helmet>

      <div className="bg-cock-purple-dark min-h-screen ">
        <div className="flex flex-row">
          <div className="flex flex-col w-1/2 md:justify-start  md:pt-0 md:px-24">
            {!mystate.alert.is_hide && (
              <div className="mt-12 px-12">
                <Alert />
              </div>
            )}
            {onLoad && <div className="load_bar" />}
            <div className="flex flex-col my-auto">
              <div className="flex flex-col justify-center items-center">
                <div className="logo" />
              </div>
              <div className="flex flex-col px-12">
                <div className="mt-28 flex items-center space-x-4">
                  <img alt="" src={dashboardIcon} height="38" width="38" />
                  <div className="flex flex-col">
                    <p className="text-2xl text-white font-Rajdhani font-medium">
                      Login to your account
                    </p>
                    <p
                      className="text-md text-white font-Rajdhani font-medium cursor-pointer hover:text-orange-500"
                      onClick={() => navigate("/register")}
                    >
                      Create new account?
                    </p>
                  </div>
                </div>
                {/* username  input start */}
                <div className="mt-16">
                  <div className="flex flex-row items-center space-x-2">
                    <div className="w-2 border-t-2 border-brand-header" />
                    <p className="text-brand-dark-button text-xs flex-shrink-0 font-Inter font-bold">
                      USERNAME
                    </p>
                    <div className="w-full border-t-2 border-brand-header" />
                  </div>
                  <div className="border-2 border-t-0 border-brand-header -mt-2">
                    <input
                      className=" bg-transparent focus:outline-none h-8 text-white px-4 my-2  w-full text-lg font-Inter font-medium"
                      placeholder="@username.."
                      onChange={(e) =>
                        setInputs({
                          username: e.target.value,
                          password: inputs.password,
                        })
                      }
                      value={inputs.username}
                      onKeyDown={(e) => e.key === "Enter" && login()}
                    />
                  </div>
                </div>
                {/* username input end */}

                {/* password  input start */}
                <div className="mt-4">
                  <div className="flex flex-row items-center space-x-2">
                    <div className="w-2 border-t-2 border-brand-header" />
                    <p className="text-brand-dark-button text-xs flex-shrink-0 font-Inter font-bold">
                      PASSWORD
                    </p>
                    <div className="w-full border-t-2 border-brand-header" />
                  </div>
                  <div className="border-2 border-t-0 border-brand-header -mt-2">
                    <input
                      type="password"
                      className=" bg-transparent focus:outline-none h-8 text-white px-4 my-2  w-full text-lg font-Inter font-medium"
                      placeholder="........."
                      onChange={(e) =>
                        setInputs({
                          username: inputs.username,
                          password: e.target.value,
                        })
                      }
                      value={inputs.password}
                      onKeyDown={(e) => e.key === "Enter" && login()}
                    />
                  </div>
                </div>
                {/* password input end */}

                {/* Button start */}

                <div className="mt-12 flex justify-end">
                  <button
                    onClick={() => login()}
                    className="bg-cock-green border-2 border-white h-10 w-28 space-x-2 px-6 hover:bg-green-400 cursor-pointer text-white text-xs font-Rajdhani font-bold"
                  >
                    LOGIN
                  </button>
                </div>
                {/* Button end */}
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-end relative">
            <img alt="" src={art} className="fadeIn h-screen" />
            <div className="absolute h-screen w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
