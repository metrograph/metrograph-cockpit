import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default function ButtonCreate(props) {
  return (
    <Link to="/CreateJob">
      <div className="bg-brand-dark-button h-12  w-40 border-2 border-white grid place-content-center cursor-pointer hover:bg-zinc-500" style={{ transitionDuration: "600ms", transitionProperty: "background" }}>
        <p className=" text-white px-4 text-md">{props.text}</p>
      </div>
    </Link>
  );
}
