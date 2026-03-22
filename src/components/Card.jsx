import React from "react";

const Card = ({ value, isFlipped, isMatched, onClick, size, theme, dark }) => {
  const is6x6 = size === "6x6";

  return (
    <div
      onClick={!isMatched && !isFlipped ? onClick : undefined}
      className={`perspective-1000 cursor-pointer ${
        is6x6
          ? "w-10 h-10 md:w-20 md:h-20 text-lg md:text-4xl"
          : "w-16 h-16 md:w-28 md:h-28 text-2xl md:text-5xl"
      } transition-transform duration-300 transform active:scale-95`}
    >
      <div
        className={`relative w-full h-full preserve-3d transition-transform duration-500 ${
          isFlipped || isMatched ? "rotate-y-180" : ""
        }`}
      >
        {/* Card Back */}
        <div
          className={`absolute inset-0 rounded-full backface-hidden transition-colors ${
            dark
              ? "bg-navy hover:bg-navy-light"
              : "bg-navy-light hover:bg-gray-hover"
          }`}
        />

        {/* Card Front */}
        <div
          className={`absolute inset-0 rounded-full backface-hidden rotate-y-180 flex items-center justify-center font-bold text-white ${
            isMatched ? "bg-gray-medium" : "bg-orange"
          }`}
        >
          {theme === "Icons" ? (
            <div
              className={`${is6x6 ? "scale-75 md:scale-100" : "scale-110 md:scale-150"}`}
            >
              {value}
            </div>
          ) : (
            value
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
