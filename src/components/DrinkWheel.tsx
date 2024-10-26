import React, { useState, useEffect } from 'react';

interface DrinkWheelProps {
  drinks: string[];
  isSpinning: boolean;
  setIsSpinning: (spinning: boolean) => void;
  enabled: boolean;
}

const DrinkWheel: React.FC<DrinkWheelProps> = ({ drinks, isSpinning, setIsSpinning, enabled }) => {
  const [selectedDrink, setSelectedDrink] = useState<string>('');
  const [rotation, setRotation] = useState(0);

  const spinWheel = () => {
    if (!enabled || isSpinning) return;

    setIsSpinning(true);
    const extraSpins = 5; // Number of full rotations before stopping
    const randomDrinkIndex = Math.floor(Math.random() * drinks.length);
    const segmentAngle = 360 / drinks.length;
    const targetRotation = 360 * extraSpins + (randomDrinkIndex * segmentAngle);
    
    setRotation(targetRotation);
    setSelectedDrink(drinks[randomDrinkIndex]);

    setTimeout(() => {
      setIsSpinning(false);
    }, 5000);
  };

  return (
    <div className="relative w-80 h-80">
      <div 
        className={`absolute inset-0 rounded-full shadow-xl overflow-hidden
          ${enabled ? 'cursor-pointer hover:scale-105 transition-transform' : 'opacity-50 cursor-not-allowed'}
          ${isSpinning ? 'cursor-not-allowed' : ''}`}
        onClick={spinWheel}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? 'transform 5s cubic-bezier(0.4, 2, 0.2, 1)' : 'transform 0.3s ease',
        }}
      >
        {drinks.map((drink, index) => {
          const angle = (360 / drinks.length) * index;
          return (
            <div
              key={drink}
              className="absolute w-1/2 h-1/2 origin-bottom-right"
              style={{
                transform: `rotate(${angle}deg)`,
                background: index % 2 === 0 ? '#4C1D95' : '#5B21B6',
              }}
            >
              <div 
                className="absolute left-0 top-0 w-full h-full flex items-center justify-start pl-4 -rotate-45"
                style={{ transform: `rotate(-${angle}deg)` }}
              >
                <span className="text-sm font-medium text-white whitespace-nowrap overflow-hidden text-ellipsis">
                  {drink}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center pointer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-4 h-4">
        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[16px] border-white"></div>
      </div>

      {/* Selected drink display */}
      {selectedDrink && !isSpinning && (
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-center">
          <p className="text-lg font-semibold mb-1">Your drink is:</p>
          <p className="text-2xl font-bold bg-white text-purple-600 px-4 py-2 rounded-lg shadow-lg">
            {selectedDrink}
          </p>
        </div>
      )}

      {!enabled && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-lg font-semibold text-white text-center px-4">
            Select a drink type to start
          </p>
        </div>
      )}
    </div>
  );
};

export default DrinkWheel;