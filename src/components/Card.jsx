import React from "react";

const Card = ({ card, onClick, isFlipped, isMatched }) => {
  return (
    <div
      onClick={onClick}
      className={`
        aspect-square flex items-center justify-center
        rounded-lg md:rounded-xl cursor-pointer
        text-2xl md:text-4xl font-bold
        transition-all duration-300 transform
        ${
          isFlipped || isMatched
            ? "bg-white dark:bg-navy-light"
            : "bg-navy-light dark:bg-navy hover:bg-gray-hover"
        }
        ${isMatched ? "opacity-50" : ""}
      `}
    >
      {isFlipped || isMatched ? card : "?"}
    </div>
  );
};

export default Card;
