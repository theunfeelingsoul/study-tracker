"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { deleteKanji } from "@/app/services/kanji";
import DeleteModal from "@/app/components/DeleteModal";
import Navigation from "@/app/components/Navigation";

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
  const router = useRouter();
  const [showDelete, setShowDelete] = useState(false);
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

  const handleDelete = async () => {
    if (!kanji) return;

    const { error } = await deleteKanji(kanji.id);

    if (error) {
      alert("Delete failed");
      return;
    }

    setShowDelete(false);
    // router.push("/kanji");
    router.replace("/kanji?deleted=true");
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
      <Navigation />
      <h1 className="text-2xl font-bold mb-4">Kanji Detail</h1>

      <section className="flex gap-4 mb-6">
        <Link href="/kanji" className="underline">
          Back
        </Link>
        <Link
          href={`/kanji/edit/${kanji.id}`}
          className="underline text-blue-600"
        >
          Edit
        </Link>

        <button onClick={() => setShowDelete(true)}>Delete</button>
      </section>
      <section className="text-center m-4 text-8xl font-semibold">
        {kanji.kanji}
      </section>
      <table className="w-full border-collapse">
        <thead className="border-b">
          <tr>
            <th className="text-left p-2"></th>
            <th className="text-left p-2"></th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-2 font-semibold">Kanji:</td>
            <td className="p-2 ">{kanji.kanji}</td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-2 font-semibold">Meaning:</td>
            <td className="p-2">{kanji.meaning}</td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-2 font-semibold">Onyomi:</td>
            <td className="p-2">{kanji.onyomi}</td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-2 font-semibold">Kunyomi:</td>
            <td className="p-2">{kanji.kunyomi}</td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-2 font-semibold">Examples:</td>
            <td className="p-2">{kanji.examples}</td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-2 font-semibold">Study Day:</td>
            <td className="p-2">{kanji.study_day}</td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-2 font-semibold">Difficulty Score:</td>
            <td className="p-2">{kanji.difficulty_score}</td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-2 font-semibold">Review Count:</td>
            <td className="p-2">{kanji.review_count}</td>
          </tr>
        </tbody>
      </table>

      <DeleteModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />
    </main>
  );
}
