import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  // State stores "light" or "dark"
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // Apply theme to <html>
  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") html.classList.add("dark");
    else html.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-gray-300 dark:bg-gray-700 p-[3px] flex items-center transition-colors duration-300 hover:scale-105"
      aria-label="Toggle Theme"
    >
      {/* Slider */}
      <div
        className={`absolute top-[3px] left-[3px] w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-md transition-all duration-300 flex items-center justify-center ${
          theme === "dark" ? "translate-x-7" : ""
        }`}
      >
        {theme === "dark" ? (
          <Moon className="w-4 h-4 text-yellow-400" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-500" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
