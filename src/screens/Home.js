import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import Header from "../components/Header";
import ButtonCreate from "../components/ButtonCreate";
import PageTitle from "../components/PageTitle";
import JobRow from "../components/JobRow";
import Footer from "../components/Footer";
import Alert from "../components/Alert";

import "../App.css";

import logo from "../assets/logo.svg";
import dashboard from "../assets/dashboard.svg";
import more from "../assets/more.svg";
import time from "../assets/time.svg";




function JobList(props) {

  const jobList = props.job
  if (!jobList) return <idv></idv>
  return jobList.map((element) => (
    <JobRow
      key={element._id}
      name={element.name}
      info={element.info}
      technologieIcon={element.technologieIcon}
      serverConfig={element.serverConfig}
      serverLocation={element.serverLocation}
      status={element.status}
      moreIcon={more}
      timeIcon={time}
      actionType={element.actionType}
    />
  ));



}


function App() {
  const mystate = useSelector((state) => state)
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Metrograph</title>
      </Helmet>

      <div className="bg-brand-primary min-h-screen">
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
          </div>
          {/* Dahsboard Jobs end */}
        </div>
        <Footer />
      </div>
    </div>
  );
}


export default App;
