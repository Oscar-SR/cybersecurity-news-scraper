import { useState } from "react";
import { useTranslation } from "react-i18next";
import NewsList from "../../components/NewsList/NewsList";
import NewsFilter from "../../components/NewsFilter/NewsFilter";
import "./Home.css";

function Home() {
  const [filter, setFilter] = useState("");
  const { t } = useTranslation();

  return (
    <div className="container py-5">
      <h1 className="page-title">{t("title.news_cybersecurity")}</h1>

      <NewsFilter onFilter={setFilter} />
      <NewsList filter={filter} />
    </div>
  );
}

export default Home;
