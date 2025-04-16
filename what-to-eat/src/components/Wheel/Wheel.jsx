import { use, useRef, useState } from "react";
import './Wheel.css';

export default function Wheel({ segments }) {
    const wheelReference = useRef(null);
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [winner, setWinner] = useState(null);

    const generateConicGradient = (segments) => {
        const step = 100 / segments.length;
        return segments
          .map((_, i) => {
            const hue = (360 * i) / segments.length;
            const start = i * step;
            const end = (i + 1) * step;
            return `hsl(${hue}, 80%, 60%) ${start}% ${end}%`;
          })
          .join(', ');
      };
      

    const spin = () => {
        if (isSpinning) return;
      
        const randomIndex = Math.floor(Math.random() * segments.length);
        const degreesPerSegment = 360 / segments.length;
        const spins = 5; // full rotations
        const totalRotation = rotation + (spins * 360) + (360 - randomIndex * degreesPerSegment);
      
        setRotation(totalRotation);
        setIsSpinning(true);
        setWinner(null);
      
        setTimeout(() => {
          setIsSpinning(false);
          setWinner(segments[randomIndex]);
        }, 4000);
    };

    return (
        <div className="wheel-wrapper">
          <div
            className="wheel"
            ref={wheelReference}
            style={{
              transform: `rotate(${rotation}deg)`,
              background: `conic-gradient(${generateConicGradient(segments)})`,
            }}
          >
            {segments.map((label, i) => {
              const angle = (360 / segments.length) * i;
              return (
                <div
                  key={i}
                  className="wheel-label"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-120px) rotate(${-angle}deg)`
                  }}
                >
                  {label}
                </div>
              );
            })}
          </div>
      
          <div className="pointer"></div>
      
          <button onClick={spin} disabled={isSpinning}>Spin</button>
      
          {winner && <p>🎉 Winner: {winner}</p>}
        </div>
      );
    }