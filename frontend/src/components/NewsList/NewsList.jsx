import { useState } from "react";
import { useTranslation } from "react-i18next";
import NewsFilter from "../NewsFilter/NewsFilter";
import SortSelector from "../SortSelector/SortSelector";
import NewsCards from "../NewsCards/NewsCards";

function NewsList({ news }) {
  const [filter, setFilter] = useState("");
  const [sortOptions, setSortOptions] = useState({ sortBy: "date", ascending: false });
  const { t } = useTranslation();

  // Filtrado
  const filteredNews = news.filter(item =>
    (item.title || "").toLowerCase().includes(filter.toLowerCase())
  );

  // Ordenación
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

  if (news.length === 0) return <p>{t("home:message.there_are_no_news")}</p>;

  return (
    <div>
      <div className="row g-3 mb-3">
        <div className="col-8">
          <NewsFilter onFilter={setFilter} />
        </div>
        <div className="col-4">
          <SortSelector onSort={setSortOptions} />
        </div>
      </div>
      <NewsCards news={sortedNews} />
    </div>
  );
}

export default NewsList;
