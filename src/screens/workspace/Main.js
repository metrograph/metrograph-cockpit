import React, { useEffect } from "react";

import TopBar from "./TopBar";
import loopIcon from "../../assets/icons/loop.svg";

import { ReactComponent as ActionIcon } from "../../assets/icons/action.svg";
import { ReactComponent as LoopIcon } from "../../assets/icons/loopi.svg";
import { ReactComponent as DelayIcon } from "../../assets/icons/delay.svg";
import { ReactComponent as BranchIcon } from "../../assets/icons/branch.svg";
import { ReactComponent as StopIcon } from "../../assets/icons/stop.svg";
import { ReactComponent as ScriptIcon } from "../../assets/icons/script.svg";
import { ReactComponent as ToggleIcon } from "../../assets/icons/toggle.svg";
import { ReactComponent as ClipperIcon } from "../../assets/icons/cliper.svg";
import { ReactComponent as OutIcon } from "../../assets/icons/out.svg";
import { ReactComponent as ParamsIcon } from "../../assets/icons/params.svg";

import "../../assets/css/App.css"

export default function Main() {
  return (
    <div className="flex flex-col h-screen ">
      <TopBar />
      <div className="flex grow">
        {/* Left Side */}
        <div className="w-[384px]">
          {/* Search bar */}
          <div className="relative mt-[28px] flex items-center">
            <input
              className=" bg-cock-board w-[327px] h-[46px] rounded-[11px] items-center mx-[28px] pl-14  font-Inter font-medium text-[15px]"
              placeholder="Search components... "
            />
            <img src={loopIcon} className="absolute left-12" />
          </div>
          {/* Search bar end*/}
          {/* Navigation tab*/}
          <div className=" relative mt-[35px] ">
            <div className="top-[30px] -z-10 absolute border-b-[3px] border-[#F5F5F5] w-full"></div>
            <div className="flex flex-wrap justify-between ">
              <div className="border-b-[3px] border-black px-4 leading-[30px]  cursor-pointer font-bold text-[13px] font-IBM-Plex-Sans">
                BASIC
              </div>
              <div className="border-b-[3px] border-black border-transparent text-[#C8C8C8] px-4 leading-[30px] cursor-pointer font-semibold text-[13px] font-IBM-Plex-Sans">
                TRIGGERS
              </div>
              <div className="border-b-[3px] border-black border-transparent text-[#C8C8C8] px-4 leading-[30px] cursor-pointer font-semibold text-[13px] font-IBM-Plex-Sans">
                CONNECTORS
              </div>
              <div className="border-b-[3px] border-black border-transparent text-[#C8C8C8] px-4 leading-[30px] cursor-pointer font-semibold text-[13px] font-IBM-Plex-Sans">
                APPS
              </div>
            </div>
          </div>
          {/* Navigation tab end*/}

          {/* Panel */}
          <div className="flex flex-col  overflow-y-auto height-panel text-[#545454]" style={{ scrollbarWidth: "thin" }}>
            <div className="min-h-[195px] flex justify-between  border-b-[2px] border-[#F5F5F5]">
              <div className="w-1/2 flex flex-col justify-center items-center roundedArea cursor-pointer">
                <ActionIcon className="mb-[36px] hover:fill-black cursor-pointer" />
                <div className="font-Inter text-[11px] ">
                  Action
                </div>
              </div>
              <div className="w-[2px] bg-[#F5F5F5]"></div>
              <div className="w-1/2 flex flex-col justify-center items-center roundedArea cursor-pointer">
                <DelayIcon className="mb-[36px] hover:fill-black cursor-pointer" />
                <div className="font-Inter  text-[11px] ">
                  Delay
                </div>
              </div>
            </div>
            <div className="min-h-[195px] flex justify-between  border-b-[2px] border-[#F5F5F5]">
              <div className="w-1/2 flex flex-col justify-center items-center strokeArea cursor-pointer">
                <BranchIcon className="mb-[36px] hover:stroke-black cursor-pointer" />
                <div className="font-Inter  text-[11px] ">
                  Branch Condition
                </div>
              </div>
              <div className="w-[2px] bg-[#F5F5F5]"></div>
              <div className="w-1/2 flex flex-col justify-center items-center roundedArea cursor-pointer">
                <LoopIcon className="mb-[36px] hover:fill-black cursor-pointer" />
                <div className="font-Inter  text-[11px] ">
                  Loop
                </div>
              </div>
            </div>
            <div className="min-h-[195px] flex justify-between  border-b-[2px] border-[#F5F5F5]">
              <div className="w-1/2 flex flex-col justify-center items-center roundedArea cursor-pointer">
                <ScriptIcon className="mb-[36px] hover:fill-black cursor-pointer" />
                <div className="font-Inter text-[11px] ">
                  Script
                </div>
              </div>
              <div className="w-[2px] bg-[#F5F5F5]"></div>
              <div className="w-1/2 flex flex-col justify-center items-center roundedArea cursor-pointer">
                <StopIcon className="mb-[36px] hover:fill-black cursor-pointer" />
                <div className="font-Inter  text-[11px] ">
                  Stop
                </div>
              </div>
            </div>
            <div className="min-h-[195px] flex justify-between  border-b-[2px] border-[#F5F5F5]">
              <div className="w-1/2 flex flex-col justify-center items-center roundedArea cursor-pointer">
                <ToggleIcon className="mb-[36px] hover:fill-black cursor-pointer" />
                <div className="font-Inter  text-[11px] ">
                  Toggle
                </div>
              </div>
              <div className="w-[2px] bg-[#F5F5F5]"></div>
              <div className="w-1/2 flex flex-col justify-center items-center roundedArea cursor-pointer">
                <ClipperIcon className="mb-[36px] hover:fill-black cursor-pointer" />
                <div className="font-Inter  text-[11px]">
                  Call Endpoint
                </div>
              </div>
            </div>
            <div className="min-h-[195px] flex justify-between  border-b-[2px] border-[#F5F5F5]">
              <div className="w-1/2 flex flex-col justify-center items-center roundedArea cursor-pointer">
                <OutIcon className="mb-[36px] hover:fill-black cursor-pointer" />
                <div className="font-Inter  text-[11px] ">
                  Action
                </div>
              </div>
              <div className="w-[2px] bg-[#F5F5F5]"></div>
              <div className="w-1/2 flex flex-col justify-center items-center roundedArea cursor-pointer">
                <ParamsIcon className="mb-[36px] hover:fill-black cursor-pointer" />
                <div className="font-Inter text-[11px]">
                  Parameters
                </div>
              </div>
            </div>
          </div>
          {/* Panel End*/}
        </div>

        {/* Left Side End*/}
        <div className="grow bg-cock-board"></div>
        {/* right Side */}
        <div className="w-[384px] flex flex-col">
          <div>
            <div className="mt-[28px] font-Inter font-medium text-[15px] rounded-[11px] h-[46px] bg-[#F5F5F5] flex items-center mx-[28px] px-[19px] cursor-pointer">
              Choose Discrod Server
            </div>
            <div className="mt-[32px] border-b-[3px] border-[#F5F5F5] w-full"></div>
          </div>

          <div className="flex flex-col grow justify-between overflow-y-auto height-panel" style={{ scrollbarWidth: "thin" }}>
            <div className="">
              <div className="mt-[31px] mx-[28px]">
                <div className="flex justify-between">
                  <div className="font-Inter font-semibold text-[12px]">
                    SERVER CHANNEL
                  </div>
                  <div className="h-4 w-4 rounded-full bg-[#F5F5F5] border-[1px] border-[#EDEDED] cursor-pointer flex items-center justify-center">
                    <div className="font-Inter font-bold text-[#979797] text-[8px]">
                      i
                    </div>
                  </div>
                </div>
                <div className="mt-[16px] font-Inter font-medium text-[15px] rounded-[11px] h-[46px] bg-[#F5F5F5] flex items-center px-[19px] cursor-pointer">
                  Choose Channel
                </div>
              </div>

              <div className="mt-[32px] mx-[28px]">
                <div className="flex justify-between">
                  <div className="font-Inter font-semibold text-[12px]">
                    Bot Name
                  </div>
                  <div className="h-4 w-4 rounded-full bg-[#F5F5F5] border-[1px] border-[#EDEDED] cursor-pointer flex items-center justify-center">
                    <div className="font-Inter font-bold text-[#979797] text-[8px]">
                      i
                    </div>
                  </div>
                </div>
                <input
                  className="mt-[16px] font-Inter font-medium text-[15px] rounded-[11px] h-[46px] bg-[#F5F5F5] flex items-center px-[19px] w-full"
                  placeholder="Bot name"
                />
              </div>

              <div className="mt-[32px] mx-[28px]">
                <div className="flex justify-between">
                  <div className="font-Inter font-semibold text-[12px]">
                    Message
                  </div>
                  <div className="h-4 w-4 rounded-full bg-[#F5F5F5] border-[1px] border-[#EDEDED] cursor-pointer flex items-center justify-center">
                    <div className="font-Inter font-bold text-[#979797] text-[8px]">
                      i
                    </div>
                  </div>
                </div>
                <textarea
                  id="textareaResizeNone"
                  className="mt-[16px] pt-[15px] font-Inter font-medium text-[15px] rounded-[11px] h-[127px] bg-[#F5F5F5] flex items-center px-[19px] w-full"
                  placeholder="Message.."
                />
              </div>
            </div>
            <div className="flex space-x-[7px]  mx-8">
              <div className="bg-cock-purple h-[46px] w-[160px] font-Inter font-bold text-[13px] text-white rounded-[11px] flex justify-center items-center cursor-pointer">TEST</div>
              <div className="bg-[#7ECA9C] h-[46px] w-[160px] font-Inter font-bold text-[13px] text-white rounded-[11px] flex justify-center items-center cursor-pointer">SAVE</div>
            </div>
          </div>
        </div>
        {/* right Side End*/}
      </div>
    </div>
  );
}
