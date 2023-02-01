// React imports
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom";

function AuthCheck({ children }){
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=>{
        window.scrollTo(0, 0);
        dispatch({type:"active_element/SET", payload:{}})
        dispatch({type:"code_editor/SET", payload:{selectedFile:{path :"", name :"",content :null},openedFiles:[]}})
        dispatch({type:"setFileExplorer", payload:{}})
        function loadLocalStorage() {
        const localstorage = localStorage.getItem("METROGRAPH_STORAGE");
        const data = JSON.parse(localstorage);
        if (data)
			{
                dispatch({ type: "user/SET", payload: data })
				setIsAuthenticated(true)
			}
        else return navigate("/login")
      }
    loadLocalStorage();
   
},[navigate])
if (isAuthenticated) {
    return <>{children}</>
}
else return <></>
};

export default AuthCheck;