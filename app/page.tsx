"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import KanjiList from "./components/KanjiList";
import KanjiForm from "./components/KanjiForm";
import StudyMode from "./components/StudyMode";

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

type Props = {
  kanji: string;
  meaning: string;
  onyomi: string;
  kunyomi: string;
  examples: string;
  study_day: number;

  setKanji: React.Dispatch<React.SetStateAction<string>>;
  setMeaning: React.Dispatch<React.SetStateAction<string>>;
  setOnyomi: React.Dispatch<React.SetStateAction<string>>;
  setKunyomi: React.Dispatch<React.SetStateAction<string>>;
  setExamples: React.Dispatch<React.SetStateAction<string>>;
  setStudyDay: React.Dispatch<React.SetStateAction<number>>;

  saveKanji: () => void;
};



export default function Home() {
  const [data, setData] = useState<Row[]>([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0); //array positions stored in react
  const [showAnswer, setShowAnswer] = useState(false);
  const [editMode, setEditMode] = useState(false);

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

  const editKanji = () => {
    // get the kanji data from current kanji
    // populate the form
    // get id from currentKanji.id
    // update database with currentKanji.id as identifier

    
  }


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



  type Props2 = {
  selectedDay: number;
  ShowAnswer: boolean;
  currentKanji: Row;
  setSelectedDay: React.Dispatch<React.SetStateAction<number>>;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setShowAnswer: React.Dispatch<React.SetStateAction<Boolean>>;
  nextKanji: () => void;
  easyKanji: () => void;
  difficultKanji: () => void;
};


  return (
    <main>
      <div style={{ textAlign: "center" }}>
        <StudyMode
          selectedDay = {selectedDay}
          showAnswer = {showAnswer}
          currentKanji = {currentKanji}
          setSelectedDay = {setSelectedDay}
          setCurrentIndex = {setCurrentIndex}
          setShowAnswer = {setShowAnswer}
          nextKanji = {nextKanji}
          easyKanji = {easyKanji}
          difficultKanji = {difficultKanji}
          editKanji = {editKanji}
       
         
        />
       

        

  
  ======================================================
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
          saveKanji={saveKanji}
          editMode={setEditMode}
        />

        <KanjiList data = {data}/>
        {/*end text align*/}
      </div>
    </main>
  );
}