'use client'
import { poppins } from '../fonts';
import styles from '../css/home.module.css'


export default function IntroText() {
    return (
            <div className={styles.textContainer}>
              <h1 className={styles.mainTitle}>
                Don't know WhatToEat?
              </h1>

              <p className={styles.subTitle}>
                Let us help you decide.
              </p>
            </div>
    );
}