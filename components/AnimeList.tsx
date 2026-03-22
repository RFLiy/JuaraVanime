"use client";
import { useState, useEffect } from "react";
import AnimeCard from "./AnimeCard";
import SkeletonLoading from "./SekeletonLoading";

const JIKAN_BASE = process.env.NEXT_PUBLIC_JIKAN_API_BASE_URL || "https://api.jikan.moe/v4";

// Kita tambahkan prop 'type' untuk menentukan sumber data
interface AnimeListProps {
  page: number;
  type?: "tv" | "movie"; // Defaultnya kita buat opsional
}

const AnimeList: React.FC<AnimeListProps> = ({ page, type = "tv" }) => {
  const [animeList, setAnimeList] = useState<any[] | null>(null);

  useEffect(() => {
    setAnimeList(null);
    
    // Logika penentuan URL:
    // Jika type 'movie', kita ambil dari top anime dengan filter movie atau search movie
    // Jika type 'tv', kita ambil dari season yang sedang jalan (seasons/now)
    const url = type === "movie" 
      ? `${JIKAN_BASE}/anime?type=movie&page=${page}&order_by=popularity&sort=asc`
      : `${JIKAN_BASE}/seasons/now?page=${page}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // Membersihkan duplikat ID jika ada
        const rawData = data.data || [];
        const uniqueData = rawData.filter((item: any, index: number, self: any[]) =>
          index === self.findIndex((t) => t.mal_id === item.mal_id)
        );
        setAnimeList(uniqueData);
      })
      .catch((err) => console.error("Error fetching anime:", err));
  }, [page, type]);

  if (!animeList) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonLoading key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {animeList.length > 0 ? (
        animeList.map((anime, index) => (
          <AnimeCard key={`${anime.mal_id}-${index}`} anime={anime} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500 py-10">Data tidak ditemukan.</p>
      )}
    </div>
  );
};

export default AnimeList;