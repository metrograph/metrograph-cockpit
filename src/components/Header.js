import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/avatar/avatar.webp"

export default function Header(props) {
  const navigate = useNavigate()
  function logout() {

    localStorage.removeItem("localState")
    return navigate("/")
  }
  return (
    <div className="bg-brand-header h-28  mb-14 font-title flex items-center  justify-between relative">
      <div className="h-12 w-12 mr-20"></div>
      <Link to="/">
        <img src={props.logo} alt="Metrograph Logo" className="w-44" />
      </Link>
      <div className="flex items-center mr-28">
        <div className="h-12 w-12 cursor-pointer mr-4">

          <div className=" flex w-full h-full items-end">
            <img alt="User Avatar" className=" flex bg-white w-full h-full" src={avatar} />
            <div className=" border-l-2 h-10  border-cock-purple" />
          </div>
          <div className="border-b-2 border-cock-purple"></div>

        </div>
        <p className="text-md text-white font-Rajdhani font-medium cursor-pointer hover:text-orange-500" onClick={() => logout()}>
          Logout
        </p>
      </div>

    </div>
  );
}
