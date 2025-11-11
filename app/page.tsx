"use client";
import SearchBar from "../components/SearchBar";
import AnimeList from "../components/AnimeList";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);

  return (
    <>
      <SearchBar />
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-3 text-emerald-400">
          Anime Terbaru
        </h2>

        <AnimeList page={page} />

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-emerald-800 rounded hover:bg-emerald-400"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-emerald-800 rounded hover:bg-emerald-400"
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
}
