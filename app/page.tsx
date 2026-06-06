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

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("kanji").select("*");

      if (error) {
        console.error(error);
      } else {
        setData(data);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <h1>Kanji Tracker</h1>
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