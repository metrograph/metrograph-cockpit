import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import runIcon from "../assets/run.svg";
import successIcon from "../assets/message/done.svg"
import warningIcon from "../assets/message/error.svg"
import crossIcon from "../assets/cross.svg";
import acceptIcon from "../assets/accept.svg";
import { Link } from "react-router-dom";
export default function Alert(props) {

    const mystate = useSelector((state) => state)
    const dispatch = useDispatch()
    const [type, setType] = useState(props.type)
    const hide = () => {
        let payload = { is_hide: true, type: null }
        dispatch({ type: "setAlert", payload })
    }



    if (type === "success") {
        return (<div className="mt-12 mb-16 bg-brand-header w-full h-28 flex flex-row border-r-4 justify-between  border-b-4 border-cock-purple items-center static">

            <div className="flex flex-row">
                <div>
                    <img src={successIcon} className="mx-4" /></div>
                <div>
                    <p className="text-white texl-3xl   font-Rajdhani font-semibold">
                        Job Built Successfully
                    </p>
                    <p className="text-white texl-3xl   font-Rajdhani font-regular">
                        Your job extract_flights_data has been deployed and scheduled successfully! click here to check the logs.
                    </p>
                </div>
            </div>

            <div className="mr-8 flex flex-row justify-between space-x-4 items-center">
                <div onClick={hide} className="flex items-center justify-center bg-brand-header border-2 border-white h-10 w-36 space-x-2 px-6 hover:bg-zinc-600 cursor-pointer">
                    <img src={crossIcon} height="10" width="10" />
                    <p className="text-white text-xs font-Rajdhani font-bold">DISMISS</p>
                </div>

            </div>
        </div>)
    }

    return (<div className="mt-12 mb-16 bg-brand-header w-full h-28 flex flex-row border-r-4 justify-between  border-b-4 border-cock-purple items-center static">

        <div className="flex flex-row">
            <div>
                <img src={warningIcon} className="mx-4" /></div>
            <div>
                <p className="text-white texl-3xl   font-Rajdhani font-semibold">
                    Task code is missing!
                </p>
                <p className="text-white texl-3xl   font-Rajdhani font-regular">
                    Please make sure to choose the code package you wish to submit.
                </p>
            </div>
        </div>

        <div className="mr-8 flex flex-row justify-between space-x-4 items-center">
            <div onClick={hide} className="flex items-center justify-center bg-brand-header border-2 border-white h-10 w-36 space-x-2 px-6 hover:bg-zinc-600 cursor-pointer">
                <img src={crossIcon} height="10" width="10" />
                <p className="text-white text-xs font-Rajdhani font-bold">DISMISS</p>
            </div>

        </div>
    </div>

    );
}