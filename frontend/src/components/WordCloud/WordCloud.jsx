// src/components/WordCloud/WordCloud.jsx
import Cloud from "react-d3-cloud";
import styles from "./WordCloud.module.css";

function NewsWordCloud({ words }) {
  if (!words.length) return null;

  const fontSize = word => word.value * 10;

  return (
    <div className={styles.wordcloudContainer}>
  <Cloud
    data={words}
    fontSize={fontSize}
    padding={2}
    rotate={() => Math.random() * 60 - 30} // rotación aleatoria ±30°
    height={200}
  />
</div>
  );
}

export default NewsWordCloud;
