import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default function Header(props) {
  return (
    <Link to="/">
      <div className="bg-brand-header h-28 grid place-items-center mb-14 font-title">
        <img src={props.logo} height="71" width="134" />
      </div>
    </Link>
  );
}
