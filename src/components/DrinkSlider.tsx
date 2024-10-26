import React, { useState, useEffect } from 'react'; 
import { Play } from 'lucide-react';

interface DrinkSliderProps {
  boissons: string[];
  enAnimation: boolean;
  setEnAnimation: (animating: boolean) => void;
  active: boolean;
}

const DrinkSlider: React.FC<DrinkSliderProps> = ({ boissons, enAnimation, setEnAnimation, active }) => {
  const [boissonSelectionnee, setBoissonSelectionnee] = useState<string>('');
  const [position, setPosition] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setPosition(0);
    setResetKey(prev => prev + 1);
  }, [boissons]);

  const lancerAnimation = () => {
    if (!active || enAnimation) return;

    setPosition(0);
    setResetKey(prev => prev + 1);
    setEnAnimation(true);
    setShowPopup(false);

    const indexAleatoire = Math.floor(Math.random() * boissons.length);
    setBoissonSelectionnee(boissons[indexAleatoire]);

    const containerWidth = window.innerWidth;
    const itemWidth = 300;
    const startOffset = (containerWidth / 0.2) - (itemWidth / 0.2);
    const initialPosition = startOffset;
    const duration = 3500;
    const startTime = Date.now();

    const totalDistance = (boissons.length * itemWidth * 2) + (indexAleatoire * itemWidth);

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;

      if (elapsed < duration) {
        const progress = elapsed / duration;
        setPosition(initialPosition - (totalDistance * progress * 0.45));
        requestAnimationFrame(animate);
      } else {
        const finalPosition = startOffset - (indexAleatoire * itemWidth);
        setPosition(finalPosition);
        setEnAnimation(false);
        setShowPopup(true);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="relative w-full max-w-2xl bg-purple-900/30 rounded-lg shadow-2xl backdrop-blur-sm">
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white text-purple-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Votre boisson :</h2>
            <p className="text-xl font-semibold">{boissonSelectionnee}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {!showPopup && (
        <div className="h-48 flex items-center justify-center overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-400 z-20">
            <div className="absolute inset-0 animate-pulse-fast bg-yellow-300/50 blur-sm"></div>
          </div>

          <div 
            key={resetKey}
            className="flex items-center gap-8 transition-transform duration-300"
            style={{ 
              transform: `translateX(${position}px)`,
              transition: enAnimation ? 'none' : 'transform 0.3s ease'
            }}
          >
            {[...boissons, ...boissons, ...boissons].map((boisson, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-36 h-32 rounded-lg flex items-center justify-center p-4
                  backdrop-blur-sm transform transition-all duration-300
                  ${enAnimation ? '' : 'hover:scale-110 hover:rotate-2'}
                  bg-gradient-to-br from-white/20 to-white/5`}
              >
                <span className="text-lg font-medium text-white text-center drop-shadow-lg">
                  {boisson}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={lancerAnimation}
          disabled={!active || enAnimation}
          className={`px-8 py-3 rounded-full font-semibold
            transition-all duration-300 flex items-center gap-2 shadow-lg
            ${active && !enAnimation
              ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 hover:scale-105 hover:shadow-xl cursor-pointer'
              : 'bg-gray-500 cursor-not-allowed opacity-50'
            }`}
        >
          <Play className="h-5 w-5" />
          Lancer
        </button>
      </div>

      {!active && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <p className="text-lg font-semibold text-white text-center px-4 animate-pulse">
            Sélectionnez un type de boisson pour commencer
          </p>
        </div>
      )}
    </div>
  );
};

export default DrinkSlider;
