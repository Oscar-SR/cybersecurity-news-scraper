import { useState, useEffect } from "react";
import styles from "./SortSelector.module.css";

export default function SortSelector({ onSort }) {
  const [sortBy, setSortBy] = useState("date"); // Por defecto: fecha
  const [ascending, setAscending] = useState(false); // Por defecto descendente (más reciente primero)

  // Llamar al padre cuando cambie sortBy o ascending
  useEffect(() => {
    onSort({ sortBy, ascending });
  }, [sortBy, ascending, onSort]);

  return (
    <div className={styles.sortContainer}>
      <select
        className="form-select"
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
      >
        <option value="date">Fecha</option>
        <option value="source">Fuente</option>
      </select>

      <button
        className="btn btn-secondary text-nowrap"
        onClick={() => setAscending(prev => !prev)}
        title="Ascendente / Descendente"
      >
        {ascending ? "↑" : "↓"}
      </button>
    </div>
  );
}
