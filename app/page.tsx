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
  difficulty_score: number;
  review_count: number;
};

const DifficultKanji = ()=>{

  currentKanji;

};


export default function Home() {
  const [data, setData] = useState<Row[]>([]);

  const [selectedDay, setSelectedDay] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0); //array positions stored in react
  const [showAnswer, setShowAnswer] = useState(false);


  const filteredData =
  selectedDay === 0
    ? data
    : data.filter((row) => row.study_day === selectedDay);

    const currentKanji = filteredData[currentIndex];

  const [kanji, setKanji] = useState("");
  const [meaning, setMeaning] = useState("");
  const [onyomi, setOnyomi] = useState("");
  const [kunyomi, setKunyomi] = useState("");
  const [examples, setExamples] = useState("");
  const [study_day, setStudyDay] = useState(1);

  // Next Kanji
  const nextKanji = () =>{

    if ((filteredData.length-1)==currentIndex) {
      setCurrentIndex(0)
    } else{
      
      setCurrentIndex(currentIndex+1);
    }
      setShowAnswer(false)

  };

// Marks a kanji as easy:
// +1 review count
// -1 difficulty score (minimum 0)
// Updates Supabase and moves to the next card
  const easyKanji = async () => {

    const newReviewCount = currentKanji.review_count + 1;

    let newDifficultyScore = currentKanji.difficulty_score;

    if (newDifficultyScore > 0) {
      newDifficultyScore--;
    }

    const { data, error } = await supabase
      .from("kanji")
      .update({
        difficulty_score: newDifficultyScore,
        review_count: newReviewCount
      })
      .eq("id", currentKanji.id);

      await fetchData()

      nextKanji()

  };

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
      <div style={{ textAlign: "center" }}>
        <h1 className="text-4xl font-bold">Kanji Tracker</h1>
        <br/>
        <select
          value={selectedDay}
          onChange={(e) => {
            setSelectedDay(Number(e.target.value));
            setCurrentIndex(0);
            setShowAnswer(false);
          }}
          className="border border-gray-400 p-2"
        >
          <option value={0}>All Days</option>
          <option value={1}>Day 1</option>
          <option value={2}>Day 2</option>
          <option value={3}>Day 3</option>
        </select>
        <br/>
        <br/>
        {currentKanji && (
          <div>
             <h2 className="text-2xl font-semibold">{currentKanji.kanji}</h2>
            <p>Study Day: {currentKanji.study_day}</p>
          </div>
        )}
  <br/>
  <button className="border rounded px-4 py-2 m-2" onClick={nextKanji}>
   --Next Button--
  </button>
    {/*<br/>*/}
  <button className="border rounded px-4 py-2 m-2" onClick={() => setShowAnswer(true)}>
    --Show Answer Button--
  </button>
  <br/>

  {showAnswer && (
    <div>
      <p><strong>Meaning:</strong> {currentKanji.meaning}</p>
      <p><strong>Onyomi:</strong> {currentKanji.onyomi}</p>
      <p><strong>Kunyomi:</strong> {currentKanji.kunyomi}</p>
      <p><strong>Examples:</strong> {currentKanji.examples}</p>
    </div>
  )}
  ======================================================
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
        <br/>
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

        <button onClick={saveKanji}>
          Save Kanji
        </button>
   
        <hr />
      </div>
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
        {/*end text align*/}
      </div>
    </main>
  );
}