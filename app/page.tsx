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



export default function Home() {
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

  const [kanji, setKanji] = useState("");
  const [meaning, setMeaning] = useState("");
  const [onyomi, setOnyomi] = useState("");
  const [kunyomi, setKunyomi] = useState("");
  const [examples, setExamples] = useState("");
  const [study_day, setStudyDay] = useState(1);


  
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
    filteredData.forEach((row)=>{
      for (let i = 0; i  <= row.difficulty_score; i++) {
            // Duplicate the row in the weighted array.
            // More difficult kanji appear multiple times,
            // making them more likely to be selected.
            weighted.push(row); 
      }; // end for
    }); // end forEach

    return weighted;
  }

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
      filteredData.forEach((row,index)=>{

        if (row.id === selectedRow.id) {
            filteredIndex = index;
        }

      
      });

    } while (filteredIndex === currentIndex);

    return filteredIndex;
  }

  // Moves to the next kanji
  // Picks a random kanji based on a weighted array
  const nextKanji = () =>{

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
        review_count: newReviewCount
      })
      .eq("id", currentKanji.id);

      await fetchData()

      nextKanji()

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
    const newReviewCount = currentKanji.review_count +1;

    const newDifficultyScore = currentKanji.difficulty_score+1;



    const { data, error } = await supabase
        .from("kanji")
        .update({
          difficulty_score:newDifficultyScore,
          review_count:newReviewCount
        })
        .eq("id",currentKanji.id);

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

      <p>Reviews : {currentKanji.review_count}</p>
  <p>Difficulty : {currentKanji.difficulty_score}</p>

  <br/> <button className="border rounded px-4 py-2 m-2" onClick=
  {easyKanji}>
   --Easy--
  </button>
    {/*<br/>*/}
  <button className="border rounded px-4 py-2 m-2" onClick={difficultKanji}>
    --Difficult--
  </button>
  <br/>
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