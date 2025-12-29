import { Theme } from "../../hooks/useTheme";

interface ThemeToggleProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
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
