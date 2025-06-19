'use client'
import { TypeAnimation } from "react-type-animation";

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
        speed={20}
        style={{ fontSize: '10em', display: 'inline-block', color: 'white', fontWeight: "bold"  }}
        repeat={0}
      />
    </div>
  )
}