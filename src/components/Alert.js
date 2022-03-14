import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import successIcon from "../assets/message/done.svg"
import warningIcon from "../assets/message/error.svg"
import crossIcon from "../assets/cross.svg";
import "../animation.css"



export default function Alert() {

    const mystate = useSelector((state) => state)

    const dispatch = useDispatch()
    const [vanish, setVanish] = useState("")

    function hideAlert() {
        setVanish("vanish")
        setTimeout(
            function () {
                dispatch({ type: "setAlert", payload: { is_hide: true, type: null } })
            }, 400);

    }



    if (mystate.alert.type === "success") {
        return (
            <div className={vanish}>
                <div className="App-logo mt-12 mb-16 bg-brand-header w-full h-28 flex flex-row border-r-4 justify-between  border-b-4 border-cock-purple items-center static">

                    <div className="flex flex-row">
                        <div>
                            <img src={successIcon} className="mx-4" /></div>
                        <div>
                            <p className="text-white texl-3xl   font-Rajdhani font-semibold">
                                {mystate.alert.title}
                            </p>
                            <p className="text-white texl-3xl   font-Rajdhani font-regular">
                                {mystate.alert.description}
                            </p>
                        </div>
                    </div>

                    <div className="mr-8 flex flex-row justify-between space-x-4 items-center">
                        <div onClick={hideAlert} className="flex items-center justify-center bg-brand-header border-2 border-white h-10 w-36 space-x-2 px-6 hover:bg-zinc-600 cursor-pointer">
                            <img src={crossIcon} height="10" width="10" />
                            <p className="text-white text-xs font-Rajdhani font-bold">DISMISS</p>
                        </div>

                    </div>
                </div>
            </div>)
    }

    else if (mystate.alert.type === "error") {
        return (
            <div className={vanish}>
                <div className="App-logo mt-12 mb-16 bg-brand-header w-full h-28 flex flex-row border-r-4 justify-between  border-b-4 border-cock-purple items-center static">

                    <div className="flex flex-row">
                        <div>
                            <img src={warningIcon} className="mx-4" /></div>
                        <div>
                            <p className="text-white texl-3xl   font-Rajdhani font-semibold">
                                {mystate.alert.title}
                            </p>
                            <p className="text-white texl-3xl   font-Rajdhani font-regular">
                                {mystate.alert.description}
                            </p>
                        </div>
                    </div>

                    <div className="mr-8 flex flex-row justify-between space-x-4 items-center">
                        <div onClick={hideAlert} className="flex items-center justify-center bg-brand-header border-2 border-white h-10 w-36 space-x-2 px-6 hover:bg-zinc-600 cursor-pointer">
                            <img src={crossIcon} height="10" width="10" />
                            <p className="text-white text-xs font-Rajdhani font-bold">DISMISS</p>
                        </div>

                    </div>
                </div>
            </div>

        );

    }
    return <></>
}
