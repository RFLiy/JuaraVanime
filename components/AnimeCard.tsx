"use client"

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

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

export default function AnimeCard({ anime }: { anime: AnimeData }) {
  const imageUrl = anime.images?.webp?.image_url || anime.images?.jpg?.image_url || "/placeholder.png";

  return (
    <Link 
      href={`/anime/${anime.mal_id}`} 
      className="relative group bg-[#0f1a2d] rounded-lg overflow-hidden block transition-transform hover:scale-105"
    >
      {anime.score && (
        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-yellow-400 px-2 py-1 rounded-md flex items-center gap-1 z-10 text-xs font-bold">
          <Star size={12} fill="currentColor" />
          {anime.score}
        </div>
      )}

      <div className="relative w-full h-64">
        <Image
          src={imageUrl}
          alt={anime.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="p-2">
        <p className="text-sm font-medium leading-tight line-clamp-2 h-10 group-hover:text-sky-400 transition text-white">
          {anime.title}
        </p>

        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-sky-400">
            {anime.type} • {anime.episodes ?? "?"} eps
          </p>
          <span className="text-[10px] text-gray-400 italic">
            Score: {anime.score ?? 'N/A'}
          </span>
        </div>
      </div>
    </Link>
  );
}