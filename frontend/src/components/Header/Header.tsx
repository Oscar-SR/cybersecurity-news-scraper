import ThemeToggle from "../ThemeToggle/ThemeToggle";
import styles from "./Header.module.css";
import { Theme } from "../../hooks/useTheme";

interface HeaderProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

function Header({ theme, setTheme }: HeaderProps) {
  return (
    <header className={styles.appHeader}>
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className={styles.pageTitle}>Cybersecurity News Scraper</h1>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </header>
  );
}

export default Header;