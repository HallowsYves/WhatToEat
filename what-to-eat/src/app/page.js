'use client'
import { TypeAnimation } from "react-type-animation";
import { dela_gothic_one } from "./fonts";

export default function Home() {
  return (

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
          "?????"
        ]}
        wrapper="span"
        speed={30}
        className={`${dela_gothic_one.className} text-[#E0E1DD] text-[10em] font-bold`}
        repeat={0}
      />
    </div>
  )
}