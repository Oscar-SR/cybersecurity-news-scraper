const API_URL = "/api";

export async function fetchNews() {
    console.log(API_URL);
    const res = await fetch(`${API_URL}/scrape/all`);
    if (!res.ok) throw new Error("Error fetching news");
    return res.json();
}
