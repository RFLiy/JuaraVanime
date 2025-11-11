"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[#0f1a2d] px-6 py-4 shadow-lg">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-emerald-400">
            JuaraVanime
        </Link>

        <div className="flex gap-6 text-sm">
          <Link href="/" className="text-emerald-200 hover:text-emerald-600 transition">
            Home
          </Link>
          <Link href="/genre" className="text-emerald-200 hover:text-emerald-600 transition">
            Genre
          </Link>
          <a
            href="https://myanimelist.net/"
            target="_blank"
            className="text-emerald-200 hover:text-emerald-600 transition"
          >
            MyAnimeList
          </a>
        </div>
      </div>
    </nav>
  );
}
