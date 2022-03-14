import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import ButtonAction from "../ButtonAction";
import ButtonStatus from "../ButtonStatus";
import runIcon from "../../assets/run.svg";
import crossIcon from "../../assets/cross.svg";
import "../../logo.css"


export default function JobRow(props) {



    const [status, setStatus] = useState(props.status);
    const [actionType, setActionType] = useState(props.actionType);
    const [vanish, setVanish] = useState("")
    const mystate = useSelector((state) => state)

    const dispatch = useDispatch()

    function runTask(id) {

        let payloadAlert = { is_hide: false, type: "success" }


        axios.post("http://157.90.233.37:80/task/" + id + "/run")
            .then(res => {
                console.log(res);
                setStatus("running");
                setActionType("stop");
                let payloadAlert = { is_hide: false, type: "success", title: "Job Operation completed successfully", description: 'Your job ' + props.name + ' did run successfully!' }
                dispatch({ type: "setAlert", payload: payloadAlert })

            })
        setStatus("pending");
    }

    function deleteJob(id) {



        axios.delete("http://157.90.233.37:80/task/" + id)
            .then(res => {
                setVanish("vanish")
                setTimeout(
                    function () {
                        dispatch({ type: "deletedJob", payload: id })
                        let payloadAlert = { is_hide: false, type: "success", title: "Job Removed Successfully", description: 'Your job ' + props.name + ' has been removed successfully!' }
                        dispatch({ type: "setAlert", payload: payloadAlert })
                    }, 400);

            })
    };

    const stopJob = () => {
        setStatus("ready");
        setActionType("run");
    };
    const runJob = () => {
        setStatus("running");
        setActionType("stop");
    };

    return (
        <div className={"App-logo " + vanish}>
            <div className="flex flex-row ">

                <div className="w-full flex  bg-brand-header border-2 border-white h-24 px-4 justify-between content-center">
                    {/*  element title and info start */}
                    <div className="lg:w-3/12 md:w-3/12 flex flex-col place-content-center  ">
                        <p className="text-white">{props.name}</p>
                        <p className="text-gray-400 text-sm">{props.info}</p>
                    </div>

                    {/*  element title and info end */}

                    {/*  element config start */}
                    <div className="lg:w-3/12 md:w-3/12 flex  place-items-center space-x-2 justify-center ">
                        <div className="bg-brand-dark-button h-12 lg:w-14 grid place-content-center ">
                            <img className="" src={props.technologieIcon} />
                        </div>
                        <div className="bg-brand-dark-button h-12 lg:w-20 grid place-content-center ">
                            <p className=" text-white  text-md">3.9.10</p>
                        </div>

                    </div>
                    {/*  element config end */}
                    {/*  element status start */}
                    <div className="lg:w-3/12 md:w-1/12 flex place-items-center justify-center ">
                        <ButtonStatus status={status} />
                    </div>
                    {/*  element status end */}

                    {/*  element config start */}
                    <div className="lg:w-3/12 md:w-4/12 flex  place-items-center space-x-2 justify-end ">

                        {actionType === "run" && (
                            <button
                                onClick={() => runTask(props.id)}
                                className="flex items-center bg-cock-purple border-2 border-white h-12 w-28 space-x-2 px-6 hover:bg-purple-400 cursor-pointer"
                            >
                                <img src={runIcon} height="10" width="10" />
                                <p className="text-white text-md">RUN</p>
                            </button>
                        )}
                        {actionType !== "run" && (
                            <button
                                onClick={stopJob}
                                className="flex items-center bg-cock-red border-2 border-white h-12 w-28 space-x-2 px-6 hover:bg-red-400 cursor-pointer"
                            >
                                <img src={crossIcon} height="10" width="10" />
                                <p className="text-white text-md">STOP</p>
                            </button>
                        )}
                        <div onClick={() => deleteJob(props.id)} className="flex  place-items-center justify-center bg-cock-red  border-2 border-white h-12 w-28 space-x-2 px-2 hover:bg-red-400 cursor-pointer">
                            <p className="text-white text-md">DELETE</p>
                        </div>

                        {/*  button Run end */}
                    </div>
                    {/*  element config end */}
                </div>

                <div className="border-r-4 border-purple-600"></div>
            </div>

            <div className="border-t-4 border-purple-600"></div>
        </div>
    );
}
