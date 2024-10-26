import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

interface DrinkSliderProps {
  boissons: string[];
  enAnimation: boolean;
  setEnAnimation: (animating: boolean) => void;
  active: boolean;
}

const DrinkSlider: React.FC<DrinkSliderProps> = ({
  boissons,
  enAnimation,
  setEnAnimation,
  active,
}) => {
  const [boissonSelectionnee, setBoissonSelectionnee] = useState<string>('');
  const [position, setPosition] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    setPosition(0);
    setResetKey((prev) => prev + 1);
  }, [boissons]);

  const lancerAnimation = () => {
    if (!active || enAnimation) return;

    setEnAnimation(true);
    const indexAleatoire = Math.floor(Math.random() * boissons.length);
    setBoissonSelectionnee(boissons[indexAleatoire]);

    const containerWidth = window.innerWidth;
    const itemWidth = 100000;
    const startOffset = containerWidth / 200 - itemWidth / 200;
    const initialPosition = startOffset;
    const duration = 3000; // Increased to 5 seconds
    const startTime = Date.now();
    const totalDistance =
      boissons.length * itemWidth * 50 + indexAleatoire * itemWidth; // Minimum 5 rotations

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;

      if (elapsed < duration) {
        const progress = elapsed / duration;

        // Mouvement linéaire sans accélération ou décélération
        setPosition(initialPosition - totalDistance * progress);
        requestAnimationFrame(animate);
      } else {
        setPosition(initialPosition - totalDistance);
        setEnAnimation(false);
        setTimeout(() => {
          setPosition(0);
          setResetKey((prev) => prev + 1);
        }, 1000);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="relative w-full max-w-2xl bg-purple-900/30 rounded-lg shadow-2xl backdrop-blur-sm">
      {/* Conteneur principal du slider */}
      <div className="h-48 overflow-hidden relative">
        {' '}
        {/* Increased height */}
        {/* Effet de brillance */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine"></div>
        {/* Ligne centrale avec effet de pulse */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-400 z-20">
          <div className="absolute inset-0 animate-pulse-fast bg-yellow-300/50 blur-sm"></div>
        </div>
        {/* Conteneur des boissons */}
        <div
          key={resetKey}
          className="absolute top-1/2 -translate-y-1/2 flex items-center gap-8 transition-transform duration-300"
          style={{
            transform: `translateX(${position}px)`,
            transition: enAnimation
              ? 'transform 5s cubic-bezier(0.4, 0, 0.2, 1)'
              : 'transform 0.3s ease',
          }}
        >
          {[...boissons, ...boissons, ...boissons].map((boisson, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-36 h-32 rounded-lg flex items-center justify-center p-4
                backdrop-blur-sm transform transition-all duration-300
                ${
                  enAnimation
                    ? 'animate-bounce-subtle'
                    : 'hover:scale-110 hover:rotate-2'
                }
                bg-gradient-to-br from-white/20 to-white/5`}
            >
              <span className="text-lg font-medium text-white text-center drop-shadow-lg">
                {boisson}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Résultat */}
      {boissonSelectionnee && !enAnimation && (
        <div className="text-center pt-8 pb-4 animate-fade-up">
          <p className="text-lg font-semibold mb-1">Votre boisson :</p>
          <p
            className="text-2xl font-bold bg-white text-purple-600 px-6 py-3 rounded-lg shadow-lg inline-block
            animate-bounce-subtle transform hover:scale-105 transition-transform"
          >
            {boissonSelectionnee}
          </p>
        </div>
      )}

      {/* Bouton de lancement déplacé en dessous */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={lancerAnimation}
          disabled={!active || enAnimation}
          className={`px-8 py-3 rounded-full font-semibold
            transition-all duration-300 flex items-center gap-2 shadow-lg
            ${
              active && !enAnimation
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
