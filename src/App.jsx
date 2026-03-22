import React, { useState, useEffect } from "react";
import Menu from "./components/Menu";
import GameBoard from "./components/GameBoard";

function App() {
  const [gameState, setGameState] = useState("menu");
  const [config, setConfig] = useState({ theme: "Numbers", size: "4x4" });
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("memory-dark") === "true";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("memory-dark", dark);
  }, [dark]);

  const startGame = (newConfig) => {
    setConfig(newConfig);
    setGameState("playing");
  };

  const goToMenu = () => {
    setGameState("menu");
  };

  return (
    <div className="font-sans antialiased min-h-screen">
      {gameState === "menu" ? (
        <Menu
          onStart={startGame}
          dark={dark}
          onToggleDark={() => setDark((d) => !d)}
        />
      ) : (
        <GameBoard
          config={config}
          onNewGame={goToMenu}
          dark={dark}
          onToggleDark={() => setDark((d) => !d)}
        />
      )}
    </div>
  );
}

export default App;
