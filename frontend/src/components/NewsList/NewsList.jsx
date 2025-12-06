import { useEffect, useState } from "react";
import { fetchNews } from "../../api/api-news";
import styles from "./NewsList.module.css";

function NewsList({ filter }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = () =>
      fetchNews()
        .then(data => setNews(data))  // ya NO transformamos nada
        .finally(() => setLoading(false));

    load();
    const interval = setInterval(load, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="text-muted">Cargando noticias...</p>;

  // Evita error si title es undefined
  const filteredNews = news.filter(item =>
    (item.title || "").toLowerCase().includes(filter.toLowerCase())
  );

  return (
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
  );
}

export default NewsList;
