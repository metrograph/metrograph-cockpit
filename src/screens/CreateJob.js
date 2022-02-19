import React, { useState } from "react";
import logo from "../assets/logo.png";
import dashboard from "../assets/dashboard.svg";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import TextInput from "../components/TextInput";
import FileInput from "../components/FileInput";
import CheckBox from "../components/CheckBox";
import ubuntuIcon from "../assets/ubuntu.png";
import ubunIcon from "../assets/ubuntu.svg";
import fedoraIcon from "../assets/fedora.svg";
import DropList from "../components/DropList";
import ConfirmationBox from "../components/ConfirmationBox";
import Footer from "../components/Footer";

const opsys = [
  { key: 1, name: "ubunty", versions: ["20.04 LTS", "18.06 LTS", "14.02 LTS"] },
  { key: 2, name: "fedora", versions: ["34 LTS", "33 LTS", "32 LTS"] },
  { key: 3, name: "centos", versions: ["8 LTS", "7 LTS", "6 LTS"] },
];

export default function CreatJob() {
  const [oslist, setOslist] = useState(opsys[0].versions);
  const [data, setData] = useState([
    { id: "outline  outline-white" },
    { id: "" },
    { id: "" },
  ]);
  const [os, setOs] = useState(oslist[0]);
  const [title, setTitle] = useState("");
  const [selectedOs, setselectedOs] = useState(oslist[0]);
  const updateOsList = (elementstyle, element) => {
    setData(elementstyle);
    setOslist(element);
    setselectedOs(element[0]);
  };
  return (
    <div>
      <head></head>
      <div className="bg-brand-primary min-h-screen ">
        <Header logo={logo} />
        <div className="container mx-auto">
          <PageTitle icon={dashboard} text="CREATE JOB" />

          <div className="mt-8"></div>
          <div className="flex flex-row w-full">
            <div className="w-1/2">
              <TextInput
                title="JOB NAME"
                placeholder="Backup MongoDB to S3..."
              />
              <div className="mt-4">
                <TextInput
                  title="JOB DESCRIPTION"
                  placeholder="A Python script to copy the MongoDB instace to AWS S3..."
                />
              </div>
              <div className="mt-8"></div>
              <div>
                <p className="text-white text-sm mb-6 font-Inter font-bold">
                  SOURCE CODE
                </p>
                <CheckBox />
                <div className="mt-4"></div>
                <FileInput />
              </div>
            </div>
            <div className="border-r-2 border-brand-header mx-8"></div>
            <div className="w-1/2">
              <p className="text-sm  text-white font-Inter font-bold">
                RUNTIME ENVIRONMENT
              </p>
              <div className="flex flex-row space-x-4 mt-8">
                <img
                  src={ubunIcon}
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
                  src={fedoraIcon}
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
                  src={ubuntuIcon}
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

              <DropList
                oslist={oslist}
                setOslist={setOslist}
                selectedOs={selectedOs}
                setselectedOs={setselectedOs}
              />
            </div>
          </div>
          <ConfirmationBox />
          <Footer />
        </div>
      </div>
    </div>
  );
}
