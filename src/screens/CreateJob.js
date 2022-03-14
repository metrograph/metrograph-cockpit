import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Listbox, Transition } from "@headlessui/react";

import Header from "../components/Header";
import Alert from "../components/Alert";
import PageTitle from "../components/PageTitle";
import CheckBox from "../components/CheckBox";
import Footer from "../components/Footer";

import "../mycss.css"
import "../animation.css"

import logo from "../assets/logo.svg";
import dashboard from "../assets/dashboard.svg";
import crossIcon from "../assets/cross.svg";
import acceptIcon from "../assets/accept.svg";
import pythonIcon from "../assets/runtime/python.svg"
import nodejsIcon from "../assets/runtime/nodejs.svg";
import javaIcon from "../assets/runtime/java.svg";
import dropIcon from "../assets/drop.svg";






export default function CreateJob() {

  const mystate = useSelector((state) => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const opsys = [
    { key: 1, name: "python", versions: ["3.9.10"] },

  ];

  const opsysV2 = [
    { key: 1, name: "python", versions: ["3.9.10", "18.06", "14.02"] },
    { key: 2, name: "nodejs", versions: ["34 LTS", "33 LTS", "32 LTS"] },
    { key: 3, name: "java", versions: ["8 LTS", "7 LTS", "6 LTS"] },
  ];

  const [tagInput, setTagInput] = useState()
  const [oslist, setOslist] = useState(opsys[0].versions);
  const [data, setData] = useState([
    { id: "outline  outline-white" },
    { id: "" },
    { id: "" },
  ]);

  const [os, setOs] = useState(oslist[0]);
  const [selectedOs, setselectedOs] = useState(oslist[0]);


  const [file, setFile] = useState({ name: " Attach your Code here", is_empty: true })
  const [taskname, setTaskname] = useState()
  const [taskdescription, setTaskdescription] = useState()
  const [tasktags, setTasktags] = useState([])


  function Tags(props) {
    const mytags = props.mytags;
    if (!mytags) return <idv></idv>
    return mytags.map((element) => (
      <div className=" bg-cock-purple px-2 cursor-pointer" onClick={() => removeTag(element)}>{element}</div>
    ));
  }

  function removeTag(element) {
    let data = tasktags.filter(e => e !== element)
    if (data) setTasktags(data)
  }

  function updateOsList(elementstyle, element) {
    setData(elementstyle);
    setOslist(element);
    setselectedOs(element[0]);
  };

  function handleKeyDown(element) {
    if (element.key === 'Enter') {
      if (tagInput) {
        console.log(tasktags);
        setTasktags([...tasktags, tagInput])
        setTagInput("")
        console.log('do validate');
      }
    }
  }

  function uploadfile(element) {

    let fileTarge = element.target.files[0]
    setFile(fileTarge)
  }

  function submitform() {
    let payloadAlert = {}
    if (!taskname) {
      payloadAlert = { is_hide: false, type: "error", title: "Task Name is missing!", description: "Please make sure to give a name to the task you wish to create." }
      return dispatch({ type: "setAlert", payload: payloadAlert })
    }
    if (file.is_empty) {
      payloadAlert = { is_hide: false, type: "error", title: "Task code is missing!", description: "Please make sure to choose the code package you wish to submit." }
      return dispatch({ type: "setAlert", payload: payloadAlert })
    }

    else {

      let job = new FormData();
      job.append("task_package", file);
      job.append("task_name", taskname);
      job.append("task_description", taskdescription);
      job.append("runtime", "python");
      job.append("runtime_version", "3.9.10");


      axios.post("http://157.90.233.37:80/task", job)
        .then(res => {
          console.log(res);
          payloadAlert = { is_hide: false, type: "success", title: "Job Built Successfully", description: 'Your job ' + taskname + ' has been deployed successfully! ready to run.' }
          let payload = { uuid: res.data.payload.task.uuid, task_name: taskname, task_description: taskdescription }
          dispatch({ type: "addedJob", payload: payload })
          dispatch({ type: "setAlert", payload: payloadAlert })

        })



      return navigate(-1)
    }


  }


  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Create Job | Metrograph</title>
      </Helmet>

      <div className="bg-brand-primary min-h-screen ">
        <Header logo={logo} />
        <div className="container mx-auto App-logo">
          {!mystate.alert.is_hide && <Alert />}
          <PageTitle icon={dashboard} text="CREATE JOB" />

          <div className="mt-8"></div>
          <div className="flex flex-row w-full">
            <div className="w-1/2">
              {/* Job name input start*/}
              <div className="">
                <div className="flex flex-row items-center space-x-2">
                  <div className="w-2 border-t-2 border-brand-header" />
                  <p className="text-brand-dark-button text-xs flex-shrink-0 font-Inter font-bold">
                    JOB NAME
                  </p>
                  <div className="w-full border-t-2 border-brand-header" />
                </div>
                <div className="border-2 border-t-0 border-brand-header -mt-2">
                  <input
                    className=" bg-transparent focus:outline-none h-8 text-white px-4 my-2  w-full text-lg font-Inter font-medium"
                    placeholder="Job name.."
                    onChange={e => setTaskname(e.target.value)}
                    value={taskname}
                  />
                </div>
              </div>
              {/* Job name input end */}

              {/* Job description input start */}
              <div className="mt-4">
                <div className="flex flex-row items-center space-x-2">
                  <div className="w-2 border-t-2 border-brand-header" />
                  <p className="text-brand-dark-button text-xs flex-shrink-0 font-Inter font-bold">
                    JOB DESCRIPTION
                  </p>
                  <div className="w-full border-t-2 border-brand-header" />
                </div>
                <div className="border-2 border-t-0 border-brand-header -mt-2">
                  <input
                    className=" bg-transparent focus:outline-none h-8 text-white px-4 my-2  w-full text-lg font-Inter font-medium"
                    placeholder="Job description..."
                    onChange={e => setTaskdescription(e.target.value)}
                    value={taskdescription}
                  />
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
              <div className="mt-8"></div>
              <div>
                <p className="text-white text-sm mb-6 font-Inter font-bold">
                  SOURCE CODE
                </p>
                <CheckBox />
                <div className="mt-4"></div>
                {/* File input  start */}
                <div className="">
                  <div className="flex flex-row items-center space-x-2">
                    <div className="w-2 border-t-2 border-brand-header" />
                    <p className="text-brand-header text-xs flex-shrink-0 font-Inter font-bold">
                      UPLOAD CODE
                    </p>
                    <div className="w-full border-t-2 border-brand-header" />
                  </div>
                  <div className="border-2 border-t-0 border-brand-header -mt-2">
                    <div className="overflow-hidden p-4 ">
                      <div className="relative h-8 bg-brand-header flex justify-center items-center">
                        <div className="absolute">
                          <div className="flex flex-col items-center">
                            <span className="block text-white text-xs font-Inter font-medium">
                              {file.name}
                            </span>
                          </div>
                        </div>
                        <input
                          type="file"
                          className="h-full w-full opacity-0"
                          name="myfile"
                          onChange={(e) => uploadfile(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* File input end */}
              </div>
            </div>
            <div className="border-r-2 border-brand-header mx-8"></div>
            <div className="w-1/2">
              <p className="text-sm  text-white font-Inter font-bold">
                RUNTIME ENVIRONMENT
              </p>
              <div className="flex flex-row space-x-4 mt-8">
                <img
                  src={pythonIcon}
                  className={
                    "w-20 h-20  hover:outline hover:outline-white " +
                    data[0].id
                  }

                />

              </div>
              {/* Listbox start */}
              <Listbox as="div" value={selectedOs} onChange={setselectedOs}>
                {({ open }) => (
                  <>
                    <div className="mt-8 relative">
                      <div className="absolute w-full">
                        <div className="flex flex-row items-center space-x-2">
                          <div className="w-2 border-t-2 border-brand-header" />
                          <p className="text-brand-dark-button text-xs flex-shrink-0 font-Inter font-bold">
                            VERSION
                          </p>
                          <div className="w-full border-t-2 border-brand-header" />
                        </div>

                        <div className="border-2 border-t-0 border-brand-header -mt-2">
                          <div className="relative">
                            <span className="inline-block w-full">
                              <Listbox.Button className="flex justify-between pl-3 py-4 w-full text-left focus:outline-none  text-white text-sm font-Inter font-bold">
                                <span className="block truncate">{selectedOs}</span>
                                <img
                                  src={dropIcon}
                                  height="12"
                                  width="12"
                                  className="mr-4"
                                />
                              </Listbox.Button>
                            </span>
                          </div>
                        </div>

                        <Transition
                          show={open}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options
                            static
                            className="border border-brand-header bg-brand-primary  mt-1"
                          >
                            {oslist.map((fruit) => (
                              <Listbox.Option key={fruit} value={fruit}>
                                {({ selected, active }) => (
                                  <div
                                    className={`${active ? " text-white bg-purple-600" : "text-white"
                                      } text-sm cursor-default select-none relative py-2 pl-10 pr-4`}
                                  >
                                    <span
                                      className={`${selected ? " font-semibold" : "font-normal"
                                        }`}
                                    >
                                      {fruit}
                                    </span>
                                    {selected && (
                                      <span
                                        className={`${active ? "text-white" : "text-purple-600"
                                          } absolute inset-y-0 left-0 flex items-center pl-2`}
                                      >
                                        <svg
                                          className="h-5 w-5"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </span>
                                    )}
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </div>
                  </>
                )}
              </Listbox>
              {/* List box end */}




              {/*  <div class="w-full mt-44">
                <label for="step" class="font-bold text-white">CONFIGURATION</label>

                <div className="flex flex-row space-x-4 mt-4">
                  <div className="text-white font-bold">CPU</div>
                  <div className="w-2/3">
                    <input type="range" defaultValue="2" list="tickmarks" min="0" step="2" max="8" class="w-full h-1   bg-cock-footer appearance-none" />
                    <div className="bg"></div>
                    <datalist id="tickmarks">
                      <option value="0"></option>
                      <option value="2"></option>
                      <option value="4"></option>
                      <option value="6"></option>
                      <option value="8"></option>

                    </datalist>
                  </div>
                  <div className="text-white font-semibold text-sm">4 VCORES</div>

                </div>
                <div className="flex flex-row space-x-4 mt-4">
                  <div className="text-white font-bold">RAM</div>
                  <div className="w-2/3">
                    <input type="range" defaultValue="2" list="tickmarks" min="0" step="2" max="8" class="w-full h-1   bg-cock-footer appearance-none" />
                    <div className="bg"></div>
                    <datalist id="tickmarks">
                      <option value="0"></option>
                      <option value="2"></option>
                      <option value="4"></option>
                      <option value="6"></option>
                      <option value="8"></option>

                    </datalist>
                  </div>
                  <div className="text-white font-semibold text-sm">16 GB</div>

                </div>
                <div className="flex flex-row space-x-4 mt-4">
                  <div className="text-white font-bold">DISK</div>
                  <div className="w-2/3">
                    <input type="range" defaultValue="2" list="tickmarks" min="0" step="2" max="8" class="w-full h-1   bg-cock-footer appearance-none" />
                    <div className="bg"></div>
                    <datalist id="tickmarks">
                      <option value="0"></option>
                      <option value="2"></option>
                      <option value="4"></option>
                      <option value="6"></option>
                      <option value="8"></option>

                    </datalist>
                  </div>
                  <div className="text-white font-semibold text-sm">80 GB</div>

                </div>
              </div> */}


            </div>


          </div>
          {/* Confirmation box start */}
          <div className="mt-12 bg-brand-header w-full h-28 flex flex-row border-r-4 justify-between  border-b-4 border-cock-purple items-center static">
            <p className="text-white texl-3xl  ml-8 font-Rajdhani font-semibold">
              CONFIRMATION
            </p>
            <div className="mr-8 flex flex-row justify-between space-x-4 items-center">

              <div onClick={() => navigate(-1)} className="flex items-center justify-center bg-brand-header border-2 border-white h-10 w-36 space-x-2 px-6 hover:bg-zinc-600 cursor-pointer">
                <img src={crossIcon} height="10" width="10" />
                <p className="text-white text-xs font-Rajdhani font-bold">CANCEL</p>
              </div>

              <div
                onClick={submitform}
                className="flex items-center justify-center bg-cock-green border-2 border-white h-10 w-42 space-x-2 px-6 hover:bg-green-400 cursor-pointer">
                <img src={acceptIcon} height="10" width="10" />
                <p className="text-white text-xs font-Rajdhani font-bold">
                  CREATE JOB
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
