import React, { useState } from 'react';

const Wheel = ({ items = [], size = 300, radius = 140 }) => {
  const center = size / 2;
  const anglePerSlice = (2 * Math.PI) / items.length;


  const [rotation, setRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const getCoordinates = (angle, radius) => [
    center + radius * Math.cos(angle),
    center + radius * Math.sin(angle),
  ];

  const spin = () => {
    const randomTurns = Math.floor(Math.random() * 5) + 5; // Full spins
    const randomAngle = Math.random() * 360; 
    const totalRotation = randomTurns * 360 + randomAngle; // Big spin with randomness
  
    setRotation(prev => prev + totalRotation);
    setSelectedIndex(null); // Reset selected item while spinning
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width={size} height={size}>
        {/* group segments to rotate them */}
        <g
          transform={`rotate(${rotation}, ${center}, ${center})`}
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: `${center}px ${center}px`,
            transition: 'transform 4s cubic-bezier(0.33, 1, 0.68, 1)',
          }}
          onTransitionEnd={() => {
            const normalizedRotation = rotation % 360;
            const anglePerSegment = 360 / items.length;

            const correctedAngle = (360 - normalizedRotation + anglePerSegment / 2) % 360;
            const index = Math.floor(correctedAngle / anglePerSegment);

            setSelectedIndex(index);
          }}
        >
          {items.map((item, i) => {
            const startAngle = i * anglePerSlice;
            const endAngle = startAngle + anglePerSlice;
            const midAngle = (startAngle + endAngle) / 2;

            const [x1, y1] = getCoordinates(startAngle, radius);
            const [x2, y2] = getCoordinates(endAngle, radius);
            const largeArcFlag = anglePerSlice > Math.PI ? 1 : 0;

            const pathData = `
              M ${center} ${center}
              L ${x1} ${y1}
              A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
              Z
            `;

            const fillColor = `hsl(${(360 / items.length) * i}, 80%, 60%)`;
            const labelRadius = radius * 0.6;
            const [labelX, labelY] = getCoordinates(midAngle, labelRadius);

            return (
              <g key={i}>
                <path d={pathData} fill={fillColor} stroke="white" strokeWidth={2} />
                <text
                  x={labelX}
                  y={labelY}
                  fill="#fff"
                  fontSize="14"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${(midAngle * 180) / Math.PI}, ${labelX}, ${labelY})`}
                >
                  {item}
                </text>
              </g>
            );
          })}
        </g>

        {/* Pointer at top */}
        <polygon
          points={`
            ${center - 10},${center - radius - 10}
            ${center + 10},${center - radius - 10}
            ${center},${center - radius + 10}
          `}
          fill="black"
          stroke="white"
          strokeWidth={2}
        />
      </svg>

      <button onClick={spin} style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '1rem' }}>
         Spin the Wheel!
      </button>
    </div>
  );
};

export default Wheel;