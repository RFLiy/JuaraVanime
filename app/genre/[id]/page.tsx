"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import AnimeCard from "@/components/AnimeCard";
import SearchBar from "@/components/SearchBar";

const API = "https://api.jikan.moe/v4/anime";

async function fetchByGenre(id: string, page: number) {
  const res = await fetch(`${API}?genres=${id}&page=${page}`);
  const json = await res.json();
  return json.data || [];
}

export default function GenreDetailPage() {
  const params = useParams(); // Ambil dynamic param [id]
  const id = params?.id || "";

  const searchParams = useSearchParams(); // Ambil query param client-side
  const genreName = searchParams?.get("name") || "Genre";

  const [page, setPage] = useState(1);
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      // ...
      if (!id) return;

      // --- PERBAIKAN DI SINI ---
      const genreId = Array.isArray(id) ? id[0] : id; // Pastikan id adalah string tunggal
      // -------------------------

      setLoading(true);

      // Gunakan genreId yang sudah pasti bertipe string
      fetchByGenre(genreId, page).then((data) => { 
          setAnimeList(data);
          setLoading(false);
      });
  }, [id, page]);

  return (
    <div className="p-4">
      <SearchBar />

      <h1 className="text-2xl font-bold mb-3">{genreName} Anime</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {animeList.map((anime: any) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
