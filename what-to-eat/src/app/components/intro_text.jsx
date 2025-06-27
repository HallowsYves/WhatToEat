'use client'
import {motion} from "motion/react";
import { poppins } from '../fonts';


export default function IntroText({ styles}) {
    if (!styles) {
        return null
    }

    return (
        <motion.div
            className={styles.intro}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.6,
                scale: { type: "tween", visualDuration: 0.4, easeIn: 0.1},
            }}
        >
              <p className={`${poppins.className} ${styles.introText}`}>
                Still don't know WhatToEat?
              </p>
        </motion.div>
    );
}