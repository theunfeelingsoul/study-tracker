"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const [manageOpen, setManageOpen] = useState(false);
  const manageActive = pathname === "/kanji/add" || pathname === "/study-days";
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

        {/* <Link
          href="/study-days"
          className={`${navLink} ${
            pathname === "/study-days" ? "font-bold text-blue-600" : ""
          }`}
        >
          Study Days
        </Link> */}

        {/* <Link
          href="/kanji/add"
          className={`${navLink} ${
            pathname === "/kanji/add" ? "font-bold text-blue-600" : ""
          }`}
        >
          Add Kanji
        </Link> */}

        <Link
          href="/stats"
          className={`${navLink} ${
            pathname === "/stats" ? "font-bold text-blue-600" : ""
          }`}
        >
          Statistics
        </Link>
        <div className="relative">
          <button
            type="button"
            aria-expanded={manageOpen}
            aria-controls="manage-menu"
            onClick={() => setManageOpen((open) => !open)}
            className={`${navLink} ${
              manageActive ? "font-bold text-blue-600" : ""
            }`}
          >
            Manage <span aria-hidden="true">▾</span>
          </button>

          {manageOpen && (
            <div
              id="manage-menu"
              className="absolute left-0 top-full z-10 mt-2 min-w-44 rounded-md border border-gray-700 bg-gray-900 py-1 text-gray-100 shadow-lg"
            >
              <Link
                href="/kanji/add"
                onClick={() => setManageOpen(false)}
                className="block px-4 py-2 text-gray-100 hover:bg-gray-800 hover:text-white"
              >
                Add Kanji
              </Link>

              <Link
                href="/study-days"
                onClick={() => setManageOpen(false)}
                className="block px-4 py-2 text-gray-100 hover:bg-gray-800 hover:text-white"
              >
                Study Days
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
