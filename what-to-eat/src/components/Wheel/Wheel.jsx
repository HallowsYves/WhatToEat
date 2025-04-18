import React from 'react';

const Wheel = ({ items = [], size = 300, radius = 140 }) => {
  const center = size / 2;
  const anglePerSlice = (2 * Math.PI) / items.length;

  const getCoordinates = (angle, radius) => {
    return [
      center + radius * Math.cos(angle),
      center + radius * Math.sin(angle),
    ];
  };

  return (
    <svg width={size} height={size}>
      {items.map((item, i) => {
        const startAngle = i * anglePerSlice;
        const endAngle = startAngle + anglePerSlice;
        const midAngle = (startAngle + endAngle) / 2;

        // Slice Drawing
        const [x1, y1] = getCoordinates(startAngle, radius);
        const [x2, y2] = getCoordinates(endAngle, radius);
        const largeArcFlag = anglePerSlice > Math.PI ? 1 : 0;

        // SVG
        const pathData = `
          M ${center} ${center}
          L ${x1} ${y1}
          A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
          Z
        `;

        const fillColor = `hsl(${(360 / items.length) * i}, 80%, 60%)`;

        // Label position, place them at the midpoint of each slice
        const labelRadius = radius * 0.6;
        const [labelX, labelY] = getCoordinates(midAngle, labelRadius);

        return (
          <g key={i}>
            <path d={pathData} fill={fillColor} stroke="white" strokeWidth="2" />
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

  {/* Pointer @ Top */}
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
  );
};

export default Wheel;