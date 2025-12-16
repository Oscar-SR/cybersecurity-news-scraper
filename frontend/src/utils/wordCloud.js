// src/utils/wordCloud.js
export function buildWordCloudFromKeywords(news) {
  const counter = {};

  news.forEach(item => {
    if (!Array.isArray(item.keywords)) return;

    item.keywords.forEach(keyword => {
      if (!keyword) return;
      const key = keyword.toLowerCase();
      counter[key] = (counter[key] || 0) + 1;
    });
  });

  return Object.entries(counter)
    .map(([text, value]) => ({ text, value }))
    .filter(w => w.value > 0);
}
