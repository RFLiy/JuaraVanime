"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import SkeletonLoading from "./SekeletonLoading";

export default function AnimeCard({ anime }: { anime: any }) {
  const img =
    anime.images?.jpg?.image_url ||
    anime.images?.webp?.image_url ||
    "/placeholder.png";

  const AnimeList: React.FC<{ fetchAnime: () => Promise<any[]> }> = ({ fetchAnime }) => {
  const [animeList, setAnimeList] = useState<any[] | null>(null);

  useEffect(() => {
    fetchAnime().then((data) => setAnimeList(data));
  }, [fetchAnime]);

  if (!animeList) {
    // Tampilkan 10 skeleton card
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonLoading key={i} />
        ))}
      </div>
    );
  }
}

  return (
    <Link
      href={`/anime/${anime.mal_id}`}
      className="bg-[#0f1a2d] rounded-lg overflow-hidden shadow-md hover:scale-[1.02] transition block"
    >
      {/* Poster */}
      <img
        src={img}
        alt={anime.title}
        className="w-full h-64 object-cover"
      />

      {/* Info */}
      <div className="p-2">
        <p className="text-sm leading-tight">{anime.title}</p>

        <p className="text-xs text-emerald-400 mt-1">
          {anime.type} • {anime.episodes ?? "?"} eps
        </p>
      </div>
    </Link>
    
  );
}
