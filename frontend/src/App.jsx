import { useState } from "react";
import { useTranslation } from "react-i18next";   // 👈 IMPORTANTE
import NewsList from "./components/NewsList";
import NewsFilter from "./components/NewsFilter";

function App() {
  const [filter, setFilter] = useState("");
  const { t } = useTranslation();                 // 👈 ACCEDE A t()

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center text-white">
        {t("title.news_cybersecurity")}            {/* 👈 TRADUCCIÓN */}
      </h1>

      <NewsFilter onFilter={setFilter} />
      <NewsList filter={filter} />
    </div>
  );
}

export default App;
