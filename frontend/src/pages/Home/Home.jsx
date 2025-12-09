import NewsList from "../../components/NewsList/NewsList";
import "./Home.css";

function Home() {
  return (
    <div className="container">
      <h1 className="page-title">Cybersecurity News Scraper</h1>
      <NewsList />
    </div>
  );
}

export default Home;
