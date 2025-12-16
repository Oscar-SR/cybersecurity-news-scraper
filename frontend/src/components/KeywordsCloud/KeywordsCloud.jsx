import { useMemo } from "react";
import WordCloud from "../WordCloud/WordCloud";
import { buildWordCloudFromKeywords } from "../../utils/wordCloud";

function KeywordsCloud({ news }) {
  console.log("KeywordsCloud renderizado");
  const wordCloudData = useMemo(() => buildWordCloudFromKeywords(news), [news]);

  if (news.length === 0) return null;

  return (
    <div>
      <h4>Keyword Cloud</h4>
      <WordCloud words={wordCloudData} />
    </div>
  );
}

export default KeywordsCloud;
