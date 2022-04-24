import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar/avatar-2.png";
import arrowdown from "../../assets/icons/arrow-down.svg";
import cloud from "../../assets/icons/cloud.svg";
import { useState } from "react";

export default function TopBar() {
  const [is_listOpen, setIs_listOpen] = useState(false);

  const [optionList, setOptionList] = useState([
    { key: 1, value: "Deploy Docker Workflow" },
    { key: 1, value: "Deploy Docker Workflow A" },
    { key: 1, value: "Deploy Docker Workflow B" },
    { key: 1, value: "Deploy Docker Workflow C" },
  ]);
  const [selectedOption, setSelectedOtion] = useState(optionList[0]);

  const [is_listSetOpen, setIs_listSetOpen] = useState(false);

  const [optionListSet, setOptionListSet] = useState([
    { key: 1, value: "Deploy Docker Workflow" },
    { key: 1, value: "Deploy Docker Workflow A" },
    { key: 1, value: "Deploy Docker Workflow B" },
    { key: 1, value: "Deploy Docker Workflow C" },
  ]);
  const [selectedOptionSet, setSelectedOtionSet] = useState(optionListSet[0]);
  return (
    <div className="bg-black h-[120px] w-full flex items-center">
      <div className="w-[384px]  flex  justify-between items-center">
        <div className="h-[20px] w-[1px] " />
        <img src={logo} className="w-[167px] mx-2" />
        <div className="h-[42px] w-[1px] bg-white opacity-20" />
      </div>
      <div className="flex grow items-center px-12 space-x-4">
        <div className="flex relative">
          <div
            onClick={() => setIs_listOpen(!is_listOpen)}
            className="flex items-center justify-between bg-cock-dark-400 w-[327px] h-[46px] rounded-lg px-4 cursor-pointer"
          >
            <div className="text-white font-Inter font-medium">
              {selectedOption.value}
            </div>
            <img src={arrowdown} className="w-[13px] h-auto" />
          </div>
          {is_listOpen && (
            <div className="flex flex-col space-y-2 bg-cock-dark w-[327px]  rounded-lg  cursor-pointer absolute top-12 py-4">
              {optionList.map((element) => (
                <div
                  onClick={() => {
                    setSelectedOtion(element);
                    setIs_listOpen(!is_listOpen);
                  }}
                  className="text-white text-md font-Inter hover:bg-cock-dark-400 py-2 px-4"
                >
                  {element.value}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-cock-purple w-[87px] h-[46px] grid place-items-center rounded-lg cursor-pointer hover:bg-purple-600">
          <div className="text-white font-Inter font-bold">SAVE</div>
        </div>
        <div className="flex space-x-2">
          <img src={cloud} />
          <div className="text-white font-Inter font-medium text-md cursor-default">
            All changes saved!
          </div>
        </div>
      </div>

      <div className="w-[384px]  flex  justify-between items-center px-8">
        <div className="py-2 px-6 rounded-md font-Inter font-bold text-white text-[13px] border-[1px] border-cock-border-light cursor-pointer hover:bg-gray-900">
          DOCS
        </div>
        <div className="h-[42px] w-[1px] bg-white opacity-20" />
        <div className="flex items-center space-x-4 relative">
          <img src={avatar} className="h-[62px] w-[62px] rounded-full" />
          <div
            onClick={() => setIs_listSetOpen(!is_listSetOpen)}
            className="flex space-x-2 cursor-pointer"
          >
            <div className="text-white font-Inter font-semibold text-[16px]">
              Hamza
            </div>
            <img src={arrowdown} />
          </div>

          {is_listSetOpen && (
            <div className="absolute z-20 w-[180px] top-16 right-0 py-4 flex flex-col space-y-2 bg-cock-dark rounded-lg cursor-pointer">
              <div className="text-white text-md font-Inter hover:bg-cock-dark-400 p-2 px-4">
                Hello
              </div>
              <div className="text-white text-md font-Inter hover:bg-cock-dark-400 p-2 px-4">
                Hello
              </div>
              <div className="text-white text-md font-Inter hover:bg-cock-dark-400 p-2 px-4">
                Hello
              </div>
              <div className="text-white text-md font-Inter hover:bg-cock-dark-400 p-2 px-4">
                Hello
              </div>
              <div className="text-white text-md font-Inter hover:bg-cock-dark-400 p-2 px-4">
                Hello
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
