"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import AnimeCard from "@/components/AnimeCard";
import SearchBar from "@/components/SearchBar";

const API = process.env.NEXT_PUBLIC_JIKAN_API_BASE_URL || "https://api.jikan.moe/v4";

// 1. Fungsi fetch yang mendukung sorting
async function fetchByGenre(id: string, page: number, orderBy: string, sort: string) {
  const res = await fetch(`${API}/anime?genres=${id}&page=${page}&order_by=${orderBy}&sort=${sort}`);
  const json = await res.json();
  return json.data || [];
}

export default function GenreDetailPage() {
  const params = useParams();
  const id = params?.id || "";
  const searchParams = useSearchParams();
  const genreName = searchParams?.get("name") || "Genre";

  const [page, setPage] = useState(1);
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // 2. State untuk Filter
  const [orderBy, setOrderBy] = useState("popularity");
  const [sort, setSort] = useState("asc");

    useEffect(() => {
      if (!id) return;
      const genreId = Array.isArray(id) ? id[0] : id;
      setLoading(true);
      
      fetchByGenre(genreId, page, orderBy, sort).then((data) => {
        // FILTER DUPLIKAT DI SINI
        const uniqueData = data.filter((item: any, index: number, self: any[]) =>
          index === self.findIndex((t) => t.mal_id === item.mal_id)
        );

        setAnimeList(uniqueData);
        setLoading(false);
      });
    }, [id, page, orderBy, sort]);

  // Handler saat filter berubah
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPage(1);
    
    if (value === "score_desc") {
      setOrderBy("score");
      setSort("desc");
    } else if (value === "start_date_desc") {
      setOrderBy("start_date");
      setSort("desc");
    } else {
      setOrderBy("popularity");
      setSort("asc");
    }
  };

  return (
    <div className="p-4">
      <SearchBar />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">{genreName} Anime</h1>

        {/* 4. Dropdown Filter UI */}
        <select 
          onChange={handleFilterChange}
          className="bg-[#1a2638] text-sm text-white px-3 py-2 mt-3 rounded-lg border border-slate-700 outline-none focus:border-sky-500 transition"
        >
          <option value="popularity_asc">Terpopuler</option>
          <option value="score_desc">Rating Tertinggi</option>
          <option value="start_date_desc">Terbaru</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
           <p className="col-span-full text-center py-10">Loading...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {animeList.length > 0 ? (
              animeList.map((anime: any) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400">Tidak ada data ditemukan.</p>
            )}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              onClick={() => { setPage((prev) => Math.max(prev - 1, 1)); window.scrollTo(0,0); }}
              disabled={page === 1}
              className="px-6 py-2 bg-slate-800 rounded-full hover:bg-sky-600 disabled:opacity-30 transition font-semibold"
            >
              Prev
            </button>
            <span className="text-sm font-bold bg-sky-500/20 text-sky-400 px-4 py-1 rounded-full border border-sky-500/30">
              Page {page}
            </span>
            <button
              onClick={() => { setPage((prev) => prev + 1); window.scrollTo(0,0); }}
              className="px-6 py-2 bg-slate-800 rounded-full hover:bg-sky-600 transition font-semibold"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}