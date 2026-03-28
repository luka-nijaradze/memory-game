import React from "react";

const WinModal = ({ time, moves, onPlayAgain, onNewGame, dark }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`rounded-2xl p-8 text-center max-w-sm mx-4 transition-colors ${
        dark ? "bg-navy-light" : "bg-white"
      }`}>
        <h2 className={`text-3xl font-bold mb-4 ${
          dark ? "text-white" : "text-navy"
        }`}>
          Congratulations! 🎉
        </h2>
        <div className="flex justify-center gap-8 mb-6">
          <div>
            <p className={`text-sm font-bold uppercase tracking-wider ${
              dark ? "text-gray-medium" : "text-gray-text"
            }`}>
              Time
            </p>
            <p className={`text-2xl font-bold ${dark ? "text-white" : "text-navy"}`}>
              {time}
            </p>
          </div>
          <div>
            <p className={`text-sm font-bold uppercase tracking-wider ${
              dark ? "text-gray-medium" : "text-gray-text"
            }`}>
              Moves
            </p>
            <p className={`text-2xl font-bold ${dark ? "text-white" : "text-navy"}`}>
              {moves}
            </p>
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onPlayAgain}
            className="px-6 py-3 bg-orange hover:bg-orange-hover text-white rounded-full font-bold text-lg transition-all"
          >
            Play Again
          </button>
          <button
            onClick={onNewGame}
            className={`px-6 py-3 rounded-full font-bold text-lg transition-all ${
              dark
                ? "bg-navy hover:bg-navy-dark text-white"
                : "bg-gray-medium hover:bg-gray-hover text-white"
            }`}
          >
            Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinModal;
