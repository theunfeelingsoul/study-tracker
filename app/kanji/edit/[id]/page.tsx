"use client";
import KanjiForm from "@/app/components/KanjiForm";
import { updateKanji, getKanji } from "@/app/services/kanji";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteKanji } from "@/app/services/kanji";
import Navigation from "@/app/components/Navigation";
import { getStudyDays, type StudyDay } from "@/app/services/studyDays";

export default function KanjiEditPage() {
  // constants
  const params = useParams();
  const [kanji, setKanji] = useState("");
  const [meaning, setMeaning] = useState("");
  const [onyomi, setOnyomi] = useState("");
  const [kunyomi, setKunyomi] = useState("");
  const [examples, setExamples] = useState("");
  const [study_day, setStudyDay] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [studyDays, setStudyDays] = useState<StudyDay[]>([]);
  const [loadingStudyDays, setLoadingStudyDays] = useState(true);

  useEffect(() => {
    async function loadKanji() {
      const data = await getKanji(Number(params.id));

      if (!data) {
        setLoading(false);
        return;
      }

      setKanji(data.kanji);
      setMeaning(data.meaning);
      setOnyomi(data.onyomi);
      setKunyomi(data.kunyomi);
      setExamples(data.examples);
      setStudyDay(data.study_day_id ?? 1);
      setLoading(false);
    }
    loadKanji();
  }, [params.id]);

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

  const saveChanges = async () => {
    const { error } = await updateKanji(Number(params.id), {
      kanji,
      meaning,
      onyomi,
      kunyomi,
      examples,
      study_day_id: study_day,
    });

    if (error) {
      console.error("Failed to update kanji:", error);
      alert("Update failed");
      return;
    }

    router.replace(`/kanji/${params.id}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="w-full max-w-2xl mx-auto p-4">
      <Navigation />
      <h1 className="text-3xl font-bold mb-4 border-b-1 border-gray-300">
        Edit {kanji}
      </h1>

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
        buttonText="Update Kanji"
        onSubmit={saveChanges}
        buttonVariant="green"
        studyDays={studyDays}
        disabled={loadingStudyDays || studyDays.length === 0}
      />
    </main>
  );
}
