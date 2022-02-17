import ButtonAction from "./ButtonAction";
import ButtonStatus from "./ButtonStatus";
export default function JobRow(props) {
  return (
    <div>
      <div className="flex flex-row">
        <div className="w-full flex  bg-brand-header border-2 border-white h-24 px-4 justify-between">
          {/*  element title and info start */}
          <div className="w-1/7 flex flex-col place-content-center flex-wrap">
            <p className="text-white">{props.name}</p>
            <p className="text-gray-400 text-sm">{props.info}</p>
          </div>

          {/*  element title and info end */}

          {/*  element config start */}
          <div className="w-2/7 flex  place-items-center space-x-2">
            <div className="bg-brand-dark-button h-12 w-14 grid place-content-center">
              <img className="" src={props.technologieIcon} />
            </div>
            <div className="bg-brand-dark-button h-12 w-44 grid place-content-center">
              <p className=" text-white  text-md">{props.serverConfig}</p>
            </div>
            <div className="bg-brand-dark-button h-12 w-20 grid place-content-center">
              <p className=" text-white text-md">{props.serverLocation}</p>
            </div>
          </div>
          {/*  element config end */}
          {/*  element status start */}
          <div className="w-1/7 flex place-items-center">
            <ButtonStatus status={props.status} />
          </div>
          {/*  element status end */}

          {/*  element config start */}
          <div className="w-2/7 flex  place-items-center space-x-2">
            {/*   button more start */}
            <div className="bg-brand-dark-button h-12  border-2 border-white grid place-content-center hover:bg-zinc-500 cursor-pointer">
              <img className="px-4" src={props.moreIcon} />
            </div>
            {/*   button more end */}
            {/*  button SCHEDULE start  */}
            <div className="flex items-center bg-brand-dark-button  border-2 border-white h-12 space-x-2 px-2 hover:bg-zinc-500 cursor-pointer">
              <img src={props.timeIcon} height="16" width="16" />
              <p className="text-white text-md">SCHEDULE</p>
            </div>
            {/*  button SCHEDULE end  */}
            {/*  button Rund start */}
            <ButtonAction actionType={props.actionType} />
            {/*  button Run end */}
          </div>
          {/*  element config end */}
        </div>

        <div className="border-r-4 border-purple-600"></div>
      </div>

      <div className="border-t-4 border-purple-600"></div>
    </div>
  );
}
