import React, { useState } from "react";
import { Helmet } from "react-helmet";
import logo from "../assets/logo.svg";
import dashboard from "../assets/dashboard.svg";
import runIcon from "../assets/run.svg";
import crossIcon from "../assets/cross.svg";
import acceptIcon from "../assets/accept.svg";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import TextInput from "../components/TextInput";
import FileInput from "../components/FileInput";
import CheckBox from "../components/CheckBox";
import ubuntuIcon from "../assets/ubuntu.png";
import pythonIcon from "../assets/runtime/python.svg"
import ubunIcon from "../assets/ubuntu.svg";
import fedoraIcon from "../assets/fedora.svg";
import nodejsIcon from "../assets/runtime/nodejs.svg";
import javaIcon from "../assets/runtime/java.svg";
import DropList from "../components/DropList";
import ConfirmationBox from "../components/ConfirmationBox";
import { Listbox, Transition } from "@headlessui/react";
import dropIcon from "../assets/drop.svg";
import Footer from "../components/Footer";
import job from "../local/jobs";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Alert from "../components/Alert";

const opsys = [
  { key: 1, name: "python", versions: ["3.9.10", "18.06", "14.02"] },
  { key: 2, name: "nodejs", versions: ["34 LTS", "33 LTS", "32 LTS"] },
  { key: 3, name: "java", versions: ["8 LTS", "7 LTS", "6 LTS"] },
];

export default function CreatJob() {
  const [tagInput, setTagInput] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const mystate = useSelector((state) => state)

  const Tags = (props) => {

    const mytags = props.mytags;
    if (!mytags) return <idv></idv>
    return mytags.map((element) => (
      <div className=" bg-cock-purple px-2 cursor-pointer" onClick={() => removeTag(element)}>{element}</div>
    ));
  }

  const removeTag = (element) => {
    let data = tasktags.filter(e => e !== element)
    if (data) setTasktags(data)
  }
  const [oslist, setOslist] = useState(opsys[0].versions);
  const [data, setData] = useState([
    { id: "outline  outline-white" },
    { id: "" },
    { id: "" },
  ]);
  const [os, setOs] = useState(oslist[0]);
  const [selectedOs, setselectedOs] = useState(oslist[0]);


  const [file, setFile] = useState({ name: " Attach your Code here" })
  const [taskname, setTaskname] = useState()
  const [taskdescription, setTaskdescription] = useState()
  const [tasktags, setTasktags] = useState([])

  const updateOsList = (elementstyle, element) => {
    setData(elementstyle);
    setOslist(element);
    setselectedOs(element[0]);
  };



  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (tagInput) {
        console.log(tasktags);
        setTasktags([...tasktags, tagInput])
        setTagInput("")
        console.log('do validate');
      }
    }
  }

  const uploadfile = (e) => {
    let fileTarge = e.target.files[0]
    setFile(fileTarge)
  }

  const submitform = () => {

    let payload = { id: "4", name: taskname, info: taskdescription }
    dispatch({ type: "addedJob", payload })


    let job = new FormData();
    job.append("task_package", file);
    job.append("task_name", taskname);
    job.append("task_description", taskdescription);
    job.append("language", "python");
    job.append("version", "3.9.10");


    axios.post("http://157.90.233.37:80/task", job)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

    return navigate('/')


  }
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Create Job | Metrograph</title>

      </Helmet>

      <div className="bg-brand-primary min-h-screen ">
        <Header logo={logo} />
        <div className="container mx-auto">
          <Alert type="error" />
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
              <div className="mt-4">
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
              </div>
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
                    "w-20 h-20 cursor-pointer hover:outline hover:outline-white " +
                    data[0].id
                  }
                  onClick={() =>
                    updateOsList(
                      [
                        { id: "outline  outline-white" },
                        { id: "" },
                        { id: "" },
                      ],
                      opsys[0].versions
                    )
                  }
                />
                <img
                  src={nodejsIcon}
                  className={
                    "w-20 h-20 cursor-pointer hover:outline hover:outline-white " +
                    data[1].id
                  }
                  onClick={() =>
                    updateOsList(
                      [
                        { id: "" },
                        { id: "outline  outline-white" },
                        { id: "" },
                      ],
                      opsys[1].versions
                    )
                  }
                />
                <img
                  src={javaIcon}
                  className={
                    "w-20 h-20 cursor-pointer hover:outline hover:outline-white " +
                    data[2].id
                  }
                  onClick={() =>
                    updateOsList(
                      [
                        { id: "" },
                        { id: "" },
                        { id: "outline  outline-white" },
                      ],
                      opsys[2].versions
                    )
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

            </div>
          </div>
          {/* Confirmation box start */}
          <div className="mt-12 bg-brand-header w-full h-28 flex flex-row border-r-4 justify-between  border-b-4 border-cock-purple items-center static">
            <p className="text-white texl-3xl  ml-8 font-Rajdhani font-semibold">
              CONFIRMATION
            </p>
            <div className="mr-8 flex flex-row justify-between space-x-4 items-center">
              <Link to="/">
                <div className="flex items-center justify-center bg-brand-header border-2 border-white h-10 w-36 space-x-2 px-6 hover:bg-zinc-600 cursor-pointer">
                  <img src={crossIcon} height="10" width="10" />
                  <p className="text-white text-xs font-Rajdhani font-bold">CANCEL</p>
                </div>
              </Link>
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
