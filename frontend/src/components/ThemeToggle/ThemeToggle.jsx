import React from "react";

function ThemeToggle({ theme, setTheme }) {
  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="themeSwitch"
        checked={isDark}
        onChange={handleToggle}
      />
      <label className="form-check-label" htmlFor="themeSwitch">
        {isDark ? "🌙" : "☀️"}
      </label>
    </div>
  );
}

export default ThemeToggle;
