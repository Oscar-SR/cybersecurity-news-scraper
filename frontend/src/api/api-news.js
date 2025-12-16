export async function fetchNews() {
  const res = await fetch("http://localhost:3000/scrape/hn");
  if (!res.ok) throw new Error("Error fetching news");
  return res.json();
}

/*
export async function fetchNews() {
  const urls = [
    "http://localhost:3000/scrape/hn",
    "http://localhost:3000/scrape/bc",
    "http://localhost:3000/scrape/cso",
  ];

  // Ejecutar todo en paralelo
  const responses = await Promise.all(urls.map(url => fetch(url)));

  // Comprobar errores
  responses.forEach(res => {
    if (!res.ok) throw new Error("Error fetching news from: " + res.url);
  });

  // Convertir cada respuesta a JSON
  const data = await Promise.all(responses.map(res => res.json()));

  // Unir los arrays (data es un array de arrays)
  const merged = data.flat();

  return merged;
}
*/