"use client"

import Link from "next/link";
import { Star } from "lucide-react";

export default function AnimeCard({ anime }: { anime: any }) {
  const img =
    anime.images?.jpg?.image_url ||
    anime.images?.webp?.image_url ||
    "/placeholder.png";

  return (
    <Link 
      href={`/anime/${anime.mal_id}`} 
      className="relative group bg-[#0f1a2d] rounded-lg overflow-hidden ..."
    >
      {/* Badge Rating (Melayang di atas gambar) */}
      {anime.score && (
        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-yellow-400 px-2 py-1 rounded-md flex items-center gap-1 z-10 text-xs font-bold">
          <Star size={12} fill="currentColor" />
          {anime.score}
        </div>
      )}

      {/* Poster */}
      <img
        src={img}
        alt={anime.title}
        className="w-full h-64 object-cover"
        loading="lazy"
      />

      {/* Info */}
      <div className="p-2">
        <p className="text-sm font-medium leading-tight line-clamp-2 h-10 group-hover:text-sky-400 transition">
          {anime.title}
        </p>

        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-sky-400">
            {anime.type} • {anime.episodes ?? "?"} eps
          </p>
          <span className="text-[10px] text-gray-400 italic">Score: {anime.score ?? 'N/A'}</span>
        </div>
      </div>
    </Link>
  );
}