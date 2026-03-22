import React, { useState, useEffect } from "react";

const GameBoard = ({ config, onNewGame, dark, onToggleDark }) => {
  const { theme, size } = config;
  const gridSize = size === "4x4" ? 4 : 6;
  const totalCards = gridSize * gridSize;

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // Generate cards based on theme
  useEffect(() => {
    const generateCards = () => {
      let cardValues;
      if (theme === "Numbers") {
        cardValues = Array.from({ length: totalCards / 2 }, (_, i) => i + 1);
      } else {
        // For icons, use numbers as placeholders (1-18 for 4x4, 1-18 for 6x6)
        cardValues = Array.from({ length: totalCards / 2 }, (_, i) => i + 1);
      }

      const pairs = [...cardValues, ...cardValues];
      // Shuffle
      for (let i = pairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
      }

      return pairs.map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }));
    };

    setCards(generateCards());
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameWon(false);
  }, [theme, size]);

  const handleCardClick = (cardId) => {
    if (flippedCards.length === 2 || matchedCards.includes(cardId)) return;

    const newCards = cards.map((card) =>
      card.id === cardId ? { ...card, isFlipped: true } : card,
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlippedCards;
      const firstCard = cards.find((c) => c.id === first);
      const secondCard = cards.find((c) => c.id === second);

      if (firstCard.value === secondCard.value) {
        setMatchedCards((prev) => [...prev, first, second]);
        setFlippedCards([]);

        if (matchedCards.length + 2 === totalCards) {
          setGameWon(true);
        }
      } else {
        setTimeout(() => {
          setCards(
            cards.map((card) =>
              newFlippedCards.includes(card.id)
                ? { ...card, isFlipped: false }
                : card,
            ),
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    const generateCards = () => {
      let cardValues;
      if (theme === "Numbers") {
        cardValues = Array.from({ length: totalCards / 2 }, (_, i) => i + 1);
      } else {
        cardValues = Array.from({ length: totalCards / 2 }, (_, i) => i + 1);
      }

      const pairs = [...cardValues, ...cardValues];
      for (let i = pairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
      }

      return pairs.map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }));
    };

    setCards(generateCards());
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameWon(false);
  };

  return (
    <div className="min-h-screen bg-navy dark:bg-navy-dark p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <button
            onClick={onToggleDark}
            className="p-2 rounded-full bg-navy-light dark:bg-navy text-white hover:bg-gray-hover transition-all"
            aria-label="Toggle dark mode"
          >
            {dark ? <span>☀️</span> : <span>🌙</span>}
          </button>

          <div className="text-white text-xl md:text-2xl font-bold">
            Moves: {moves}
          </div>

          <button
            onClick={onNewGame}
            className="px-4 md:px-6 py-2 rounded-full bg-navy-light dark:bg-orange text-white font-bold text-sm md:text-lg hover:bg-gray-hover transition-all"
          >
            Menu
          </button>
        </div>

        <div
          className="grid gap-2 md:gap-4 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            maxWidth: gridSize === 4 ? "400px" : "600px",
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`
                aspect-square flex items-center justify-center
                rounded-lg md:rounded-xl cursor-pointer
                text-2xl md:text-4xl font-bold
                transition-all duration-300 transform
                ${
                  card.isFlipped || matchedCards.includes(card.id)
                    ? "bg-white dark:bg-navy-light rotate-y-180"
                    : "bg-navy-light dark:bg-navy hover:bg-gray-hover"
                }
                ${matchedCards.includes(card.id) ? "opacity-50" : ""}
              `}
            >
              {card.isFlipped || matchedCards.includes(card.id) ? (
                theme === "Numbers" ? (
                  card.value
                ) : (
                  <span>🎮</span>
                )
              ) : (
                <span className="text-white">?</span>
              )}
            </div>
          ))}
        </div>

        {gameWon && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-navy-light rounded-2xl p-8 text-center max-w-sm mx-4">
              <h2 className="text-3xl font-bold text-navy dark:text-white mb-4">
                Congratulations! 🎉
              </h2>
              <p className="text-gray-text dark:text-gray-medium text-lg mb-6">
                You won in {moves} moves!
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="px-6 py-3 bg-orange hover:bg-orange-hover text-white rounded-full font-bold text-lg transition-all"
                >
                  Play Again
                </button>
                <button
                  onClick={onNewGame}
                  className="px-6 py-3 bg-navy-light dark:bg-navy hover:bg-gray-hover text-white rounded-full font-bold text-lg transition-all"
                >
                  Menu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
