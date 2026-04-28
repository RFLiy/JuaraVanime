"use client";

import { useState, useEffect } from "react";
import AnimeCard from "./AnimeCard";
import SkeletonLoading from "./SekeletonLoading";

const JIKAN_BASE = process.env.NEXT_PUBLIC_JIKAN_API_BASE_URL || "https://api.jikan.moe/v4";

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

interface AnimeListProps {
  page: number;
  type?: "tv" | "movie"; 
}

const AnimeList: React.FC<AnimeListProps> = ({ page, type = "tv" }) => {
  const [animeList, setAnimeList] = useState<AnimeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const url = type === "movie" 
          ? `${JIKAN_BASE}/anime?type=movie&page=${page}&order_by=popularity&sort=asc`
          : `${JIKAN_BASE}/seasons/now?page=${page}`;

        const res = await fetch(url);
        const json = await res.json();
        
        if (isMounted) {
          const rawData: AnimeData[] = json.data || [];
          const uniqueData = rawData.filter((item, index, self) =>
            index === self.findIndex((t) => t.mal_id === item.mal_id)
          );

          setAnimeList(uniqueData);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) setLoading(false);
        console.error(err);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
      setLoading(true);
    };
  }, [page, type]);

  if (loading) {
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
        animeList.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500 py-10">Data tidak ditemukan.</p>
      )}
    </div>
  );
};

export default AnimeList;