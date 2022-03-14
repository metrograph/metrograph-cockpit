import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import imageLogin from "../assets/bg-image-2.jpg"
import logo from "../assets/logo.svg"
import dashboardIcon from "../assets/dashboard.svg"
import "../animation.css"

export default function Login() {
    const navigate = useNavigate()
    return (
        <div>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Login to Metrograph</title>
            </Helmet>

            <div className="bg-cock-purple-dark min-h-screen ">
                <div className="flex flex-row">
                    <div className="flex flex-col w-full md:w-1/2  justify-center md:justify-start my-auto md:pt-0 md:px-24">
                        <div className="flex justify-center">
                            <img className=" h-16" src={logo} />
                        </div>
                        <div className="flex flex-col px-12">
                            <div className="mt-28 flex items-start space-x-4">
                                <img src={dashboardIcon} height="24" width="24" />
                                <p className="text-2xl text-white font-Rajdhani font-medium">
                                    Login to your account
                                </p>
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

                                    />
                                </div>
                            </div>
                            {/* password input end */}

                            {/* Button start */}

                            <div className="mt-12 flex justify-end">
                                <button onClick={() => navigate('/')} className="bg-cock-green border-2 border-white h-10 w-28 space-x-2 px-6 hover:bg-green-400 cursor-pointer text-white text-xs font-Rajdhani font-bold">
                                    LOGIN
                                </button>
                            </div>
                            {/* Button end */}
                        </div>


                    </div>
                    <div className="w-1/2 bg-cock-dark">
                        <img className="object-cover w-full h-screen hidden md:block" src={imageLogin} />
                    </div>
                </div>
            </div>

        </div>
    )
}