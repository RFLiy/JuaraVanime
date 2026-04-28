"use client";

import { useState } from "react";
import AnimeCard from "./AnimeCard";

interface AnimeData {
  mal_id: number;
  title: string;
  score?: number;
  type?: string;
  episodes?: number;
  images: {
    jpg: { image_url: string };
    webp?: { image_url: string };
  };
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AnimeData[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=12`
      );
      const json = await res.json();
      setResults(json.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSearch}
        className="flex gap-2 items-center bg-[#0f172a] p-2 rounded-xl border border-slate-700 focus-within:border-sky-500 transition"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white px-2"
          placeholder="Cari anime favoritmu..."
        />
        <button
          type="submit"
          className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-500 transition font-medium"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-white font-bold mb-4 flex items-center gap-2">
            Hasil Pencarian: <span className="text-sky-400 text-sm font-normal">{results.length} ditemukan</span>
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            {results.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}