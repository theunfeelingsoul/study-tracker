"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Toast from "@/app/components/Toast";
import Navigation from "@/app/components/Navigation";
import { getStudyDays, type StudyDay } from "@/app/services/studyDays";

type Row = {
  id: number;
  kanji: string;
  meaning: string;
  onyomi: string;
  kunyomi: string;
  examples: string;
  study_day_id: number | null;
  difficulty_score: number;
  review_count: number;
};

export default function KanjiList() {
  const [data, setData] = useState<Row[]>([]);
  const [studyDays, setStudyDays] = useState<StudyDay[]>([]);
const [sortBy, setSortBy] = useState<"id" | "studyDay" | "kanji">("id");
const [search, setSearch] = useState("");
  const searchParams = useSearchParams();

const filteredData = data
  .filter((row) => {
    const query = search.trim().toLowerCase();

    if (!query) return true;

    const dayName =
      studyDays.find((day) => day.id === row.study_day_id)?.name ?? "Unassigned";

    return [
      row.kanji,
      row.meaning,
      row.onyomi,
      row.kunyomi,
      row.examples,
      dayName,
      String(row.id),
    ].some((value) => value.toLowerCase().includes(query));
  })
  .sort((a, b) => {
    if (sortBy === "studyDay") {
      const dayA =
        studyDays.find((day) => day.id === a.study_day_id)?.name ?? "Unassigned";
      const dayB =
        studyDays.find((day) => day.id === b.study_day_id)?.name ?? "Unassigned";

      const comparison = dayA.localeCompare(dayB);

      return comparison !== 0 ? comparison : a.id - b.id;
    }

    if (sortBy === "kanji") {
      return a.kanji.localeCompare(b.kanji, "ja");
    }

    return a.id - b.id;
  });

  const deleted = searchParams.get("deleted");
  const fetchData = async () => {
    const { data, error } = await supabase
      .from("kanji")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
    } else {
      setData(data);
    }
  };

  useEffect(() => {
    fetchData();

    const loadStudyDays = async () => {
      try {
        const days = await getStudyDays();
        setStudyDays(days);
      } catch (error) {
        console.error("Failed to load study days:", error);
      }
    };

    loadStudyDays();
  }, []);

  return (
    <main className="w-full max-w-2xl mx-auto p-4">
      <Navigation />
      <h1 className="text-2xl font-bold mb-4">Kanji List</h1>
      {deleted && (
        <Toast message="Kanji deleted successfully." type="success" />
      )}

      <table className="w-full border-collapse">
        <thead className="border-b">
          <tr>
            <th className="text-left p-2">Kanji</th>
            <th className="text-left p-2">Meaning</th>
            <th className="text-left p-2 hidden md:table-cell">Onyomi</th>
            <th className="text-left p-2 hidden md:table-cell">Kunyomi</th>
            <th className="text-left p-2">Day</th>
            <th className="text-left p-2">Edit</th>
            <th className="text-left p-2">View</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-b border-gray-700 hover:bg-gray-800"
            >
              <td className="p-2 font-semibold">{row.kanji}</td>
              <td className="p-2">{row.meaning}</td>
              <td className="p-2 hidden md:table-cell">{row.onyomi}</td>
              <td className="p-2 hidden md:table-cell">{row.kunyomi}</td>
              <td className="p-2">
                {studyDays.find(
                  (day) => Number(day.id) === Number(row.study_day_id),
                )?.name ?? "Unassigned"}
              </td>
              <td className="p-2">
                <Link href={`/kanji/edit/${row.id}`} className="underline">
                  Edit
                </Link>
              </td>
              <td className="p-2">
                <Link href={`/kanji/${row.id}`} className="underline">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
