import { Helmet } from "react-helmet";
import imageLogin from "../assets/bg-login.jpg"
import logo from "../assets/logo.svg"
import dashboardIcon from "../assets/dashboard.svg"

export default function Login() {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login to Metrograph</title>
            </Helmet>

            <div className="bg-cock-purple-dark min-h-screen">
                <div className="flex flex-row container mx-auto">
                    <div className="flex flex-col w-1/2  min-h-screen ">
                        <div className="flex justify-center mt-32 -ml-28">
                            <img className="h-16 " src={logo} />
                        </div>


                        <div className="mt-28 flex items-start space-x-4">
                            <img src={dashboardIcon} height="24" width="24" />
                            <p className="text-2xl text-white font-Rajdhani font-medium">
                                Login to your account
                            </p>
                        </div>
                        {/* username  input start */}
                        <div className="mt-16 w-4/5">
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
                        <div className="mt-4 w-4/5">
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

                        <div className="mt-12 flex w-4/5 justify-end">
                            <button className="bg-cock-green border-2 border-white h-10 w-28 space-x-2 px-6 hover:bg-green-400 cursor-pointer text-white text-xs font-Rajdhani font-bold">
                                LOGIN
                            </button>
                        </div>
                        {/* Button end */}
                    </div>
                    <div className="w-1/2 bg-cock-dark">

                    </div>
                </div>
            </div>
        </div>
    )
}