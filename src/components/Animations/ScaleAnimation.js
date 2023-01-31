import { motion } from "framer-motion"
export default function ScaleAnimation({children}){
    return(
        <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration:0.2 }}
        >
            {children}
        </motion.div>
    )
}