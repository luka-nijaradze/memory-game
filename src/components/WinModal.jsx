import React from "react";

const WinModal = ({ moves, onPlayAgain, onNewGame }) => {
  return (
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
            onClick={onPlayAgain}
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
  );
};

export default WinModal;
