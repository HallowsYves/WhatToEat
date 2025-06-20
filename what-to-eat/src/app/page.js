'use client'
import { TypeAnimation } from "react-type-animation";
import { dela_gothic_one, outfit } from "./fonts";
import { useState } from "react";


export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  return (
    <>

    <div className="text-white text-center">
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
        className={`${dela_gothic_one.className}  text-[#E0E1DD] text-[10em] font-bold`}
        repeat={0}
        cursor={false}
      />
    </div>
    
    {showIntro && (
    <div className="Intro mt-6">
      <p className={`${outfit.className} text-center text-[#E0E1DD] text-[5vw] `}>
        Still don't know WhatToEat?
      </p>
    </div>
    )}
    </>
  )
}

// TODO: ADD Float from bottom up animation to main text, and add Get started button