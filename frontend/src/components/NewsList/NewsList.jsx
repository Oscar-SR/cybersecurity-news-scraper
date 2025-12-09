import { useState } from "react";
import { fetchNews } from "../../api/api-news";
import { useTranslation } from "react-i18next";
import NewsFilter from "../NewsFilter/NewsFilter";
import SortSelector from "../SortSelector/SortSelector";
import NewsCards from "../NewsCards/NewsCards";

function NewsList() {
  const [news, setNews] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortOptions, setSortOptions] = useState({ sortBy: "date", ascending: false });
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleFetchNews = () => {
    setLoading(true);
    fetchNews()
      .then(data => setNews(data))
      .finally(() => setLoading(false));
  };

  // --- FILTRADO ---
  const filteredNews = news.filter(item =>
    (item.title || "").toLowerCase().includes(filter.toLowerCase())
  );

  // --- ORDENACIÓN ---
  const sortedNews = [...filteredNews].sort((a, b) => {
    const { sortBy, ascending } = sortOptions;

    if (sortBy === "date") {
      const dateA = new Date(a.date || 0);
      const dateB = new Date(b.date || 0);
      return ascending ? dateA - dateB : dateB - dateA;
    }

    if (sortBy === "source") {
      const cmp = (a.source || "").localeCompare(b.source || "");
      return ascending ? cmp : -cmp;
    }

    return 0;
  });

  return (
    <div>
      {/* Botón para scrapear */}
      <button
        className="btn btn-primary mb-3"
        onClick={handleFetchNews}
        disabled={loading}
      >
        {loading ? t("home:button.scraping_news") : t("home:button.scrape_news")}
      </button>

      {/* Filtro de búsqueda */}
      <NewsFilter onFilter={setFilter} />

      {/* Selector de ordenación */}
      <SortSelector onSort={setSortOptions} />

      {/* Mensaje si no hay resultados */}
      {sortedNews.length === 0 && !loading && (
        <p className="text-muted">{t("home:message.there_are_no_news")}</p>
      )}

      {/* Render de tarjetas */}
      <NewsCards news={sortedNews} />
    </div>
  );
}

export default NewsList;
