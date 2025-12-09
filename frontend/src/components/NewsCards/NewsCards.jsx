import styles from "./NewsCards.module.css";

export default function NewsCards({ news }) {
  return (
    <div className="row">
      {news.map((item, idx) => (
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

            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              Leer más →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
