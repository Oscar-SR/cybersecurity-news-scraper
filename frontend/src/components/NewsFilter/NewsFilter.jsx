import { useTranslation } from "react-i18next";
import styles from "./NewsFilter.module.css";

export default function NewsFilter({ onFilter }) {
  const { t } = useTranslation();

  return (
    <div className={styles["filter-container"]}>
      <input
        type="text"
        className={styles.input}
        placeholder={t("home:placeholder.search_news")}
        onChange={e => onFilter(e.target.value)}
      />
    </div>
  );
}
