import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Header(props) {
  return (
    <div className="bg-brand-header h-28 grid place-items-center mb-14 font-title">
      <Link to="/">
        <img src={props.logo} className="w-44" />
      </Link>
    </div>
  );
}
