import styles from "./NewsCards.module.css";
import { SOURCE_COLOR_MAP } from "../../styles/sourceColors";

function getColorForSource(source) {
  if (SOURCE_COLOR_MAP[source]) return SOURCE_COLOR_MAP[source];

  // fallback hashing
  const colors = Object.values(SOURCE_COLOR_MAP);
  let hash = 0;
  for (let i = 0; i < source.length; i++) {
    hash = source.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

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
              <strong>Fuente:</strong>{" "}
              <span
                className={styles.sourceBadge}
                style={{ color: getColorForSource(item.source) }}
              >
                {item.source}
              </span>
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
