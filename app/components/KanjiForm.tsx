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

  onSubmit: () => void;
  buttonVariant: string;
  buttonText: string;
};

export default function KanjiForm({
  kanji,
  meaning,
  onyomi,
  kunyomi,
  examples,
  study_day,
  setKanji,
  setMeaning,
  setOnyomi,
  setKunyomi,
  setExamples,
  setStudyDay,
  buttonText,
  buttonVariant,
  onSubmit,
}: Props) {
  const colors = {
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
  };
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4">
        <label className="font-semibold">Kanji</label>
        <input
          type="text"
          value={kanji}
          onChange={(e) => setKanji(e.target.value)}
          className="border border-gray-400 p-2"
        />

        <label className="font-semibold">Meaning</label>
        <input
          type="text"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          className="border border-gray-400 p-2"
        />

        <label className="font-semibold">Onyomi</label>
        <input
          type="text"
          value={onyomi}
          onChange={(e) => setOnyomi(e.target.value)}
          className="border border-gray-400 p-2"
        />

        <label className="font-semibold">Kunyomi</label>
        <input
          type="text"
          value={kunyomi}
          onChange={(e) => setKunyomi(e.target.value)}
          className="border border-gray-400 p-2"
        />

        <label className="font-semibold">Examples</label>
        <textarea
          value={examples}
          onChange={(e) => setExamples(e.target.value)}
          className="border border-gray-400 p-2"
        />

        <label className="font-semibold">Study Day</label>
        <select
          value={study_day}
          onChange={(e) => setStudyDay(Number(e.target.value))}
          className="border border-gray-400 p-2"
        >
          <option value={1}>Day 1</option>
          <option value={2}>Day 2</option>
          <option value={3}>Day 3</option>
        </select>
      </section>
      <button
        onClick={onSubmit}
        className={`mt-6 w-full cursor-pointer rounded  p-3 text-white hover:bg-sky-600 transition-colors  ${colors[buttonVariant]}`}
      >
        {buttonText}
      </button>
    </>
  );
}
