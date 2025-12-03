export default function NewsFilter({ onFilter }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar noticias..."
        onChange={e => onFilter(e.target.value)}
      />
    </div>
  );
}
