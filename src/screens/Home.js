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
function App() {
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
          <div className="mt-20 pb-44">
            <JobRow
              name="Call Weather Data From API"
              info="V3.5 - GIT ef802b0 - 18 hours ago"
              technologieIcon={python}
              serverConfig="2vCPUs / 2G RAM"
              serverLocation="LOCAL"
              status="Ready"
              moreIcon={more}
              timeIcon={time}
              status="ready"
              actionType="run"
            />
            <div className="mb-4"></div>
            <JobRow
              name="Backup MongoDB to GDrive"
              info="V1 - Local code"
              technologieIcon={nodejs}
              serverConfig="1vCPUs / 512M RAM"
              serverLocation="AWS"
              status="RUNNING"
              moreIcon={more}
              timeIcon={time}
              status="running"
              actionType="stop"
            />
          </div>
          {/* Dahsboard Jobs end */}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
