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

export default function StudyMode() {
  // define the constants
  const [data, setData] = useState<Row[]>([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0); //array positions stored in react
  const [showAnswer, setShowAnswer] = useState(false);

  // Filter the kanji list based on the selected study day.
  // If "All Days" is selected (0), use every kanji.
  // Otherwise, create a new array containing only kanji from the chosen day.
  const filteredData =
    selectedDay === 0
      ? data
      : data.filter((row) => row.study_day === selectedDay);

  const currentKanji = filteredData[currentIndex];

  //   const [kanji, setKanji] = useState("");
  // const [meaning, setMeaning] = useState("");
  // const [onyomi, setOnyomi] = useState("");
  // const [kunyomi, setKunyomi] = useState("");
  // const [examples, setExamples] = useState("");
  // const [study_day, setStudyDay] = useState(1);

  /**
   * func. to buld weighted array
   * 1. create array accepting only row[] object
   * 2. use a foreach loop to push row records into array
   *
   * **/
  const buildWeightedArray = () => {
    //1.
    // initialize weighted array
    // Row[] is a typescript way saying only accept a Row kind of input
    const weighted: Row[] = [];

    //2.
    // create the weigted array
    filteredData.forEach((row) => {
      for (let i = 0; i <= row.difficulty_score; i++) {
        // Duplicate the row in the weighted array.
        // More difficult kanji appear multiple times,
        // making them more likely to be selected.
        weighted.push(row);
      } // end for
    }); // end forEach

    return weighted;
  };

  /**
   * func. to pic random kanji from weighted array
   **/
  const randKanji = () => {
    const weighted = buildWeightedArray();

    // do while loop
    let filteredIndex = currentIndex; // set the condition to stop the loop
    let weightedIndex = 0;
    do {
      // get a random index from the weighted array
      weightedIndex = Math.floor(Math.random() * weighted.length);

      const selectedRow = weighted[weightedIndex];
      filteredData.forEach((row, index) => {
        if (row.id === selectedRow.id) {
          filteredIndex = index;
        }
      });
    } while (filteredIndex === currentIndex);

    return filteredIndex;
  };

  // Moves to the next kanji
  // Picks a random kanji based on a weighted array
  const nextKanji = () => {
    // Only pick a new card if there is more than one choice.
    if (buildWeightedArray().length > 1) {
      setCurrentIndex(randKanji());
    }
    setShowAnswer(false);
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
        review_count: newReviewCount,
      })
      .eq("id", currentKanji.id);

    await fetchData();

    nextKanji();
  };

  // Marks a kanji as difficult.
  // TODO:
  // +1 review count
  // +1 difficulty score (no maximum)
  // Update Supabase
  // Refresh data
  // Show next kanji
  const difficultKanji = async () => {
    // and +1 to the review_cunt field or the current kanji being displayed
    const newReviewCount = currentKanji.review_count + 1;

    const newDifficultyScore = currentKanji.difficulty_score + 1;

    const { data, error } = await supabase
      .from("kanji")
      .update({
        difficulty_score: newDifficultyScore,
        review_count: newReviewCount,
      })
      .eq("id", currentKanji.id);

    if (error) {
      console.error(error);
      return;
    }

    await fetchData();

    nextKanji();
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

  return (
    <main className="w-full max-w-md mx-auto p-4">
      {/* title */}
      <h1 className="text-center text-4xl font-bold mb-4">Kanji Tracker ...</h1>

      {/* Kanji to be studied */}
      <section className="">
        <select
          value={selectedDay}
          onChange={(e) => {
            setSelectedDay(Number(e.target.value));
            setCurrentIndex(0);
            setShowAnswer(false);
          }}
          className="w-full border border-gray-400 p-2"
        >
          <option value={0}>All Days</option>
          <option value={1}>Day 1</option>
          <option value={2}>Day 2</option>
          <option value={3}>Day 3</option>
        </select>
      </section>

      <section className="text-center m-4">
        {currentKanji && (
          <div>
            <h2 className="text-8xl font-semibold">{currentKanji.kanji}</h2>
            <p>Study Day: {currentKanji.study_day}</p>
          </div>
        )}
      </section>
      <section className="mb-8">
        <button
          className="w-full rounded border px-4 py-3 "
          onClick={nextKanji}
        >
          Next Kanji
        </button>
      </section>
      <section className="mb-4">
        <button
          className="w-full rounded border px-4 py-3 "
          onClick={() => setShowAnswer(true)}
        >
          Show Answer
        </button>
      </section>

      {showAnswer && (
        <section className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
          <strong>Meaning:</strong>
          <div>{currentKanji.meaning}</div>
          <strong>Onyomi:</strong>
          <div>{currentKanji.onyomi}</div>
          <strong>Kunyomi:</strong>
          <div>{currentKanji.kunyomi}</div>
          <strong>Examples:</strong>
          <div>{currentKanji.examples}</div>
          <strong>Reviews : </strong>
          <div>{currentKanji.review_count}</div>
          <strong>Difficulty :</strong>
          <div>{currentKanji.difficulty_score}</div>
        </section>
      )}

      <section className="mt-6 grid grid-cols-2 gap-4">
        <button className="border rounded py-3" onClick={easyKanji}>
          Easy
        </button>
        <button className="border rounded py-3" onClick={difficultKanji}>
          Difficult
        </button>
      </section>
    </main>
  );
}
