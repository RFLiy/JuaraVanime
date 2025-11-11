import DetailAnime from "../../../components/DetailAnime";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_JIKAN_API_BASE_URL;

async function fetchAnime(id: string) {
  try {
    const res = await fetch(`${API}/anime/${id}/full`);
    const json = await res.json();
    return json.data || null;
  } catch {
    return null;
  }
}

export default async function AnimeDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params; 
  const anime = await fetchAnime(id);

  return (
    <div className="p-3">
      <Link
        href="/"
        className="px-3 py-2 bg-emerald-600 font-bold rounded text-sm inline-block mb-4"
      >
        ← Kembali
      </Link>

      <DetailAnime anime={anime} />
    </div>
  );
}
