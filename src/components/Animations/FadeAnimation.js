import { motion } from "framer-motion"
export default function FadeAnimation({children}){
    return(
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:0.6}}
        >
            {children}
        </motion.div>
    )
}