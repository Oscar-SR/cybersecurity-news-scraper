export async function fetchNews() {
  const res = await fetch("http://localhost:3000/scrape/hn"); // Hardcoded to scrape the hacker news
  if (!res.ok) throw new Error("Error fetching news");
  return res.json();
}