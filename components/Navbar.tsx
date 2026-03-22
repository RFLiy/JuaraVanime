"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black px-6 py-4 shadow-lg">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-sky-600">
            Musk.ID
        </Link>

        <div className="flex gap-6 text-sm">
          <Link href="/" className="text-sky-600 hover:text-sky-600 transition font-bold">
            Home
          </Link>
          <Link href="/genre" className="text-sky-200 hover:text-sky-600 transition font-bold">
            Genre
          </Link>
          <a
            href="https://myanimelist.net/"
            target="_blank"
            className="text-sky-200 hover:text-sky-600 transition font-bold"
          >
            MyAnimeList
          </a>
        </div>
      </div>
    </nav>
  );
}
