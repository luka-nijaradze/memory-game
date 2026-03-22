import React, { useState, useEffect } from "react";
import Card from "./Card";
import WinModal from "./WinModal";
import { Sun, Moon } from "lucide-react";

const GameBoard = ({ config, onNewGame, dark, onToggleDark }) => {
  const { theme, size } = config;
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const is6x6 = size === "6x6";
  const numPairs = is6x6 ? 18 : 8;
  const icons = [
    "🎮",
    "🚀",
    "⭐",
    "🌙",
    "🔥",
    "💎",
    "🎯",
    "🏆",
    "🎪",
    "🎨",
    "🎭",
    "🎪",
    "🎯",
    "🎲",
    "🎸",
    "🎺",
    "🎻",
    "🎹",
  ];
  const numbers = Array.from({ length: 18 }, (_, i) => i + 1);

  useEffect(() => {
    initializeGame();
  }, [theme, size]);

  useEffect(() => {
    let interval;
    if (isPlaying && !gameWon) {
      interval = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, gameWon]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first] === cards[second]) {
        setMatchedCards((prev) => [...prev, first, second]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
      setMoves((m) => m + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (
      matchedCards.length > 0 &&
      matchedCards.length === cards.length &&
      cards.length > 0
    ) {
      setGameWon(true);
      setIsPlaying(false);
    }
  }, [matchedCards, cards]);

  const initializeGame = () => {
    const values =
      theme === "Icons" ? icons.slice(0, numPairs) : numbers.slice(0, numPairs);
    const shuffled = [...values, ...values].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
    setGameWon(false);
    setIsPlaying(true);
  };

  const handleCardClick = (index) => {
    if (
      flippedCards.length < 2 &&
      !flippedCards.includes(index) &&
      !matchedCards.includes(index)
    ) {
      setFlippedCards((prev) => [...prev, index]);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const gridCols = is6x6 ? "grid-cols-6" : "grid-cols-4";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${dark ? "bg-navy-dark" : "bg-gray-light"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6 md:px-14 md:py-8">
        <button
          onClick={onNewGame}
          className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-base md:text-xl font-bold transition-all ${
            dark
              ? "bg-navy hover:bg-navy-dark text-white"
              : "bg-gray-medium hover:bg-gray-hover text-navy-light"
          }`}
        >
          New Game
        </button>

        <div className="flex items-center gap-6 md:gap-10">
          <div className={`text-center ${dark ? "text-white" : "text-navy"}`}>
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-text">
              Time
            </span>
            <p className="text-xl md:text-3xl font-bold">{formatTime(time)}</p>
          </div>
          <div className={`text-center ${dark ? "text-white" : "text-navy"}`}>
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-text">
              Moves
            </span>
            <p className="text-xl md:text-3xl font-bold">{moves}</p>
          </div>
        </div>

        <button
          onClick={onToggleDark}
          className={`p-2 md:p-3 rounded-full transition-all ${
            dark
              ? "bg-navy hover:bg-navy-dark text-white"
              : "bg-gray-medium hover:bg-gray-hover text-navy-light"
          }`}
          aria-label="Toggle dark mode"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Game Board */}
      <div className="flex items-center justify-center px-4 md:px-6 pb-8">
        <div className={`grid ${gridCols} gap-2 md:gap-4`}>
          {cards.map((value, index) => (
            <Card
              key={index}
              value={theme === "Icons" ? value : value}
              isFlipped={
                flippedCards.includes(index) || matchedCards.includes(index)
              }
              isMatched={matchedCards.includes(index)}
              onClick={() => handleCardClick(index)}
              size={size}
              theme={theme}
              dark={dark}
            />
          ))}
        </div>
      </div>

      {/* Win Modal */}
      {gameWon && (
        <WinModal
          time={formatTime(time)}
          moves={moves}
          onRestart={initializeGame}
          onNewGame={onNewGame}
          dark={dark}
        />
      )}
    </div>
  );
};

export default GameBoard;
