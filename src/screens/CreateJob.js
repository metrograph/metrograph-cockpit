import React, { useState } from "react";
import logo from "../assets/logo.png";
import dashboard from "../assets/dashboard.svg";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import ButtonCreate from "../components/ButtonCreate";
import TextInput from "../components/TextInput";
import FileInput from "../components/FileInput";
import CheckBox from "../components/CheckBox";
import ubuntuIcon from "../assets/ubuntu.png";
import ubunIcon from "../assets/ubuntu.svg";
import fedoraIcon from "../assets/fedora.svg";
import DropList from "../components/DropList";
import ConfirmationBox from "../components/ConfirmationBox";
export default function CreatJob() {
  const [data, setData] = useState([{ id: "" }, { id: "" }, { id: "" }]);
  const show = () => {
    console.log(data);
  };
  return (
    <div classNameName="App">
      <div className="bg-brand-primary min-h-screen">
        <Header logo={logo} />
        <div className="container mx-auto">
          <PageTitle icon={dashboard} text="CREATE JOB" />

          <div className="mt-8"></div>
          <div className="flex flex-row w-full">
            <div className="w-1/2">
              <TextInput title="JOB NAME" placeholder="" />
              <div className="mt-4">
                <TextInput title="JOB DESCRIPTION" placeholder="" />
              </div>
              <div className="mt-8"></div>
              <div>
                <p className="text-white text-sm mb-6">SOURCE CODE</p>
                <CheckBox />
                <div className="mt-4"></div>
                <FileInput />
              </div>
            </div>
            <div className="border-r-2 border-brand-header mx-8"></div>
            <div className="w-1/2">
              <p className="text-sm font-semibold text-white">
                RUNTIME ENVIRONMENT
              </p>
              <div className="flex flex-row space-x-4 mt-8">
                <img
                  src={ubunIcon}
                  className={"w-20 h-20 cursor-pointer " + data[0].id}
                  onClick={() =>
                    setData([
                      { id: "outline  outline-white" },
                      { id: "" },
                      { id: "" },
                    ])
                  }
                />
                <img
                  src={fedoraIcon}
                  className={"w-20 h-20 cursor-pointer " + data[1].id}
                  onClick={() =>
                    setData([
                      { id: "" },
                      { id: "outline  outline-white" },
                      { id: "" },
                    ])
                  }
                />
                <img
                  src={ubuntuIcon}
                  className={"w-20 h-20 cursor-pointer " + data[2].id}
                  onClick={() =>
                    setData([
                      { id: "" },
                      { id: "" },
                      { id: "outline  outline-white" },
                    ])
                  }
                />
              </div>

              <DropList />
            </div>
          </div>
          <ConfirmationBox />
        </div>
      </div>
    </div>
  );
}
