import { useState } from "react";
import { ReactComponent as ActionIcon } from "../../assets/topbar/action.svg";
import { ReactComponent as DashboardIcon } from "../../assets/topbar/dashboard.svg";
import { ReactComponent as ApiIcon } from "../../assets/topbar/api.svg";
import { ReactComponent as ApplicationIcon } from "../../assets/topbar/apps.svg";
import { ReactComponent as WorkflowsIcon } from "../../assets/topbar/workflows.svg";


import logo from "../../assets/logo.svg";
import arrowdown from "../../assets/icons/arrow-down.svg";
import avatar from "../../assets/avatar/avatar-2.png";

export default function TopBar(){
     //Top bar end
     const [is_listSetOpen, setIs_listSetOpen] = useState(false);
  

    return (
        <div className="relative">
        <div className="flex justify-between items-center pt-[43px]">
          <div className="text-white">
            <img src={logo} className="h-[34px] w-[147px]" alt="" />
          </div>
          <div className="flex grow lg:justify-end lg:pr-[187px] text-white space-x-[82px]">
            <div className="flex flex-col cursor-pointer">
              <div className="flex space-x-2">
                <DashboardIcon fill="white" height="11x" width="9px" />
                <div className="text-[11px] font-bold font-IBM-Plex-Sans">
                  DASHBOARD
                </div>
              </div>
              <div className="border-b-2 border-white mt-[7px] opacity-0" />
            </div>
            <div className="flex flex-col cursor-pointer">
              <div className="flex space-x-2">
                <ActionIcon fill="white" height="11x" width="5px" />
                <div className="text-[11px] font-bold font-IBM-Plex-Sans">
                  ACTIONS
                </div>
              </div>
              <div className="border-b-2 border-white mt-[7px]" />
            </div>

            <div className="flex flex-col cursor-pointer">
              <div className="flex space-x-2">
                <ApiIcon fill="white" height="11x" width="11px" />
                <div className="text-[11px] font-bold font-IBM-Plex-Sans">
                  APIS
                </div>
              </div>
              <div className="border-b-2 border-white mt-[7px] opacity-0" />
            </div>
            <div className="flex flex-col cursor-pointer">
              <div className="flex space-x-2">
                <ApplicationIcon fill="white" height="9x" width="9px" />
                <div className="text-[11px] font-bold font-IBM-Plex-Sans">
                  APPLICATIONS
                </div>
              </div>
              <div className="border-b-2 border-white mt-[7px] opacity-0" />
            </div>

            <div className="flex flex-col cursor-pointer">
              <div className="flex space-x-2">
                <WorkflowsIcon fill="white" height="10x" width="10px" />
                <div className="text-[11px] font-bold font-IBM-Plex-Sans">
                  WORKFLOWS
                </div>
              </div>
              <div className="border-b-2 border-white mt-[7px] opacity-0" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-4 relative">
              <img
                src={avatar}
                className="h-[38px] w-[38px] rounded-full"
                alt=""
              />
              <div
                onClick={() => setIs_listSetOpen(!is_listSetOpen)}
                className="flex space-x-2 cursor-pointer"
              >
                <div className="text-white font-IBM-Plex-Sans font-semibold text-[16px]">
                  Hamza
                </div>
                <img src={arrowdown} alt="" />
              </div>

              {is_listSetOpen && (
                <div className="absolute z-20 w-[180px] top-16 right-0 py-4 flex flex-col space-y-2 bg-[#1A1A1A] rounded-lg cursor-pointer">
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
       
      </div>
    )
}