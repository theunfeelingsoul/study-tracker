"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const navLink =
    "text-base md:text-xl flex flex-wrap gap-4 md:gap-10 pb-1 border-b-2 border-transparent hover:border-blue-500 hover:text-blue-600 transition-colors cursor-pointer";

  return (
    <nav className="border-b border-gray-300 pb-3 mb-6 ">
      <div className="flex flex-wrap gap-4">
        <Link
          href="/"
          className={`${navLink} ${
            pathname === "/" ? "font-bold text-blue-600" : ""
          }`}
        >
          Home
        </Link>

        <Link
          href="/study"
          className={`${navLink} ${
            pathname === "/study" ? "font-bold text-blue-600" : ""
          }`}
        >
          Study
        </Link>

        <Link
          href="/kanji"
          className={`${navLink} ${
            pathname === "/kanji" ? "font-bold text-blue-600" : ""
          }`}
        >
          All Kanji
        </Link>

        <Link
          href="/kanji/add"
          className={`${navLink} ${
            pathname === "/kanji/add" ? "font-bold text-blue-600" : ""
          }`}
        >
          Add Kanji
        </Link>

        <Link
          href="/stats"
          className={`${navLink} ${
            pathname === "/stats" ? "font-bold text-blue-600" : ""
          }`}
        >
          Statistics
        </Link>
      </div>
    </nav>
  );
}
