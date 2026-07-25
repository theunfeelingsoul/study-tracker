"use client";
import KanjiForm from "@/app/components/KanjiForm";
import { updateKanji, getKanji } from "@/app/services/kanji";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteKanji } from "@/app/services/kanji";

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

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this kanji?",
    );

    if (!confirmed) return;

    const { error } = await deleteKanji(kanji.id);

    if (error) {
      alert("Delete failed");
      return;
    }

    router.push("/kanji");
  };

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
      />
    </main>
  );
}
