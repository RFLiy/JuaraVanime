"use client";
import { useState, useEffect } from "react";
import AnimeCard from "./AnimeCard";
import SkeletonLoading from "./SekeletonLoading";

const JIKAN_BASE = process.env.NEXT_PUBLIC_JIKAN_API_BASE_URL;

const AnimeList: React.FC<{ page: number }> = ({ page }) => {
  const [animeList, setAnimeList] = useState<any[] | null>(null);

  useEffect(() => {
    setAnimeList(null); // reset loading saat page berubah
    fetch(`${JIKAN_BASE}/seasons/now?page=${page}`)
      .then((res) => res.json())
      .then((data) => setAnimeList(data.data || []));
  }, [page]);

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
     {animeList.map((anime, index) => (
        <AnimeCard key={`${anime.mal_id}-${index}`} anime={anime} />
    ))}

    </div>
  );
};

export default AnimeList;
