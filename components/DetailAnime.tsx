"use client"

import React from 'react';

interface Anime {
    title_english: string;
    title_japanese: string;
    title: string; 
    synopsis: string;
    score: number | null;
    status: string;
    episodes: number | null;
    images?: { jpg: { large_image_url: string; image_url: string; } };
    trailer?: {
        embed_url: string | null; 
    }
    genres?: Array<{ mal_id: number; name: string }>; 
    aired?: { string: string };
}

const DetailAnime: React.FC<{ anime: Anime | null }> = ({ anime }) => {
    if (!anime) {
        return <div className="p-5 text-red-400">Data anime tidak ditemukan atau API sedang bermasalah.</div>;
    }

    const imageUrl = 
        anime.images?.jpg?.large_image_url ||
        anime.images?.jpg?.image_url ||
        'https://placehold.co/400x600/1e293b/94a3b8?text=NO+IMAGE'; 
        
    const embedUrl = anime.trailer?.embed_url;
    const scoreDisplay = anime.score !== null ? anime.score?.toFixed(2) : '-';
    const mainTitle = anime.title_english || anime.title_japanese || anime.title || "Untitled Anime";

    return (
        <div className="bg-slate-900 rounded-xl shadow-2xl p-6 md:p-10 border border-slate-700 text-white">
            
            {/* Bagian Poster dan Informasi Singkat */}
            <div className="flex flex-col md:flex-row gap-8 mb-10">
                
                {/* Poster */}
                <div className="md:w-1/3 flex-shrink-0">
                    <img 
                        src={imageUrl} 
                        alt={mainTitle} 
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                        onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x600/1e293b/94a3b8?text=LOAD+FAILED'; }}
                    />
                    
                    {/* Info Singkat (Diambil dari kode lama dan digabungkan dengan style baru) */}
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

                    {/* Genres (Ditambahkan kembali dari kode lama) */}
                    {anime.genres && anime.genres.length > 0 && (
                        <div className="mt-4 p-4 bg-slate-800 rounded-lg">
                            <h3 className="text-xl font-bold mb-3 text-emerald-400 border-b border-slate-700 pb-2">Genre</h3>
                            <div className="flex flex-wrap gap-2">
                                {anime.genres.map((genre: any) => (
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

                {/* Deskripsi */}
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

            {/* Bagian TRAILER YOUTUBE (Tetap di bawah dan responsif) */}
            {embedUrl ? (
                <div className="mt-10 pt-8 border-t border-slate-700">
                    <h2 className="text-3xl font-bold text-emerald-400 mb-6">Trailer</h2>
                    
                    {/* Container responsif untuk iframe YouTube */}
                    <div className="relative w-full overflow-hidden rounded-xl shadow-2xl" 
                         style={{ paddingBottom: '56.25%' /* Rasio 16:9 */ }}>
                        <iframe 
                            src={embedUrl}
                            title={`Trailer for ${mainTitle}`}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                            className="absolute top-0 left-0 w-full h-full border-none"
                        ></iframe>
                    </div>
                    
                    {/* Tombol Tonton Anime */}
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