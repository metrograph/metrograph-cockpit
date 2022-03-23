import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/avatar/avatar.webp"

export default function Header(props) {
  const [dropDown, setDropDown] = useState(false)
  const navigate = useNavigate()
  function logout() {

    localStorage.removeItem("localState")
    return navigate("/")
  }
  return (
    <div className="bg-brand-header h-28  mb-14 font-title flex items-center  justify-between relative px-28">
      <div className="h-12 w-12"></div>
      <Link to="/">
        <img src={props.logo} alt="Metrograph Logo" className="w-44" />
      </Link>
      <div className="flex items-center">
        <div className="relative">
          <div className=" h-12 w-12 cursor-pointer mr-4" onClick={() => setDropDown(!dropDown)}>

            <div className=" flex w-full h-full items-end">
              <img alt="User Avatar" className=" flex bg-cock-purple w-full h-full" src={avatar} />
              <div className=" border-l-2 h-10  border-cock-purple" />
            </div>
            <div className="border-b-2 border-cock-purple"></div>
          </div>

          {dropDown && <div className=" right-4  absolute">
            <div className="flex items-end">

              <div className=" bg-brand-header mt-2 pt-4 pl-4 border-2 border-white"
                style={{ width: "180px", height: "200px" }}>
                <p className="text-md text-white font-Rajdhani font-regular mb-8">Signed in as {props.username}</p>

                <p className="text-md text-white font-Rajdhani font-semibold mb-2 hover:text-orange-500 cursor-pointer"
                  onClick={() => navigate("/accountsettings")} >Account Settings</p>
                <p className="text-md text-white font-Rajdhani font-semibold cursor-pointer hover:text-orange-500"
                  onClick={() => logout()}>Logout</p>

              </div>
              <div className=" border-l-4 h-48  border-cock-purple" />
            </div>

            <div className="border-b-4 border-cock-purple" />
          </div>}

        </div>

      </div>

    </div>
  );
}
