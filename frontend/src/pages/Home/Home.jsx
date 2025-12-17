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

      {/* Botón y Loading igual que antes ... */}
      {news.length === 0 && !loading && (
        <button className="btn btn-primary mb-3" onClick={handleFetchNews}>
          Scrap News
        </button>
      )}
      {loading && <p>Scraping news...</p>}

      {!loading && news.length > 0 && (
        <>
          <div className="mb-3">
             {/* ... Botones de Tabs igual que antes ... */}
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

          {/* --- CAMBIO AQUÍ --- */}
          {/* Usamos un contenedor con style display en lugar de renderizado condicional */}
          
          <div style={{ display: activeTab === "news" ? "block" : "none" }}>
            <NewsList news={news} />
          </div>

          <div style={{ display: activeTab === "cloud" ? "block" : "none" }}>
            <KeywordsCloud news={news} />
          </div>
          {/* ------------------- */}
          
        </>
      )}
    </div>
  );
}

export default Home;
