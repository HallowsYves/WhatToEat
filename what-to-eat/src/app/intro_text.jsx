'use client'
import {motion} from "motion/react";
import { dela_gothic_one} from "./fonts";


export default function IntroText() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.6,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            className="Intro mt-6"
        >

            <p className={`${dela_gothic_one.className} text-center text-[#E0E1DD] text-[5vw] `}>
             Still don't know WhatToEat?
            </p>
        </motion.div>
    );
}