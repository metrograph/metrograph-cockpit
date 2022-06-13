
export default function MyPasswordInput(props){
    return (
        <div className="w-full">
          {props.title &&
          <div className="text-white font-IBM-Plex-Sans font-bold text-[11px] mb-[12px]">
            {props.title}
          </div>
          }
          <div className="relative flex items-center">
            <input
              type="password"
              className="w-full h-[46px] bg-[#1A1A1A] rounded-[14px] text-[15px] font-Inter font-medium pl-[20px] pr-[40px] text-white"
              placeholder={props.placeholder}
              onChange={(e)=>props.setValue(e.target.value)}
              value={props.value}
            />
            <div className="bg-[#323232] w-[12px] h-[12px] rounded-full absolute  right-[16px]" />
          </div>
        </div>
      )
  }