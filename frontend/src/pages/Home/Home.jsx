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
    // Nota: setNews reemplazará las noticias viejas con las nuevas
    fetchNews()
      .then(data => setNews(data))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container">
      <h1 className="page-title">Cybersecurity News Scraper</h1>

      {/* --- CAMBIO AQUÍ --- */}
      {/* Eliminamos "news.length === 0". Ahora solo verificamos !loading */}
      {!loading && (
        <div className="mb-3">
          <button className="btn btn-primary" onClick={handleFetchNews}>
            Scrap News
          </button>
        </div>
      )}
      {/* ------------------- */}

      {/* Sección de Loading con Spinner */}
      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Scraping news...</p>
        </div>
      )}

      {/* Tabs y Contenido (Solo visible si hay noticias y no carga) */}
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

          {/* Contenido con display toggle para persistencia */}
          <div style={{ display: activeTab === "news" ? "block" : "none" }}>
            <NewsList news={news} />
          </div>

          <div style={{ display: activeTab === "cloud" ? "block" : "none" }}>
            <KeywordsCloud news={news} />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;