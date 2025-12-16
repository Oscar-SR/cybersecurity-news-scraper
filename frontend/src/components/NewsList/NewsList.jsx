import { useState, useMemo } from "react";
import { fetchNews } from "../../api/api-news";
import { useTranslation } from "react-i18next";
import NewsFilter from "../NewsFilter/NewsFilter";
import SortSelector from "../SortSelector/SortSelector";
import NewsCards from "../NewsCards/NewsCards";
import WordCloud from "../WordCloud/WordCloud";
import { buildWordCloudFromKeywords } from "../../utils/wordCloud";

function NewsList() {
  const [news, setNews] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortOptions, setSortOptions] = useState({ sortBy: "date", ascending: false });
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const wordCloudData = useMemo(() => buildWordCloudFromKeywords(news), [news]);

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
        className="btn btn-primary"
        onClick={handleFetchNews}
        disabled={loading}
      >
        {loading ? t("home:button.scraping_news") : t("home:button.scrape_news")}
      </button>

      {/* Filtro + Ordenación en una fila */}
      <div className="row g-3 mb-3">
        <div className="col-8">
          <NewsFilter onFilter={setFilter} />
        </div>

        <div className="col-4">
          <SortSelector onSort={setSortOptions} />
        </div>
      </div>

      {!loading && (
        sortedNews.length === 0 ? (
          <p>{t("home:message.there_are_no_news")}</p>
        ) : (
          <>
            <NewsCards news={sortedNews} />
            <h4 className="mt-4">Keyword Cloud</h4>
            <WordCloud words={wordCloudData} />
          </>
        )
      )}
    </div>
  );
}

export default NewsList;
