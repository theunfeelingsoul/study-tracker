"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Row = {
  id: number;
  kanji: string;
  meaning: string;
  onyomi: string;
  kunyomi: string;
  examples: string;
  study_day: number;
};

export default function Home() {
  const [data, setData] = useState<Row[]>([]);

  const [kanji, setKanji] = useState("");
  const [meaning, setMeaning] = useState("");
  const [onyomi, setOnyomi] = useState("");
  const [kunyomi, setKunyomi] = useState("");
  const [examples, setExamples] = useState("");
  const [study_day, setStudyDay] = useState(1);

    const fetchData = async () => {
      const { data, error } = await supabase.from("kanji").select("*");

      if (error) {
        console.error(error);
      } else {
        setData(data);
      }
    };
  useEffect(() => {

    fetchData();
  }, []);

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
  await fetchData();
};

  return (
    <main>
      <h1>Kanji Tracker</h1>

      <h2>Add New Kanji</h2>

      <input
        type="text"
        placeholder="Kanji"
        value={kanji}
        onChange={(e) => setKanji(e.target.value)}
      />

      <br />

      <input
        type="text"
        placeholder="Meaning"
        value={meaning}
        onChange={(e) => setMeaning(e.target.value)}
      />

      <br />

      <input
        type="text"
        placeholder="Onyomi"
        value={onyomi}
        onChange={(e) => setOnyomi(e.target.value)}
      />

      <br />

      <input
        type="text"
        placeholder="Kunyomi"
        value={kunyomi}
        onChange={(e) => setKunyomi(e.target.value)}
      />

      <br />

      <input
        type="text"
        placeholder="Examples"
        value={examples}
        onChange={(e) => setExamples(e.target.value)}
      />

      <br />

      <input
        type="number"
        placeholder="Study Day"
        value={study_day}
        onChange={(e) => setStudyDay(Number(e.target.value))}
      />

      <br />
      <br />

      <button onClick={saveKanji}>
        Save Kanji
      </button>

      <hr />

      {data.map((row) => (
        <div key={row.id}>
          <h2>{row.kanji}</h2>
          <p>
            <strong>Meaning :</strong> {row.meaning}
          </p>  
          <p>
            <strong>Onyomi:</strong> {row.onyomi}
          </p>

          <p>
            <strong>Kunyomi:</strong> {row.kunyomi}
          </p>

          <p>
            <strong>Examples:</strong> {row.examples}
          </p>

          <p>
            <strong>Study Day:</strong> {row.study_day}
          </p>
          <hr/>
        </div>
      ))}
    </main>
  );
}