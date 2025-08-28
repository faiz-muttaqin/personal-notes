import React from "react";
import { ThemeConsumer } from '../contexts/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
 
function ToggleTheme() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => {
        return (
          <button
            className={`btn btn-${theme === "light" ? "dark" : "light"} btn-sm me-2`}
            onClick={toggleTheme}
            title="Ganti tema"
          >
            {theme === "light" ? <span role="img" aria-label="Dark"><FaMoon /></span> : <span role="img" aria-label="Light"><FaSun /></span>}
          </button>
        );
      }}
    </ThemeConsumer>
  );
}
 
export default ToggleTheme;