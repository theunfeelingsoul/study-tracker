"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

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

  const saveKanji = async () => {
    const { error } = await supabase.from("kanji").insert([
      {
        kanji,
        meaning,
        onyomi,
        kunyomi,
        examples,
        study_day,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Failed to save kanji");
      return;
    }

    alert("Kanji saved!");
    // await fetchData();
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold">Add New Kanji</h2>

      <input
        type="text"
        placeholder="Kanji"
        value={kanji}
        onChange={(e) => setKanji(e.target.value)}
        className="border border-gray-400 p-2"
      />

      <br />

      <label>Meaning</label>
      <br />
      <input
        type="text"
        placeholder="Meaning"
        value={meaning}
        onChange={(e) => setMeaning(e.target.value)}
        className="border border-gray-400 p-2"
      />

      <br />

      <input
        type="text"
        placeholder="Onyomi"
        value={onyomi}
        onChange={(e) => setOnyomi(e.target.value)}
        className="border border-gray-400 p-2"
      />

      <br />

      <input
        type="text"
        placeholder="Kunyomi"
        value={kunyomi}
        onChange={(e) => setKunyomi(e.target.value)}
        className="border border-gray-400 p-2"
      />

      <br />
      <label>Examples</label>
      <textarea
        value={examples}
        onChange={(e) => setExamples(e.target.value)}
        className="border border-gray-400 p-2"
      />

      <br />

      <select
        value={study_day}
        onChange={(e) => setStudyDay(Number(e.target.value))}
        className="border border-gray-400 p-2"
      >
        <option value={1}>Day 1</option>
        <option value={2}>Day 2</option>
        <option value={3}>Day 3</option>
      </select>

      <br />
      <br />

      <button onClick={saveKanji}>Save Kanji</button>

      <hr />
    </div>
  );
}
