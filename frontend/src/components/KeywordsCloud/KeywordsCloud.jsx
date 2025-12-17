import { useMemo, useCallback } from "react";
import Cloud from "react-d3-cloud";
import { buildWordCloudFromKeywords } from "../../utils/wordCloud";
import styles from "./KeywordsCloud.module.css"; 

// 1. Definimos la función de rotación FUERA del componente.
// Esto garantiza que la referencia sea estable y la nube no se re-anime
// innecesariamente si el componente padre se renderiza.
const randomRotate = () => Math.random() * 60 - 30;

function KeywordsCloud({ news }) {
  // 2. Memorizamos los datos transformados.
  // Solo se recalcula si el array de noticias cambia.
  const wordCloudData = useMemo(() => buildWordCloudFromKeywords(news), [news]);

  // 3. Memorizamos la función de tamaño de fuente.
  const fontSize = useCallback((word) => word.value * 10, []);

  // Validación de seguridad
  if (!news || news.length === 0 || wordCloudData.length === 0) return null;

  return (
    <div>
      <h4>Keyword Cloud</h4>
      
      {/* Contenedor con estilos para limitar el tamaño si es necesario */}
      <div className={styles.wordcloudContainer}>
        <Cloud
          data={wordCloudData}
          fontSize={fontSize}
          padding={2}
          rotate={randomRotate} // Pasamos la referencia estable
          height={200}
        />
      </div>
    </div>
  );
}

export default KeywordsCloud;