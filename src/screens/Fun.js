import { useState } from "react"
import "./fun.css"
export default function Fun() {
    const [toogle, setToogle] = useState(true)
    function setAction() {
        if (toogle) {
            const element = document.querySelector('.circleTochange')
            element.style.setProperty("transform", "translateX(-300px)")
            element.style.setProperty("--x", "600px")
            element.style.setProperty("--y", "600px")
            setToogle(false)
            // console.log(getComputedStyle(element).getPropertyValue("height"))
        }
        if (!toogle) {
            const element = document.querySelector('.circleTochange')

            element.style.setProperty("transform", "translateX(0)")
            element.style.setProperty("--x", "60px")
            element.style.setProperty("--y", "60px")
            setToogle(true)
        }




    }
    return (
        <div className="myBackround justify-center items-center space-x-12 flex overflow-hidden" >
            <div

                onClick={() => setAction()}
                className="absolute text-white top-12 text-xl font-Rajdhani font-semibold right-20 cursor-pointer hover:text-orange-400">ACTION</div>
            <div

                className="circleTochange circle cursor-pointer" />
            <div className="rectangle cursor-pointer" />



        </div>
    )
}