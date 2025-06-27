'use client'
import { poppins } from '../fonts';


export default function IntroText({ styles}) {
    if (!styles) {
        return null
    }
    return (
            <div className={styles.intro}>
              <p className={`${poppins.className} ${styles.introText}`}>
                Still don't know WhatToEat?
              </p>
            </div>
    );
}