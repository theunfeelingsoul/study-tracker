"use client";
import KanjiForm from "@/app/components/KanjiForm";
import { updateKanji, getKanji } from "@/app/services/kanji";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
      setStudyDay(data.study_day);
      setLoading(false);
    }
    loadKanji();
  }, [params.id]);

  const saveChanges = async () => {
    const { error } = await updateKanji(Number(params.id), {
      kanji,
      meaning,
      onyomi,
      kunyomi,
      examples,
      study_day,
    });
    if (error) {
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
      />
    </main>
  );
}
