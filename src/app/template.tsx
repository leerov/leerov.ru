'use client'

import KeyBinds from "@/service/keybinds"
import SparklesEffect from "@/ui/Sparks/SparklesEffect"
import { motion } from "framer-motion"

export default function Template({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <motion.div
                style={{ width: "100%" }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: 'easeInOut', duration: 0.75 }}

            >

                {children}
            </motion.div>

        </>

    )
}
