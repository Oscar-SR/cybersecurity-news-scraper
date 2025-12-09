import { useState } from "react";
import NewsList from "../../components/NewsList/NewsList";
import NewsFilter from "../../components/NewsFilter/NewsFilter";
import "./Home.css";

function Home() {
  const [filter, setFilter] = useState("");

  return (
    <div className="container">
      <h1 className="page-title">Cybersecurity News Scraper</h1>

      <NewsFilter onFilter={setFilter} />
      <NewsList filter={filter} />
    </div>
  );
}

export default Home;
