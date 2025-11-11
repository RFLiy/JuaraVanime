const JIKAN_GENRE = "https://api.jikan.moe/v4/genres/anime";

async function fetchGenres() {
  const res = await fetch(JIKAN_GENRE, { next: { revalidate: 3600 } });
  const json = await res.json();
  return json.data || [];
}

export default async function GenrePage() {
  const genres = await fetchGenres();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Pilih Genre</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {genres.map((genre: any) => (
          <a
            key={genre.mal_id}
            href={`/genre/${genre.mal_id}?name=${genre.name}`}
            className="bg-slate-800 p-4 rounded hover:bg-slate-700 transition block text-center"
          >
            <p className="font-semibold">{genre.name}</p>
            <p className="text-xs text-gray-400">{genre.count} anime</p>
          </a>
        ))}
      </div>
    </div>
  );
}
