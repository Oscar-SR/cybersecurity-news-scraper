import ThemeToggle from "../ThemeToggle/ThemeToggle";
import styles from "./Header.module.css"; 

function Header({ theme, setTheme }) {
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