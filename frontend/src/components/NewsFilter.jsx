import { useTranslation } from "react-i18next";

export default function NewsFilter({ onFilter }) {
  const { t } = useTranslation();

  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder={t("home:placeholder.search_news")} 
        onChange={e => onFilter(e.target.value)}
      />
    </div>
  );
}
