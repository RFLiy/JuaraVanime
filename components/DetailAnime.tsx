"use client"

import React from 'react';
import Image from 'next/image';

interface Genre {
    mal_id: number;
    name: string;
}

interface Anime {
    title_english: string | null;
    title_japanese: string | null;
    title: string; 
    synopsis: string | null;
    score: number | null;
    status: string | null;
    episodes: number | null;
    images?: { 
        jpg: { 
            large_image_url: string; 
            image_url: string; 
        } 
    };
    trailer?: {
        embed_url: string | null; 
    }
    genres?: Genre[]; 
    aired?: { string: string };
}

const DetailAnime: React.FC<{ anime: Anime | null }> = ({ anime }) => {
    if (!anime) {
        return <div className="p-5 text-red-400">Data anime tidak ditemukan atau API sedang bermasalah.</div>;
    }

    const imageUrl = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || "/placeholder.png";
    const embedUrl = anime.trailer?.embed_url;
    const scoreDisplay = anime.score !== null ? anime.score.toFixed(2) : '-';
    const mainTitle = anime.title_english || anime.title || anime.title_japanese || "Untitled Anime";

    return (
        <div className="bg-slate-900 rounded-xl shadow-2xl p-6 md:p-10 border border-slate-700 text-white">
            <div className="flex flex-col md:flex-row gap-8 mb-10">
                <div className="md:w-1/3 flex-shrink-0">
                    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                        <Image 
                            src={imageUrl} 
                            alt={mainTitle} 
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                    
                    <div className="mt-4 p-4 bg-slate-800 rounded-lg space-y-2">
                         <h3 className="text-xl font-bold mb-2 text-emerald-400 border-b border-slate-700 pb-2">Informasi Umum</h3>
                         <p className="text-sm">
                            <b>Score:</b> <span className="font-semibold text-yellow-400">{scoreDisplay}</span>
                         </p>
                         <p className="text-sm">
                            <b>Episode:</b> <span className="font-semibold text-white">{anime.episodes ?? '-'}</span>
                         </p>
                         <p className="text-sm">
                            <b>Status:</b> <span className="font-semibold text-white">{anime.status ?? '-'}</span>
                         </p>
                         <p className="text-sm">
                            <b>Tayang:</b> <span className="font-semibold text-white">{anime.aired?.string ?? '-'}</span>
                         </p>
                    </div>

                    {anime.genres && anime.genres.length > 0 && (
                        <div className="mt-4 p-4 bg-slate-800 rounded-lg">
                            <h3 className="text-xl font-bold mb-3 text-emerald-400 border-b border-slate-700 pb-2">Genre</h3>
                            <div className="flex flex-wrap gap-2">
                                {anime.genres.map((genre) => (
                                    <span
                                        key={genre.mal_id}
                                        className="px-3 py-1 text-xs bg-emerald-600 rounded-full font-medium transition hover:bg-emerald-500"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="md:w-2/3">
                    <h1 className="text-4xl font-extrabold text-emerald-300 mb-2">
                        {mainTitle}
                    </h1>
                    {anime.title_japanese && (
                        <h2 className="text-xl text-gray-300 font-medium mb-6">
                            {anime.title_japanese}
                        </h2>
                    )}

                    <div className="bg-slate-800 p-6 rounded-lg shadow-inner">
                        <h3 className="text-2xl font-bold text-emerald-400 mb-3 border-b border-slate-700 pb-2">Sinopsis</h3>
                        <p className="text-gray-300 text-justify leading-relaxed whitespace-pre-wrap">
                            {anime.synopsis || 'Sinopsis tidak tersedia.'}
                        </p>
                    </div>
                </div>
            </div>

            {embedUrl ? (
                <div className="mt-10 pt-8 border-t border-slate-700">
                    <h2 className="text-3xl font-bold text-emerald-400 mb-6">Trailer</h2>
                    <div className="relative w-full overflow-hidden rounded-xl shadow-2xl" style={{ paddingBottom: '56.25%' }}>
                        <iframe 
                            src={embedUrl}
                            title={`Trailer for ${mainTitle}`}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                            className="absolute top-0 left-0 w-full h-full border-none"
                        ></iframe>
                    </div>
                    <div className="mt-6 text-center">
                        <a
                            href="https://otakudesu.best/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition"
                        >
                            Tonton Anime
                        </a>
                    </div>
                </div>
            ) : (
                <div className="mt-10 pt-8 border-t border-slate-700 text-center text-gray-500">
                    Trailer belum tersedia untuk anime ini.
                </div>
            )}
        </div>
    );
};

export default DetailAnime;