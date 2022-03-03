import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonAction from "./ButtonAction";
import ButtonStatus from "./ButtonStatus";
import runIcon from "../assets/run.svg";
import crossIcon from "../assets/cross.svg";

export default function JobRow(props) {

  const [status, setStatus] = useState(props.status);
  const [actionType, setActionType] = useState(props.actionType);

  const mystate = useSelector((state) => state)

  const dispatch = useDispatch()
  const removejob = () => { dispatch({ type: "deletedJob", payload: props.key }) };

  const stopJob = () => {
    setStatus("ready");
    setActionType("run");
  };
  const runJob = () => {
    setStatus("running");
    setActionType("stop");
  };

  return (
    <div>
      <div className="flex flex-row">

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
            <div className="bg-brand-dark-button h-12 lg:w-44 grid place-content-center ">
              <p className=" text-white  text-md">{props.serverConfig}</p>
            </div>
            <div className="bg-brand-dark-button h-12 lg:w-20 grid place-content-center">
              <p className=" text-white text-md">{props.serverLocation}</p>
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
            {/*   button more start */}
            <div onClick={removejob} className="bg-brand-dark-button h-12  border-2 border-white grid place-content-center hover:bg-zinc-500 cursor-pointer">
              <img className="px-4" src={props.moreIcon} />
            </div>
            {/*   button more end */}
            {/*  button SCHEDULE start  */}
            <div className="flex items-center bg-brand-dark-button  border-2 border-white h-12 space-x-2 px-2 hover:bg-zinc-500 cursor-pointer">
              <img src={props.timeIcon} height="16" width="16" />
              <p className="text-white text-md">SCHEDULE</p>
            </div>
            {/*  button SCHEDULE end  */}
            {/*  button Rund start */}

            {actionType === "run" && (
              <button
                onClick={runJob}
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
