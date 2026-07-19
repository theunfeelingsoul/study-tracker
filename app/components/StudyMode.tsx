export default function StudyMode({
selectedDay,
showAnswer,
currentKanji,
setSelectedDay,
setCurrentIndex,
setShowAnswer,
nextKanji,
easyKanji,
difficultKanji,
editKanji,
}:Props2){

	return(

		<>
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
       <br/>
      <button className="border rounded px-4 py-2 m-2" onClick={editKanji}>
        --Edit--
      </button>
      <br/>
    </div>


  )}
		</>

		);

}