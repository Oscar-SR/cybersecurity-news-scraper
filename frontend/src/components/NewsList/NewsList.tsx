import { useState } from "react";
import { useTranslation } from "react-i18next";
import NewsFilter from "../NewsFilter/NewsFilter";
import SortSelector, { SortState } from "../SortSelector/SortSelector";
import NewsCards from "../NewsCards/NewsCards";
import { NewsItem } from "../NewsCards/NewsCards";

// 2. Definimos las props del componente
export interface NewsListProps {
  news: NewsItem[];
}

// Aplicamos la interfaz NewsListProps aquí 👇
function NewsList({ news }: NewsListProps) {
  const [filter, setFilter] = useState("");
  const { t } = useTranslation();
  
  // Tipamos el estado para mayor seguridad
  const [sortOptions, setSortOptions] = useState<SortState>({ 
    sortBy: "date", 
    ascending: false 
  });
  
  // Filtrado
  // Al haber tipado 'news', TS ya sabe automáticamente que 'item' es un NewsItem ✅
  const filteredNews = news.filter(item =>
    (item.title || "").toLowerCase().includes(filter.toLowerCase())
  );

  // Ordenación
  const sortedNews = [...filteredNews].sort((a, b) => {
    // TypeScript ya sabe que sortBy solo puede ser 'date' o 'source'
    const { sortBy, ascending } = sortOptions;

    if (sortBy === "date") {
      const dateA = new Date(a.date || 0).getTime();
      const dateB = new Date(b.date || 0).getTime();
      return ascending ? dateA - dateB : dateB - dateA;
    }

    if (sortBy === "source") {
      const cmp = (a.source || "").localeCompare(b.source || "");
      return ascending ? cmp : -cmp;
    }

    return 0;
  });

  if (news.length === 0) return <p>{t("home:message.there_are_no_news")}</p>;

  return (
    <div>
      {/* Controles de Filtro y Orden */}
      <div className="row g-3 mb-3">
        <div className="col-8">
          <NewsFilter onFilter={setFilter} />
        </div>
        <div className="col-4">
          <SortSelector onSort={setSortOptions} />
        </div>
      </div>

      {/* LÓGICA DE VISUALIZACIÓN */}
      {sortedNews.length > 0 ? (
        <NewsCards news={sortedNews} />
      ) : (
        <div className="text-center mt-4">
          <p>{t("home:message.there_are_no_news")}</p>
        </div>
      )}
    </div>
  );
}

export default NewsList;