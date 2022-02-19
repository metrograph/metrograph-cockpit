import { useState } from "react";
import "../App.css";
import logo from "../assets/logo.png";
import dashboard from "../assets/dashboard.svg";
import python from "../assets/python.svg";
import more from "../assets/more.svg";
import time from "../assets/time.svg";
import run from "../assets/run.svg";
import nodejs from "../assets/node-js.svg";
import cross from "../assets/cross.svg";
import Header from "../components/Header";
import ButtonCreate from "../components/ButtonCreate";
import PageTitle from "../components/PageTitle";
import JobRow from "../components/JobRow";
import Footer from "../components/Footer";
import job from "../local/jobs";

function JobList(props) {
  const data = props.job;
  return data.map((element) => (
    <JobRow
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
  const [jobs, setJobs] = useState(job);
  return (
    <div classNameName="App">
      <div className="bg-brand-primary min-h-screen">
        <Header logo={logo} />
        <div className="container mx-auto">
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
            <JobList job={job} />
          </div>
          {/* Dahsboard Jobs end */}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
