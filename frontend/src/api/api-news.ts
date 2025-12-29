const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function fetchNews() {
  console.log(API_URL);
  const res = await fetch(`${API_URL}/scrape/all`);
  if (!res.ok) throw new Error("Error fetching news");
  return res.json();
}
