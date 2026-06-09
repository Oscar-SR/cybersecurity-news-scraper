import { useState, useEffect } from "react";
import styles from "./SortSelector.module.css";

// 1. Definimos la forma de los datos que enviamos al padre
export type SortField = 'date' | 'source';

export interface SortState {
  sortBy: SortField;
  ascending: boolean;
}

// 2. Definimos las props del componente
interface SortSelectorProps {
  onSort: (params: SortState) => void;
}

export default function SortSelector({ onSort }: SortSelectorProps) {
  // Le decimos al estado que solo acepte nuestros valores permitidos
  const [sortBy, setSortBy] = useState<'date' | 'source'>("date");
  const [ascending, setAscending] = useState(false);

  useEffect(() => {
    onSort({ sortBy, ascending });
  }, [sortBy, ascending, onSort]);

  return (
    <div className={styles.sortContainer}>
      <select
        className="form-select"
        value={sortBy}
        // "as ..." fuerza a TS a entender que el valor del select es seguro
        onChange={e => setSortBy(e.target.value as 'date' | 'source')}
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