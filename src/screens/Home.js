import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";


import Header from "../components/Header";
import ButtonCreate from "../components/ButtonCreate";
import PageTitle from "../components/PageTitle";
import JobRow from "../components/v1/JobRow";
import Footer from "../components/Footer";
import Alert from "../components/Alert";


import logo from "../assets/logo.svg";
import dashboard from "../assets/dashboard.svg";
import more from "../assets/more.svg";
import time from "../assets/time.svg";
import python_icon from "../assets/python.svg";
import empty_image from "../assets/empty.svg"






function JobList(props) {


  const jobList = props.job
  if (!jobList) return <idv></idv>
  return jobList.map((element) => (
    <JobRow
      key={element.uuid}
      id={element.uuid}
      name={element.task_name}
      info={element.task_description}
      technologieIcon={python_icon}
      serverConfig="2vCPUs / 2G RAM"
      serverLocation="LOCAL"
      status="ready"
      moreIcon={more}
      timeIcon={time}
      actionType="run"


    />
  ));



}


function App() {

  const endPoint = "http://157.90.233.37:80/task"
  const dispatch = useDispatch()
  const mystate = useSelector((state) => state)
  const navigate = useNavigate()





  function loadLocalStorage() {
    if (!mystate.user.token) {
      const localstorage = localStorage.getItem("localState")
      const data = JSON.parse(localstorage)
      if (!data) {
        return navigate("/")
      }
      dispatch({ type: "setUser", payload: data })
    }



  }

  function loadJob() {

    let token = "Bearer " + mystate.user.token
    axios.get("http://157.90.233.37/v1/task", { headers: { "Authorization": token } })
      .then(function (response) {
        let data = response.data.payload.tasks
        dispatch({ type: "setJobs", payload: data })

      })
  }


  useEffect(() => {


    loadLocalStorage()
    if (mystate.user.token) {
      loadJob()
    }



  }, [mystate.user]);



  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Metrograph</title>
      </Helmet>

      <div className="bg-brand-primary min-h-screen ">
        <Header logo={logo} />

        <div className="container mx-auto">
          {!mystate.alert.is_hide && <Alert type={mystate.alert.type} />}


          {/*  Dashboard header start */}
          <div className="flex justify-between">
            {/*  Title page start */}
            <PageTitle icon={dashboard} text="JOB MANAGEMENT" />
            {/*  Title page end */}
            {/*  Button creat job  start */}
            <ButtonCreate text="+ CREATE JOB" />
            {/*  Button  end */}
          </div>
          {/*  Dashboard header end */}

          {/* Dahsboard Jobs start */}
          <div className="mt-20 pb-44 space-y-4">
            <JobList job={mystate.jobs} />


            {!mystate.jobs.length && <div className="mt-44 mb-20 flex flex-col items-center"><img src={empty_image} height="125px" width="125px" />
              <p className="mt-6 font-Rajdhani font-bold text-cock-purple-light text-center text-3xl">Your space is still empty.<br />Start creating Tasks and let the creativity begin!</p></div>}

          </div>
          {/* Dahsboard Jobs end */}
        </div>
        <div>



        </div>
        <Footer />
      </div>
    </div>
  );
}


export default App;
