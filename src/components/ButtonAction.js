import runIcon from "../assets/run.svg";
import crossIcon from "../assets/cross.svg";

export default function ButtonAction(props) {
  if (props.actionType === "run") {
    return (
      <div className="flex items-center bg-cock-purple border-2 border-white h-12 w-28 space-x-2 px-6 hover:bg-purple-400 cursor-pointer">
        <img src={runIcon} height="10" width="10" />
        <p className="text-white text-md">RUN</p>
      </div>
    );
  }
  return (
    <div className="flex items-center bg-cock-red border-2 border-white h-12 w-28 space-x-2 px-6 hover:bg-red-400 cursor-pointer">
      <img src={crossIcon} height="10" width="10" />
      <p className="text-white text-md">STOP</p>
    </div>
  );
}
