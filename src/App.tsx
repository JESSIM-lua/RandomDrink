import React, { useState } from 'react';
import { Beer, Coffee, Sparkles } from 'lucide-react';
import DrinkSlider from './components/DrinkSlider';

const BOISSONS_ALCOOLISEES = [
  "Mojito",
  "Margarita",
  "Moscow Mule",
  "Old Fashioned",
  "Piña Colada",
  "Gin Tonic",
  "Cosmopolitan",
  "Whisky Sour"
];

const BOISSONS_SANS_ALCOOL = [
  "Mojito Virgin",
  "Sirop de Grenadine",
  "Smoothie Fraise",
  "Thé Glacé",
  "Citronnade",
  "Jus d'Orange",
  "Virgin Colada",
  "Eau Pétillante"
];

function App() {
  const [typeSelectionne, setTypeSelectionne] = useState<'alcool' | 'sans-alcool' | null>(null);
  const [enAnimation, setEnAnimation] = useState(false);

  const selectionnerType = (type: 'alcool' | 'sans-alcool') => {
    if (!enAnimation) {
      setTypeSelectionne(type);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 animate-pulse" />
            Joyeux Anniversaire Tiphaine
            <Sparkles className="h-8 w-8 animate-pulse" />
          </h1>
          <p className="text-xl text-purple-200 animate-bounce-slow">
            Laissez le hasard choisir votre boisson !
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => selectionnerType('alcool')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold transition-all transform hover:scale-105 hover:rotate-2
              ${typeSelectionne === 'alcool' 
                ? 'bg-purple-500 shadow-lg animate-pulse' 
                : 'bg-purple-700 hover:bg-purple-600'}`}
          >
            <Beer className="h-5 w-5 animate-bounce" />
            Avec Alcool
          </button>
          <button
            onClick={() => selectionnerType('sans-alcool')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold transition-all transform hover:scale-105 hover:-rotate-2
              ${typeSelectionne === 'sans-alcool' 
                ? 'bg-blue-500 shadow-lg animate-pulse' 
                : 'bg-blue-700 hover:bg-blue-600'}`}
          >
            <Coffee className="h-5 w-5 animate-bounce" />
            Sans Alcool
          </button>
        </div>

        <div className="flex justify-center">
          <DrinkSlider
            boissons={typeSelectionne === 'alcool' ? BOISSONS_ALCOOLISEES : BOISSONS_SANS_ALCOOL}
            enAnimation={enAnimation}
            setEnAnimation={setEnAnimation}
            active={typeSelectionne !== null}
          />
        </div>
      </div>
    </div>
  );
}

export default App;