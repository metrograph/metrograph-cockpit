import runIcon from "../assets/run.svg";
import crossIcon from "../assets/cross.svg";
import acceptIcon from "../assets/accept.svg";
export default function ConfirmationBox() {
  return (
    <div className="mt-12 bg-brand-header w-full h-28 flex flex-row border-r-4 justify-between  border-b-4 border-cock-purple items-center static">
      <p className="text-white texl-3xl  ml-8 font-Rajdhani font-semibold">
        CONFIRMATION
      </p>
      <div className="mr-8 flex flex-row justify-between space-x-4 items-center">
        <div className="flex items-center justify-center bg-brand-header border-2 border-white h-10 w-36 space-x-2 px-6 hover:bg-zinc-600 cursor-pointer">
          <img src={crossIcon} height="10" width="10" />
          <p className="text-white text-xs font-Rajdhani font-bold">CANCEL</p>
        </div>
        <div className="flex items-center justify-center bg-cock-green border-2 border-white h-10 w-42 space-x-2 px-6 hover:bg-green-400 cursor-pointer">
          <img src={acceptIcon} height="10" width="10" />
          <p className="text-white text-xs font-Rajdhani font-bold">
            CREATE JOB
          </p>
        </div>
      </div>
    </div>
  );
}
