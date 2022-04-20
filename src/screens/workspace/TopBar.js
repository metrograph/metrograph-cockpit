import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar/avatar-2.png";
import arrowdown from "../../assets/icons/arrow-down.svg";
import cloud from "../../assets/icons/cloud.svg";

export default function TopBar() {
  return (
    <div className="bg-cock-purple-dark h-[120px] w-full flex items-center">
      <div className="w-[384px]  flex  justify-between items-center">
        <div className="h-[20px] w-[1px] " />
        <img src={logo} className="w-[167px] mx-2" />
        <div className="h-[42px] w-[1px] bg-white opacity-20" />
      </div>
      <div className="flex grow items-center px-12 space-x-4">
        <div className="flex items-center justify-between bg-cock-dark-400 w-[327px] h-[46px] rounded-lg px-4 cursor-pointer">
          <div className="text-white font-Inter font-medium">
            Deploy Docker Workflow
          </div>
          <img src={arrowdown} className="w-[13px] h-auto" />
        </div>
        <div className="bg-cock-blue w-[87px] h-[46px] grid place-items-center rounded-lg cursor-pointer">
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
        <div className="py-2 px-6 rounded-md font-Inter font-bold text-white text-[13px] border-[1px] border-cock-border-light cursor-pointer">
          DOCS
        </div>
        <div className="h-[42px] w-[1px] bg-white opacity-20" />
        <div className="flex items-center space-x-4">
          <img src={avatar} className="h-[62px] w-[62px] rounded-full" />
          <div className="flex space-x-2 cursor-pointer">
            <div className="text-white font-Inter font-semibold text-[16px]">
              Hamza
            </div>
            <img src={arrowdown} />
          </div>
        </div>
      </div>
    </div>
  );
}
