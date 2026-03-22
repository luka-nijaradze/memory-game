
import React from 'react';

const WinModal = ({ time, moves, onRestart, onNewGame, dark }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
      <div className={`w-full max-w-[654px] rounded-2xl p-8 md:p-14 flex flex-col items-center transition-colors duration-300 ${
        dark ? 'bg-navy-light' : 'bg-white'
      }`}>
        <h2 className={`text-2xl md:text-5xl font-bold mb-4 ${dark ? 'text-white' : 'text-navy'}`}>You did it!</h2>
        <p className="text-gray-text font-bold md:text-xl mb-6 md:mb-10 text-center">
          Game over! Here's how you got on...
        </p>

        <div className="w-full space-y-4 md:space-y-6 mb-8 md:mb-14">
          <div className={`flex justify-between items-center px-6 md:px-8 py-4 md:py-6 rounded-xl ${
            dark ? 'bg-navy' : 'bg-gray-light'
          }`}>
            <span className="text-gray-text font-bold md:text-xl">Time Elapsed</span>
            <span className={`text-xl md:text-3xl font-bold ${dark ? 'text-white' : 'text-navy'}`}>{time}</span>
          </div>
          <div className={`flex justify-between items-center px-6 md:px-8 py-4 md:py-6 rounded-xl ${
            dark ? 'bg-navy' : 'bg-gray-light'
          }`}>
            <span className="text-gray-text font-bold md:text-xl">Moves Taken</span>
            <span className={`text-xl md:text-3xl font-bold ${dark ? 'text-white' : 'text-navy'}`}>{moves} Moves</span>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-4 md:gap-7">
          <button
            onClick={onRestart}
            className="flex-1 bg-orange hover:bg-orange-hover text-white py-3 md:py-4 rounded-full text-lg md:text-2xl font-bold transition-all"
          >
            Restart
          </button>
          <button
            onClick={onNewGame}
            className={`flex-1 py-3 md:py-4 rounded-full text-lg md:text-2xl font-bold transition-all ${
              dark ? 'bg-navy hover:bg-navy-dark text-white' : 'bg-gray-medium hover:bg-gray-hover text-navy-light'
            }`}
          >
            Setup New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinModal;