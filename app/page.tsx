"use client";
import SearchBar from "../components/SearchBar";
import AnimeList from "../components/AnimeList";
import Link from "next/link";

export default function Home() {

  return (
    <div className="p-4 space-y-10">
      <SearchBar />

      {/* LAYER 1: ANIME TERBARU (TV) */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-sky-400 border-l-4 border-sky-400 pl-3">
            Anime TV Terbaru
          </h2>
          <Link href="/anime/season" className="text-xs bg-slate-800 px-3 py-1 rounded-full hover:bg-sky-600 transition">
            Lihat Semua
          </Link>
        </div>

        {/* Kita panggil AnimeList tanpa props 'type' karena defaultnya 'tv' */}
        <AnimeList page={1} /> 
      </section>

      {/* LAYER 2: ANIME MOVIE */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-purple-400 border-l-4 border-purple-400 pl-3">
            Rekomendasi Movie
          </h2>
          <Link href="/anime/movie" className="text-xs bg-slate-800 px-3 py-1 rounded-full hover:bg-purple-600 transition">
            Lihat Semua
          </Link>
        </div>
        <AnimeList page={1} type="movie" />
      </section>

      {/* Footer / Info Tambahan jika perlu */}
      <footer className="text-center text-gray-500 text-sm py-10">
        © 2026 Anime Stream - Jikan API
      </footer>
    </div>
  );
}