"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

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

export default function KanjiDetailPage() {
  const params = useParams();
  const [kanji, setKanji] = useState<Row | null>(null);
  const fetchData = async () => {
    const { data, error } = await supabase
      .from("kanji")
      .select("*")
      .eq("id", Number(params.id))
      .single();

    if (error) {
      console.error(error);
    } else {
      setKanji(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!kanji) {
    return (
      <main className="w-full max-w-2xl mx-auto p-4">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="w-full max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kanji Detail</h1>

      <div className="border p-4 mb-4">
        <p>
          <strong>Kanji:</strong> {kanji.kanji}
        </p>
        <p>
          <strong>Meaning:</strong> {kanji.meaning}
        </p>
        <p>
          <strong>Onyomi:</strong> {kanji.onyomi}
        </p>
        <p>
          <strong>Kunyomi:</strong> {kanji.kunyomi}
        </p>
        <p>
          <strong>Examples:</strong> {kanji.examples}
        </p>
        <p>
          <strong>Study Day:</strong> {kanji.study_day}
        </p>
        <p>
          <strong>Difficulty Score:</strong> {kanji.difficulty_score}
        </p>
        <p>
          <strong>Review Count:</strong> {kanji.review_count}
        </p>
      </div>
    </main>
  );
}
