"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Row = {
  id: number;
  message: string;
};

export default function Home() {
  const [data, setData] = useState<Row[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("test").select("*");

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
      <h1>DB Test</h1>
      {data.map((row) => (
        <p key={row.id}>{row.message}</p>
      ))}
    </main>
  );
}