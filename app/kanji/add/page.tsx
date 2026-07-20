"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import KanjiForm from "@/app/components/KanjiForm";
import { useRouter } from "next/navigation";

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

// const fetchData = async () => {
//   const { data, error } = await supabase.from("kanji").select("*");

//   if (error) {
//     console.error(error);
//   } else {
//     setData(data);
//   }
// };

// useEffect(() => {
//   fetchData();
// }, []);

export default function AddKanjiPage() {
  const [kanji, setKanji] = useState("");
  const [meaning, setMeaning] = useState("");
  const [onyomi, setOnyomi] = useState("");
  const [kunyomi, setKunyomi] = useState("");
  const [examples, setExamples] = useState("");
  const [study_day, setStudyDay] = useState(1);
  const router = useRouter();

  const saveKanji = async () => {
    const { data, error } = await supabase
      .from("kanji")
      .insert([
        {
          kanji,
          meaning,
          onyomi,
          kunyomi,
          examples,
          study_day,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      alert("Failed to save kanji");
      return;
    }

    // alert("Kanji saved!");
    router.push(`/kanji/${data.id}`);
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Add New Kanji</h1>
      <KanjiForm
        kanji={kanji}
        meaning={meaning}
        onyomi={onyomi}
        kunyomi={kunyomi}
        examples={examples}
        study_day={study_day}
        setKanji={setKanji}
        setMeaning={setMeaning}
        setOnyomi={setOnyomi}
        setKunyomi={setKunyomi}
        setExamples={setExamples}
        setStudyDay={setStudyDay}
        buttonText="Save Kanji"
        onSubmit={saveKanji}
      />

      <button
        onClick={saveKanji}
        className="border rounded mt-5 p-4 w-full cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors"
      >
        Save Kanji
      </button>
    </main>
  );
}
