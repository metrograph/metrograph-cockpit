import { useDispatch, useSelector } from "react-redux";
export default function TextInput(props) {
  const mystate = useSelector((state) => state)
  console.log(mystate);
  return (
    <div className="">
      <div className="flex flex-row items-center space-x-2">
        <div className="w-2 border-t-2 border-brand-header" />
        <p className="text-brand-dark-button text-xs flex-shrink-0 font-Inter font-bold">
          {props.title}
        </p>
        <div className="w-full border-t-2 border-brand-header" />
      </div>
      <div className="border-2 border-t-0 border-brand-header -mt-2">
        <input
          className=" bg-transparent focus:outline-none h-8 text-white px-4 my-2  w-full text-lg font-Inter font-medium"
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
}
