import React from "react";
import { Sun, Moon } from "lucide-react";

const Menu = ({ onStart, dark, onToggleDark }) => {
  const [theme, setTheme] = React.useState("Numbers");
  const [size, setSize] = React.useState("4x4");

  const handleStart = () => {
    onStart({ theme, size });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-navy dark:bg-navy-dark px-6 transition-colors duration-300">
      <button
        onClick={onToggleDark}
        className="absolute top-6 right-6 p-2 rounded-full bg-navy-light dark:bg-navy text-white hover:bg-gray-hover transition-all"
        aria-label="Toggle dark mode"
      >
        {dark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <h1 className="text-white text-3xl md:text-4xl font-bold mb-10 md:mb-16">
        memory
      </h1>

      <div className="bg-white dark:bg-navy-light w-full max-w-[654px] rounded-2xl p-6 md:p-14 space-y-6 md:space-y-8 transition-colors duration-300">
        <div>
          <label className="text-gray-text dark:text-gray-medium font-bold text-sm md:text-xl block mb-3 md:mb-4">
            Select Theme
          </label>
          <div className="flex gap-3 md:gap-7">
            {["Numbers", "Icons"].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`flex-1 py-2 md:py-3 rounded-full text-base md:text-2xl font-bold transition-all ${
                  theme === t
                    ? "bg-navy-light dark:bg-orange text-white"
                    : "bg-gray-medium dark:bg-navy text-white hover:bg-gray-hover"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-gray-text dark:text-gray-medium font-bold text-sm md:text-xl block mb-3 md:mb-4">
            Grid Size
          </label>
          <div className="flex gap-3 md:gap-7">
            {["4x4", "6x6"].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`flex-1 py-2 md:py-3 rounded-full text-base md:text-2xl font-bold transition-all ${
                  size === s
                    ? "bg-navy-light dark:bg-orange text-white"
                    : "bg-gray-medium dark:bg-navy text-white hover:bg-gray-hover"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleStart}
          className="w-full bg-orange hover:bg-orange-hover text-white py-3 md:py-4 rounded-full text-lg md:text-3xl font-bold transition-all mt-4"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default Menu;
