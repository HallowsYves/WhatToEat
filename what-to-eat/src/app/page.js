'use client'
import { TypeAnimation } from "react-type-animation";
import { dela_gothic_one, poppins } from "./fonts";
import { useState } from "react";
import styles from "./css/home.css"
import  IntroText from "./intro_text"
export default function Home() {

  const [showIntro, setShowIntro] = useState(false);


  return (
    <>

    {/* Centered Container*/}
    <main className="mainContainer">
    
      {/* Round card Container */}
      <div className="card">
        {/* Typing Text Module*/}
        <div className="textContainer">
          <TypeAnimation
            sequence={[
              "PIZZA",
              500,
              "SUSHI",
              500,
              "TACOS",
              500,
              "RAMEN",
              500,
              "?????",
              500,
              () => setShowIntro(true)
            ]}
            wrapper="span"
            speed={50}
            className={poppins.className}
            style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', fontWeight: 'bold', color: '#E0E1DD' }}
            repeat={0}
            cursor={false}
            />
        </div>

        {showIntro && (
          <div className="intro">
              <p className={`${poppins.className} ${"introText"}`}>
                Still don't know WhatToEat?
              </p>
            </div>
        )}
      </div>
    </main>
    </>
  )
}

// TODO: Add Float from bottom up animation to main text, and add Get started button