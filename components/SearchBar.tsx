"use client";

import { useState } from "react";
import Link from "next/link";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    if (!query.trim()) return;

    setLoading(true);
    setResults([]);

    try {
      const res = await fetch(
        `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(
          query
        )}&limit=12`
      );
      const json = await res.json();
      setResults(json.data || []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* SEARCH INPUT */}
      <form
        onSubmit={handleSearch}
        className="flex gap-2 items-center bg-[#0f1a2d] p-3 rounded-lg"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white"
          placeholder="Search Anime..."
        />

        <button
          type="submit"
          className="px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-800 transition"
        >
          {loading ? "Mencari..." : "Search"}
        </button>
      </form>

      {/* HASIL SEARCH */}
      {results.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {results.map((anime) => (
            <Link
              href={`/anime/${anime.mal_id}`}
              key={anime.mal_id}
              className="bg-[#0b1220] rounded-lg p-2 hover:scale-[1.02] transition"
            >
              <img
                src={anime.images?.jpg?.image_url}
                className="w-full h-48 object-cover rounded"
                alt={anime.title}
              />

              <p className="mt-2 text-sm font-medium">{anime.title}</p>
              <p className="text-xs text-gray-400">{anime.type}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
