"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Toast from "@/app/components/Toast";

type Row = {
  id: number;
  kanji: string;
  meaning: string;
  onyomi: string;
  kunyomi: string;
  examples: string;
  study_day: number;
  difficulty_score: number;
  review_count: number;
};

export default function KanjiList() {
  const [data, setData] = useState<Row[]>([]);
  const searchParams = useSearchParams();
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
  }, []);

  return (
    <main className="w-full max-w-2xl mx-auto p-4">
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
            <tr key={row.id} className="border-b hover:bg-gray-50">
              <td className="p-2 font-semibold">{row.kanji}</td>
              <td className="p-2">{row.meaning}</td>
              <td className="p-2 hidden md:table-cell">{row.onyomi}</td>
              <td className="p-2 hidden md:table-cell">{row.kunyomi}</td>
              <td className="p-2">{row.study_day}</td>
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
