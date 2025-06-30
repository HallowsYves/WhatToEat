'use client';
import { TypeAnimation } from 'react-type-animation';
import { poppins } from './fonts';
import { useState, Button } from 'react';
import Link from 'next/link';
import styles from './css/home.module.css';
import IntroText from './components/intro_text';
import AnimatedItem from './components/AnimatedItem';
export default function Home() {
  const [showIntro, setShowIntro] = useState(false);

  return (
    <>
      {/* Centered Container*/}
      <main className={styles.mainContainer}>
          {/* Load prompt, and Button AFTER typing animation */}
            <>
            <AnimatedItem>
              <IntroText styles={styles} />
            </AnimatedItem>
            <AnimatedItem>
              <div className={styles.buttonContainer}>
              <Link href="/find" className={`${poppins.className} ${styles.mealButton}`} >
                Get Started
              </Link>
            </div>
            </AnimatedItem>
            </>
      </main>
    </>
  );
}


// TODO: Remove Card, and maybe typing section(too distracting)