import React from 'react';

// Added 'textColor' prop. Default is the Senegal Green (#15803d).
// You can pass textColor="black" or textColor="#ffffff" when using it.
export default function AsdlLogo({ 
  className = "w-32", 
  textColor = "#15803d" 
}: { 
  className?: string;
  textColor?: string;
}) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 200 60" 
      className={className}
      aria-label="ASDL Logo"
    >
      <defs>
        {/* Radiant Sun Gradient */}
        <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#fef08a" /> {/* Yellow-200 center */}
          <stop offset="70%" stopColor="#eab308" /> {/* Yellow-500 body */}
          <stop offset="100%" stopColor="#ca8a04" /> {/* Yellow-600 edge */}
        </radialGradient>
      </defs>

      {/* --- THE SUN ICON --- */}
      <g transform="translate(30, 30)">
        <g stroke="#eab308" strokeWidth="2" strokeLinecap="round">
          {/* Sun Rays */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
            <line 
              key={angle} 
              x1="0" y1="-22" 
              x2="0" y2="-28" 
              transform={`rotate(${angle})`} 
            />
          ))}
        </g>
        
        {/* Sun Body */}
        <circle r="18" fill="url(#sunGradient)" />
        
        {/* Optional Glossy Highlight */}
        <ellipse cx="-6" cy="-6" rx="6" ry="4" fill="white" fillOpacity="0.3" transform="rotate(-45)" />
      </g>
      
      {/* --- THE TEXT --- */}
      {/* Uses the dynamic textColor prop */}
      <text 
        x="65" 
        y="40" 
        fontFamily="sans-serif" 
        fontWeight="800" 
        fontSize="34" 
        fill={textColor}
        letterSpacing="-1"
      >
        ASDL
      </text>
    </svg>
  );
}