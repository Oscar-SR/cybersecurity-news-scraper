import ThemeToggle from "../ThemeToggle/ThemeToggle";
import styles from "./Header.module.css"; // importamos el módulo CSS

function Header({ theme, setTheme }) {
  return (
    <header className={styles.appHeader}>
      <h1 className={styles.pageTitle}>Cybersecurity News Scraper</h1>
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </header>
  );
}

export default Header;
