import { useState } from "react";
import { fetchNews } from "../../api/api-news";
import NewsList from "../../components/NewsList/NewsList";
import KeywordsCloud from "../../components/KeywordsCloud/KeywordsCloud";
import "./Home.css";

function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("news");
  // 1. NUEVO ESTADO PARA ERRORES
  const [error, setError] = useState(null);

  const handleFetchNews = () => {
    setLoading(true);
    setError(null); // Limpiamos errores previos antes de la nueva petición

    fetchNews()
      .then(data => {
        setNews(data);
        setError(null); // Aseguramos que no haya error si tuvo éxito
      })
      .catch(err => {
        console.error("Error scraping news:", err);
        // Puedes poner un mensaje fijo o usar err.message
        setError("Hubo un problema al obtener las noticias. Por favor intenta de nuevo.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="container">
      <h1 className="page-title">Cybersecurity News Scraper</h1>

      {!loading && (
        <div className="mb-3">
          <button className="btn btn-primary" onClick={handleFetchNews}>
             Scrap News
          </button>
        </div>
      )}

      {/* MOSTRAR EL ERROR EN LA UI */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error:</strong> {error}
          {/*<button type="button" className="btn-close" onClick={() => setError(null)} aria-label="Close"></button>*/}
        </div>
      )}

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Scraping news...</p>
        </div>
      )}

      {!loading && news.length > 0 && !error && (
        <>
          <div className="mb-3">
            <button
              className={`btn me-2 ${activeTab === "news" ? "btn-secondary" : "btn-outline-secondary"}`}
              onClick={() => setActiveTab("news")}
            >
              News
            </button>
            <button
              className={`btn ${activeTab === "cloud" ? "btn-secondary" : "btn-outline-secondary"}`}
              onClick={() => setActiveTab("cloud")}
            >
              Keyword Cloud
            </button>
          </div>

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