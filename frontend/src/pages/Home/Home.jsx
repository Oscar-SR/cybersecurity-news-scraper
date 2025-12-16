import { useState } from "react";
import { fetchNews } from "../../api/api-news";
import NewsList from "../../components/NewsList/NewsList";
import KeywordsCloud from "../../components/KeywordsCloud/KeywordsCloud";
import "./Home.css";

function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("news");

  const handleFetchNews = () => {
    setLoading(true);
    fetchNews()
      .then(data => setNews(data))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container">
      <h1 className="page-title">Cybersecurity News Scraper</h1>

      {/* Botón para scrapear */}
      {news.length === 0 && !loading && (
        <button className="btn btn-primary mb-3" onClick={handleFetchNews}>
          Scrap News
        </button>
      )}
      {loading && <p>Scraping news...</p>}

      {/* Mostrar tabs solo si ya hay noticias */}
      {!loading && news.length > 0 && (
        <>
          <div className="mb-3">
            <button
              className={`btn me-2 ${activeTab === "news" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setActiveTab("news")}
            >
              News
            </button>
            <button
              className={`btn ${activeTab === "cloud" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setActiveTab("cloud")}
            >
              Keyword Cloud
            </button>
          </div>

          {/* Contenido */}
          {activeTab === "news" && <NewsList news={news} />}
          {activeTab === "cloud" && <KeywordsCloud news={news} />}
        </>
      )}
    </div>
  );
}

export default Home;
