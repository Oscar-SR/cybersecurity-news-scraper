import { useState } from "react";
import NewsList from "./components/NewsList";
import NewsFilter from "./components/NewsFilter";

function App() {
  const [filter, setFilter] = useState("");

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center text-white">Noticias de Ciberseguridad</h1>
      <NewsFilter onFilter={setFilter} />
      <NewsList filter={filter} />
    </div>
  );
}

export default App;
