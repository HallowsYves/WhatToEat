'use client'
import { TypeAnimation } from "react-type-animation";
import { dela_gothic_one, inter } from "./fonts";
import { useState } from "react";

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  return (
    <>

    <div className="text-white text-center">
      <TypeAnimation
        sequence={[
          "PIZZA",
          1000,
          "SUSHI",
          1000,
          "TACOS",
          1000,
          "RAMEN",
          1000,
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
      <p className={`${inter.className} text-center text-[#E0E1DD] text-[5vw] `}>
        Still don't know WhatToEat?
      </p>
    </div>
    )}
    </>
  )
}