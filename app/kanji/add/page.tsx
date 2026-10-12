"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import KanjiForm from "@/app/components/KanjiForm";
import { useRouter } from "next/navigation";
import Navigation from "@/app/components/Navigation";

import { getStudyDays, type StudyDay } from "@/app/services/studyDays";

export default function AddKanjiPage() {
  const [kanji, setKanji] = useState("");
  const [meaning, setMeaning] = useState("");
  const [onyomi, setOnyomi] = useState("");
  const [kunyomi, setKunyomi] = useState("");
  const [examples, setExamples] = useState("");
  const [study_day, setStudyDay] = useState(1);
  const router = useRouter();
  const [studyDays, setStudyDays] = useState<StudyDay[]>([]);
  const [loadingStudyDays, setLoadingStudyDays] = useState(true);

  useEffect(() => {
    async function loadStudyDays() {
      setLoadingStudyDays(true);

      try {
        const days = await getStudyDays();
        setStudyDays(days);
      } catch (error) {
        console.error("Failed to load study days:", error);
        alert("Could not load study days. Please refresh the page.");
      } finally {
        setLoadingStudyDays(false);
      }
    }

    loadStudyDays();
  }, []);

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
          study_day_id: study_day,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Failed to save kanji:", error);
      alert("Failed to save kanji");
      return;
    }

    router.push(`/kanji/${data.id}`);
  };

  return (
    <main className="w-full max-w-2xl mx-auto p-4">
      <Navigation />
      <h1 className="text-3xl font-bold mb-4">Add New Kanji</h1>
      <KanjiForm
        kanji={kanji}
        meaning={meaning}
        onyomi={onyomi}
        kunyomi={kunyomi}
        examples={examples}
        study_day={study_day}
        studyDays={studyDays}
        setKanji={setKanji}
        setMeaning={setMeaning}
        setOnyomi={setOnyomi}
        setKunyomi={setKunyomi}
        setExamples={setExamples}
        setStudyDay={setStudyDay}
        buttonText={loadingStudyDays ? "Loading Study Days..." : "Add Kanji"}
        onSubmit={saveKanji}
        buttonVariant="blue"
        disabled={loadingStudyDays || studyDays.length === 0}
      />
    </main>
  );
}
