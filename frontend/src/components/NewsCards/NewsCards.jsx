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
    <div className="row g-4"> {/* g-4 añade espacio (gutter) entre columnas */}
      {news.map((item, idx) => (
        <div key={idx} className="col-md-6 mb-4"> {/* Ajuste responsive opcional */}
          
          {/* h-100 hace que la tarjeta ocupe toda la altura de la columna */}
          <div className="card h-100 shadow-sm border-0"> 
            
            <div className="card-body d-flex flex-column">
              {/* Título */}
              <h5 className="card-title fw-bold">{item.title}</h5>

              {/* Meta información (Subtítulo) */}
              <div className="card-subtitle mb-3 text-body-secondary small">
                <div><strong>Autor:</strong> {item.author || "N/A"}</div>
                <div><strong>Fecha:</strong> {item.date || "N/A"}</div>
                
                <div className="mt-1">
                  <strong>Fuente: </strong>
                  {/* Mantenemos tu lógica de color dinámico */}
                  <span 
                    className="fw-bold" 
                    style={{ color: getColorForSource(item.source) }}
                  >
                    {item.source}
                  </span>
                </div>
              </div>

              {/* Keywords (Texto del cuerpo) */}
              {item.keywords?.length > 0 && (
                <p className="card-text small text-muted mb-4">
                  <strong>Keywords:</strong> {item.keywords.join(", ")}
                </p>
              )}

              {/* Botón (mt-auto empuja el botón al fondo si la tarjeta es larga) */}
              <div className="mt-auto">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  Leer más →
                </a>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
