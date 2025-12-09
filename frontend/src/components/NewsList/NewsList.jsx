import { useState } from "react";
import { fetchNews } from "../../api/api-news";
import { useTranslation } from "react-i18next";
import styles from "./NewsList.module.css";
import NewsFilter from "../NewsFilter/NewsFilter"; // <-- IMPORTANTE

function NewsList() {
  const [news, setNews] = useState([]);
  const [filter, setFilter] = useState("");   // <-- MOVIDO AQUÍ
  const [loading, setLoading] = useState(false); 
  const { t } = useTranslation();

  const handleFetchNews = () => {
    setLoading(true);
    fetchNews()
      .then(data => setNews(data))
      .finally(() => setLoading(false));
  };

  const filteredNews = news.filter(item =>
    (item.title || "").toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {/* Botón de Scrapear */}
      <button 
        className="btn btn-primary mb-3"
        onClick={handleFetchNews}
        disabled={loading}
      >
        {loading ? t("home:button.scraping_news") : t("home:button.scrape_news")}
      </button>

      {/* 🔍 Buscador aquí */}
      <NewsFilter onFilter={setFilter} />

      {/* Si no hay noticias */}
      {filteredNews.length === 0 && !loading && (
        <p className="text-muted">{t("home:message.there_are_no_news")}</p>
      )}

      {/* Lista de noticias */}
      <div className="row">
        {filteredNews.map((item, idx) => (
          <div key={idx} className="col-md-6 mb-4">
            <div className={styles.card}>
              <h5 className={styles.cardTitle}>{item.title}</h5>

              <p className={styles.meta}>
                <strong>Autor:</strong> {item.author || "N/A"} <br />
                <strong>Fecha:</strong> {item.date || "N/A"} <br />
                <strong>Fuente:</strong> {item.source}
              </p>

              {item.keywords?.length > 0 && (
                <p className={styles.keywords}>
                  <strong>Keywords:</strong> {item.keywords.join(", ")}
                </p>
              )}

              <a href={item.url} target="_blank" rel="noreferrer" className={styles.link}>
                Leer más →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsList;
