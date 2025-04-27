import { useState } from "react";

export function RecherchePanel({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="bg-gray-300 shadow-md rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        🔎 Rechercher
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nom, Prénom ou Entreprise"
          className="border rounded-lg p-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-2 transition"
        >
          Chercher
        </button>
      </form>
    </div>
  );
}
