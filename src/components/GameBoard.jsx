import React, { useState, useEffect, useCallback } from "react";
import {
  Sun,
  Moon,
  Anchor,
  Car,
  FlaskConical,
  Hand,
  Snowflake,
  Coins,
  Coffee,
  Dog,
  Cloud,
  Ghost,
  Gift,
  Heart,
  Zap,
  Music,
  Bike,
  Camera,
} from "lucide-react";
import Card from "./Card";
import WinModal from "./WinModal";

const icons = [
  <Anchor />,
  <Car />,
  <FlaskConical />,
  <Hand />,
  <Snowflake />,
  <Coins />,
  <Coffee />,
  <Dog />,
  <Cloud />,
  <Ghost />,
  <Gift />,
  <Heart />,
  <Zap />,
  <Music />,
  <Bike />,
  <Camera />,
  <Sun />,
  <Moon />,
];

const GameBoard = ({ config, onNewGame, dark, onToggleDark }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const { theme, size } = config;
  const is6x6 = size === "6x6";
  const pairsCount = is6x6 ? 18 : 8;

  const initializeGame = useCallback(() => {
    let values = [];
    if (theme === "Numbers") {
      values = Array.from({ length: pairsCount }, (_, i) => i + 1);
    } else {
      values = icons.slice(0, pairsCount);
    }

    const shuffled = [...values, ...values]
      .sort(() => Math.random() - 0.5)
      .map((v, i) => ({ id: i, value: v }));

    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTimer(0);
    setIsGameOver(false);
    setIsTimerRunning(false);
  }, [theme, pairsCount]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    let interval;
    if (isTimerRunning && !isGameOver) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isGameOver]);

  const handleCardClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id))
      return;

    if (!isTimerRunning) setIsTimerRunning(true);

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstId, secondId] = newFlipped;

      if (cards[firstId].value === cards[secondId].value) {
        setMatched((prev) => {
          const newMatched = [...prev, firstId, secondId];
          if (newMatched.length === cards.length) {
            setIsGameOver(true);
          }
          return newMatched;
        });
        setFlipped([]);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-navy-dark px-6 py-8 md:py-16 flex flex-col items-center transition-colors duration-300">
      {/* Header */}
      <div className="w-full max-w-[1110px] flex justify-between items-center mb-10 md:mb-20">
        <h1 className="text-navy dark:text-white text-2xl md:text-4xl font-bold">
          memory
        </h1>
        <div className="flex gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={onToggleDark}
            className="p-2 md:px-4 md:py-3 rounded-full bg-gray-lighter dark:bg-navy-light hover:bg-gray-hover dark:hover:bg-navy text-navy-light dark:text-white transition-all"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={initializeGame}
            className="bg-orange hover:bg-orange-hover text-white px-5 py-2 md:px-8 md:py-3 rounded-full font-bold md:text-xl transition-all"
          >
            Restart
          </button>
          <button
            onClick={onNewGame}
            className="bg-gray-lighter dark:bg-navy-light hover:bg-gray-hover dark:hover:bg-navy text-navy-light dark:text-white px-5 py-2 md:px-8 md:py-3 rounded-full font-bold md:text-xl transition-all"
          >
            New Game
          </button>
        </div>
      </div>

      {/* Grid */}
      <div
        className={`grid ${is6x6 ? "grid-cols-6 gap-2 md:gap-4" : "grid-cols-4 gap-3 md:gap-6"} mb-10 md:mb-24`}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            value={card.value}
            theme={theme}
            size={size}
            isFlipped={flipped.includes(card.id)}
            isMatched={matched.includes(card.id)}
            onClick={() => handleCardClick(card.id)}
            dark={dark}
          />
        ))}
      </div>

      {/* Stats */}
      <div className="w-full max-w-[1110px] flex justify-center gap-6 md:gap-8">
        <div className="bg-gray-lighter dark:bg-navy-light flex flex-col md:flex-row items-center md:justify-between px-6 py-4 md:py-6 md:px-8 rounded-xl flex-1 max-w-[255px] transition-colors duration-300">
          <span className="text-gray-text dark:text-gray-medium font-bold md:text-xl">
            Time
          </span>
          <span className="text-navy-light dark:text-white text-xl md:text-3xl font-bold">
            {formatTime(timer)}
          </span>
        </div>
        <div className="bg-gray-lighter dark:bg-navy-light flex flex-col md:flex-row items-center md:justify-between px-6 py-4 md:py-6 md:px-8 rounded-xl flex-1 max-w-[255px] transition-colors duration-300">
          <span className="text-gray-text dark:text-gray-medium font-bold md:text-xl">
            Moves
          </span>
          <span className="text-navy-light dark:text-white text-xl md:text-3xl font-bold">
            {moves}
          </span>
        </div>
      </div>

      {/* Win Modal */}
      {isGameOver && (
        <WinModal
          time={formatTime(timer)}
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
