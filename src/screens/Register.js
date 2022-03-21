import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Alert from "../components/Alert";

import art from "../assets/animation/art.gif"

import dashboardIcon from "../assets/dashboard.svg"
import hiddenIcon from "../assets/icons/hidden.svg"
import viewerIcon from "../assets/icons/viewer.svg"


import "../animation.css"



export default function Login() {
    const [inputs, setInputs] = useState({ username: "", password: "", confirmPassword: "" })
    const [onLoad, setOnLoad] = useState(false)
    const [eye, setEye] = useState(false)
    const navigate = useNavigate()
    const mystate = useSelector((state) => state)
    const dispatch = useDispatch()



    function regiser() {
        setOnLoad(true)
        if (!inputs.username || !inputs.password || !inputs.confirmPassword) {

            let payloadAlert = { is_hide: false, type: "error", title: "Register failed.", description: "Invalid credentials or password requirements not met" }
            dispatch({ type: "setAlert", payload: payloadAlert })
            setTimeout(() => setOnLoad(false), 200)
            return console.log("error")
        }
        if (inputs.password !== inputs.confirmPassword) {

            let payloadAlert = { is_hide: false, type: "error", title: "Register failed.", description: "Confirmation password does not match" }
            dispatch({ type: "setAlert", payload: payloadAlert })
            setTimeout(() => setOnLoad(false), 200)
            return console.log("error")
        }

        axios.post("http://157.90.233.37/v1/auth/register", inputs)
            .then(function (response) {
                setTimeout(() => setOnLoad(false), 200)

                if (response.status === 200) {
                    console.log(response.data.payload);
                    let payloadAlert = { is_hide: false, type: "success", title: "Account created successfully", description: "You can login to your account" }
                    dispatch({ type: "setAlert", payload: payloadAlert })

                    return navigate("/")
                }



            }).catch(error => {
                if (error.response.status === 409) {
                    console.log(error.response.status);
                    let payloadAlert = { is_hide: false, type: "error", title: "Register failed.", description: "Username already exists" }
                    dispatch({ type: "setAlert", payload: payloadAlert })

                    return console.log("error")
                }
                if (error.response.status === 401) {
                    console.log(error.response.status);
                    setTimeout(() => setOnLoad(false), 200)
                    let payloadAlert = { is_hide: false, type: "error", title: "Register failed.", description: "Invalid credentials or password requirements not met" }
                    dispatch({ type: "setAlert", payload: payloadAlert })
                }
            });
    }

    function toogleEye() {

        setEye(!eye)
    }
    useEffect(() => {


    }, []);
    return (
        <div>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Register to Metrograph</title>
            </Helmet>

            <div className="bg-cock-purple-dark min-h-screen ">

                <div className="flex flex-row">

                    <div className="flex flex-col w-1/2 md:justify-start  md:pt-0 md:px-24">

                        {!mystate.alert.is_hide && <div className="mt-12 px-12"><Alert /></div>}
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
                                            Create Account
                                        </p>
                                        <p className="text-md text-white font-Rajdhani font-medium cursor-pointer hover:text-orange-500" onClick={() => navigate("/")}>
                                            Back to login!
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
                                            className="bg-transparent focus:outline-none h-8 text-white px-4 my-2  w-full text-lg font-Inter font-medium"
                                            placeholder="@username.."
                                            onChange={(e) => setInputs({ username: e.target.value, password: inputs.password, confirmPassword: inputs.confirmPassword })}
                                            value={inputs.username}

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
                                    <div className="border-2 border-t-0 border-brand-header -mt-2 flex items-center">
                                        <input
                                            type={eye ? "text" : "password"}
                                            className="bg-transparent focus:outline-none h-8 text-white px-4 my-2  w-full text-lg font-Inter font-medium"
                                            placeholder="........."
                                            onChange={(e) => setInputs({ username: inputs.username, password: e.target.value, confirmPassword: inputs.confirmPassword })}
                                            value={inputs.password}
                                        />
                                        <img alt="" src={eye ? hiddenIcon : viewerIcon} className="h-6 w-6 cursor-pointer mr-4" onClick={() => toogleEye()} />
                                    </div>
                                </div>
                                {/* password input end */}

                                {/* password  input start */}
                                <div className="mt-4">
                                    <div className="flex flex-row items-center space-x-2">
                                        <div className="w-2 border-t-2 border-brand-header" />
                                        <p className="text-brand-dark-button text-xs flex-shrink-0 font-Inter font-bold">
                                            CONFIRM PASSWORD
                                        </p>
                                        <div className="w-full border-t-2 border-brand-header" />
                                    </div>
                                    <div className="border-2 border-t-0 border-brand-header -mt-2">
                                        <input
                                            type={eye ? "text" : "password"}
                                            className=" bg-transparent focus:outline-none h-8 text-white px-4 my-2  w-full text-lg font-Inter font-medium"
                                            placeholder="........."
                                            onChange={(e) => setInputs({ username: inputs.username, password: inputs.password, confirmPassword: e.target.value })}
                                            value={inputs.confirmPassword}
                                        />
                                    </div>
                                </div>
                                {/* password input end */}


                                {/* Button start */}

                                <div className="mt-12 flex justify-end">
                                    <button onClick={() => regiser()} className="bg-cock-green border-2 border-white h-10  space-x-2 px-6 hover:bg-green-400 cursor-pointer text-white text-xs font-Rajdhani font-bold">
                                        CREATE USER
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
    )
}