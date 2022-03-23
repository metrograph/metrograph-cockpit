import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Listbox, Transition } from "@headlessui/react";

import Header from "../components/Header";
import Alert from "../components/Alert";
import PageTitle from "../components/PageTitle";
import CheckBox from "../components/CheckBox";
import Footer from "../components/Footer";

import "../assets/css/mycss.css";
import "../assets/css/animation.css";

import logo from "../assets/logo.svg";
import dashboard from "../assets/dashboard.svg";
import crossIcon from "../assets/cross.svg";
import acceptIcon from "../assets/accept.svg";
import hiddenIcon from "../assets/icons/hidden.svg"
import viewerIcon from "../assets/icons/viewer.svg"
export default function CreateJob() {
    const mystate = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [eyeCurrentPassword, setEyeCurrentPassword] = useState(false)
    const [eyeNewPassword, setEyeNewPassword] = useState(false)

    const [currentPassword, setCurrentPassword] = useState()

    const [newPassword, setNewPassword] = useState()
    const [repeatPassword, setRepeatPassword] = useState()



    function submitform() {
        console.log("submited")
    }
    useEffect(() => {
        function loadLocalStorage() {
            if (!mystate.user.token) {
                const localstorage = localStorage.getItem("localState");
                const data = JSON.parse(localstorage);
                if (!data) {
                    return navigate("/");
                }
                dispatch({ type: "setUser", payload: data });
            }
        }
        loadLocalStorage();
    }, [navigate, dispatch]);
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Account Settings | Metrograph</title>
            </Helmet>

            <div className="bg-brand-primary min-h-screen ">
                <Header logo={logo} />
                <div className="container mx-auto App-logo">
                    {!mystate.alert.is_hide && (
                        <div className="mb-8">
                            <Alert />
                        </div>
                    )}
                    <PageTitle icon={dashboard} text="Account Settings" />

                    <div className="mt-8"></div>
                    <div className="flex flex-row w-full">
                        <div className="lg:w-1/2 md:w-full sm:w-full">
                            {/* Job name input start*/}
                            <div className="">
                                <div className="flex flex-row items-center space-x-2">
                                    <div className="w-2 border-t-2 border-brand-header" />
                                    <p className="text-brand-dark-button text-xs flex-shrink-0 font-Inter font-bold">
                                        USENAME
                                    </p>
                                    <div className="w-full border-t-2 border-brand-header" />
                                </div>
                                <div className="border-2 border-t-0 border-brand-header -mt-2">
                                    <input
                                        disabled
                                        className=" bg-transparent focus:outline-none h-8 text-white px-4 my-2  w-full text-lg font-Inter font-medium"
                                        value={mystate.user.username}
                                    />
                                </div>
                            </div>
                            {/* Job name input end */}

                            {/* Job description input start */}
                            <div className="mt-4">
                                <div className="flex flex-row items-center space-x-2">
                                    <div className="w-2 border-t-2 border-brand-header" />
                                    <p className="text-brand-dark-button text-xs flex-shrink-0 font-Inter font-bold">
                                        CURRENT PASSWORD
                                    </p>
                                    <div className="w-full border-t-2 border-brand-header" />
                                </div>
                                <div className="border-2 border-t-0 border-brand-header -mt-2 flex items-center">
                                    <input
                                        type={eyeCurrentPassword ? "text" : "password"}
                                        className=" bg-transparent focus:outline-none h-8 text-white px-4 my-2  w-full text-lg font-Inter font-medium"
                                        placeholder=""
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        value={currentPassword}
                                    />
                                    <img alt="" src={eyeCurrentPassword ? hiddenIcon : viewerIcon} className="h-6 w-6 cursor-pointer mr-4" onClick={() => setEyeCurrentPassword(!eyeCurrentPassword)} />
                                </div>
                            </div>
                            {/* Job description input end */}

                            {/* Job tags start */}
                            {/* <div className="mt-4">
                <div className="flex flex-row items-center space-x-2">
                  <div className="w-2 border-t-2 border-brand-header" />
                  <p className="text-brand-dark-button text-xs flex-shrink-0 font-Inter font-bold">
                    TAGS
                  </p>
                  <div className="w-full border-t-2 border-brand-header" />
                </div>
                <div className="border-2 border-t-0 border-brand-header -mt-4">
                  <div className="flex flex-row items-center bg-transparent focus:outline-none h-14 text-white px-4 my-2  w-full text-lg font-Inter font-medium">
                    <div className="flex flex-row space-x-2 mt-2">
                      <Tags mytags={tasktags} />
                    </div>
                    <input
                      onKeyDown={handleKeyDown}
                      className="mt-2 bg-transparent focus:outline-none h-8 text-white px-4  w-full text-lg font-Inter font-medium"
                      placeholder="Add tags..."
                      onChange={e => setTagInput(e.target.value)}
                      value={tagInput}

                    />
                  </div>

                </div>
              </div> */}
                            {/* Job tags end */}
                            {/* Job description input start */}
                            <div className="mt-4">
                                <div className="flex flex-row items-center space-x-2">
                                    <div className="w-2 border-t-2 border-brand-header" />
                                    <p className="text-brand-dark-button text-xs flex-shrink-0 font-Inter font-bold">
                                        NEW PASSWORD
                                    </p>
                                    <div className="w-full border-t-2 border-brand-header" />
                                </div>
                                <div className="border-2 border-t-0 border-brand-header -mt-2 flex items-center">
                                    <input
                                        type={eyeNewPassword ? "text" : "password"}
                                        className=" bg-transparent focus:outline-none h-8 text-white px-4 my-2  w-full text-lg font-Inter font-medium"
                                        placeholder=""
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        value={newPassword}
                                    />
                                    <img alt="" src={eyeNewPassword ? hiddenIcon : viewerIcon} className="h-6 w-6 cursor-pointer mr-4" onClick={() => setEyeNewPassword(!eyeNewPassword)} />
                                </div>
                            </div>
                            {/* Job description input end */}
                            {/* Job description input start */}
                            <div className="mt-4">
                                <div className="flex flex-row items-center space-x-2">
                                    <div className="w-2 border-t-2 border-brand-header" />
                                    <p className="text-brand-dark-button text-xs flex-shrink-0 font-Inter font-bold">
                                        REPEAT PASSWORD
                                    </p>
                                    <div className="w-full border-t-2 border-brand-header" />
                                </div>
                                <div className="border-2 border-t-0 border-brand-header -mt-2">
                                    <input
                                        type={eyeNewPassword ? "text" : "password"}
                                        className=" bg-transparent focus:outline-none h-8 text-white px-4 my-2  w-full text-lg font-Inter font-medium"
                                        placeholder=""
                                        onChange={(e) => setRepeatPassword(e.target.value)}
                                        value={repeatPassword}
                                    />
                                </div>
                            </div>
                            {/* Job description input end */}
                            <div className="mt-8"></div>


                        </div>


                    </div>
                    {/* Confirmation box start */}
                    <div className="mt-12 bg-brand-header w-full h-28 flex flex-row border-r-4 justify-between  border-b-4 border-cock-purple items-center static">
                        <p className="text-white texl-3xl  ml-8 font-Rajdhani font-semibold">
                            CONFIRMATION
                        </p>
                        <div className="mr-8 flex flex-row justify-between space-x-4 items-center">
                            <div
                                onClick={() => navigate(-1)}
                                className="flex items-center justify-center bg-brand-header border-2 border-white h-10 w-36 space-x-2 px-6 hover:bg-zinc-600 cursor-pointer"
                            >
                                <img alt="" src={crossIcon} height="10" width="10" />
                                <p className="text-white text-xs font-Rajdhani font-bold">
                                    CANCEL
                                </p>
                            </div>

                            <div
                                onClick={submitform}
                                className="flex items-center justify-center bg-cock-green border-2 border-white h-10 w-42 space-x-2 px-6 hover:bg-green-400 cursor-pointer"
                            >
                                <img alt="" src={acceptIcon} height="10" width="10" />
                                <p className="text-white text-xs font-Rajdhani font-bold">
                                    UPDATE PASSWORD
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* confirmation box end */}
                    <Footer />
                </div>
            </div>
        </div>
    );
}
