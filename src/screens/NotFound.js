import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Alert from "../components/Alert";
import art from "../assets/animation/art.gif"
import dashboardIcon from "../assets/dashboard.svg"


import "../assets/css/animation.css"

const endPoint = "http://157.90.233.37/v1/auth"

export default function NotFound() {

    const navigate = useNavigate()





    return (
        <div>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Login to Metrograph</title>
            </Helmet>

            <div className="bg-cock-purple-dark min-h-screen ">

                <div className="flex flex-row">

                    <div className="flex flex-col w-1/2 md:justify-start  md:pt-0 md:px-24">

                        <div className="flex flex-col my-auto">
                            <div className="flex flex-col justify-center items-center">

                                <p className="text-6xl font-Rajdhani font-semibold text-white">Not Found</p>

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