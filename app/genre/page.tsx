import Link from "next/link";

interface GenreData {
  mal_id: number;
  name: string;
  count: number;
}

const JIKAN_GENRE = process.env.NEXT_PUBLIC_JIKAN_GENRE_API_URL || "https://api.jikan.moe/v4/genres/anime";

async function fetchGenres(): Promise<GenreData[]> {
  const res = await fetch(JIKAN_GENRE, { 
    next: { revalidate: 3600 } 
  });
  const json = await res.json();
  return json.data || [];
}

export default async function GenrePage() {
  const genres = await fetchGenres();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-7 text-center text-white">Pilih Genre</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {genres.map((genre) => (
          <Link 
            key={genre.mal_id}
            href={`/genre/${genre.mal_id}?name=${genre.name}`}
            className="bg-[#0f172a] p-4 rounded-lg hover:bg-slate-700 border border-slate-800 transition block text-center"
          >
            <p className="font-semibold text-white">{genre.name}</p>
            <p className="text-xs text-sky-400">{genre.count} anime</p>
          </Link>
        ))}
      </div>
    </div>
  );
}