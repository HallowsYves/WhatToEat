'use client';
import { TypeAnimation } from 'react-type-animation';
import { poppins } from './fonts';
import { useState, Button } from 'react';
import Link from 'next/link';
import styles from './css/home.module.css';
import IntroText from './components/intro_text';
export default function Home() {
  const [showIntro, setShowIntro] = useState(false);

  return (
    <>
      {/* Centered Container*/}
      <main className={styles.mainContainer}>
        {/* Round card Container */}
        <div className={styles.card}>
          {/* Typing Text Module*/}
          <div className={styles.textContainer}>
            <TypeAnimation
              sequence={[
                'PIZZA',
                500,
                'SUSHI',
                500,
                'TACOS',
                500,
                'RAMEN',
                500,
                '?????',
                500,
                () => setShowIntro(true)
              ]}
              wrapper="span"
              speed={50}
              className={poppins.className}
              style={{
                fontSize: 'clamp(3rem, 10vw, 5rem)',
                fontWeight: 'bold',
                color: '#E0E1DD'
              }}
              repeat={0}
              cursor={false}
            />
          </div>
          
          {/* Load prompt, and Button AFTER typing animation */}
          {showIntro && (<IntroText styles={styles}/>)}
          
          {showIntro && (
            <div className={styles.buttonContainer}>
              <Link href="/find" className={`${poppins.className} ${styles.mealButton}`} >
                Find My Meal!
              </Link>
            </div>
          )}

        </div>
      </main>
    </>
  );
}

// TODO: Add Float from bottom up animation to main text, and add Get started button
