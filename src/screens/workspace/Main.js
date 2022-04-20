import React, { useEffect } from "react";

import TopBar from "./TopBar";
import loopIcon from "../../assets/icons/loop.svg";
import actionIcon from "../../assets/icons/action.svg";
import delayIcon from "../../assets/icons/delay.svg";
import loopiIcon from "../../assets/icons/loopi.svg";
import branchIcon from "../../assets/icons/branch.svg";
import stopIcon from "../../assets/icons/stop.svg";
import scriptIcon from "../../assets/icons/script.svg";
import toggleIcon from "../../assets/icons/toggle.svg";
import clipperIcon from "../../assets/icons/cliper.svg";
import outIcon from "../../assets/icons/out.svg";
import paramsIcon from "../../assets/icons/params.svg";

export default function Main() {
  return (
    <div className="flex flex-col h-screen">
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
          <div className=" relative mt-[35px]">
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
          <div className="flex flex-col  overflow-y-auto height-panel">
            <div className="min-h-[195px] flex justify-between  border-b-[2px] border-[#F5F5F5]">
              <div className="w-1/2 flex flex-col justify-center items-center">
                <img
                  src={actionIcon}
                  alt=""
                  className="mb-[36px] h-[46px] fill-red-400"
                />
                <div className="font-Inter font-medium text-[11px] text-[#545454]">
                  Action
                </div>
              </div>
              <div className="w-[2px] bg-[#F5F5F5]"></div>
              <div className="w-1/2 flex flex-col justify-center items-center">
                <img src={delayIcon} alt="" className="mb-[36px] h-[46px]" />
                <div className="font-Inter font-medium text-[11px] text-[#545454]">
                  Delay
                </div>
              </div>
            </div>
            <div className="min-h-[195px] flex justify-between  border-b-[2px] border-[#F5F5F5]">
              <div className="w-1/2 flex flex-col justify-center items-center">
                <img src={branchIcon} alt="" className="mb-[36px] h-[42px]" />
                <div className="font-Inter font-medium text-[11px] text-[#545454]">
                  Branch Condition
                </div>
              </div>
              <div className="w-[2px] bg-[#F5F5F5]"></div>
              <div className="w-1/2 flex flex-col justify-center items-center">
                <img src={loopiIcon} alt="" className="mb-[36px] h-[44px]" />
                <div className="font-Inter font-medium text-[11px] text-[#545454]">
                  Loop
                </div>
              </div>
            </div>
            <div className="min-h-[195px] flex justify-between  border-b-[2px] border-[#F5F5F5]">
              <div className="w-1/2 flex flex-col justify-center items-center">
                <img src={scriptIcon} alt="" className="mb-[36px] h-[32px]" />
                <div className="font-Inter font-medium text-[11px] text-[#545454]">
                  Script
                </div>
              </div>
              <div className="w-[2px] bg-[#F5F5F5]"></div>
              <div className="w-1/2 flex flex-col justify-center items-center">
                <img src={stopIcon} alt="" className="mb-[36px] h-[44px]" />
                <div className="font-Inter font-medium text-[11px] text-[#545454]">
                  Stop
                </div>
              </div>
            </div>
            <div className="min-h-[195px] flex justify-between  border-b-[2px] border-[#F5F5F5]">
              <div className="w-1/2 flex flex-col justify-center items-center">
                <img src={toggleIcon} alt="" className="mb-[36px] h-[22px]" />
                <div className="font-Inter font-medium text-[11px] text-[#545454]">
                  Toggle
                </div>
              </div>
              <div className="w-[2px] bg-[#F5F5F5]"></div>
              <div className="w-1/2 flex flex-col justify-center items-center">
                <img src={clipperIcon} alt="" className="mb-[36px] h-[40px]" />
                <div className="font-Inter font-medium text-[11px] text-[#545454]">
                  Call Endpoint
                </div>
              </div>
            </div>
            <div className="min-h-[195px] flex justify-between  border-b-[2px] border-[#F5F5F5]">
              <div className="w-1/2 flex flex-col justify-center items-center">
                <img src={outIcon} alt="" className="mb-[36px] h-[39px]" />
                <div className="font-Inter font-medium text-[11px] text-[#545454]">
                  Action
                </div>
              </div>
              <div className="w-[2px] bg-[#F5F5F5]"></div>
              <div className="w-1/2 flex flex-col justify-center items-center">
                <img src={paramsIcon} alt="" className="mb-[36px] h-[28px]" />
                <div className="font-Inter font-medium text-[11px] text-[#545454]">
                  Parameters
                </div>
              </div>
            </div>
          </div>
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

          <div className="grow">
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
          <div className="flex space-x-[7px] mb-4 mx-8">
            <div className="bg-[#156FF8] h-[46px] w-[160px] font-Inter font-bold text-[13px] text-white rounded-[11px] flex justify-center items-center cursor-pointer">TEST</div>
            <div className="bg-[#7ECA9C] h-[46px] w-[160px] font-Inter font-bold text-[13px] text-white rounded-[11px] flex justify-center items-center cursor-pointer">SAVE</div>
          </div>
        </div>
        {/* right Side End*/}
      </div>
    </div>
  );
}
