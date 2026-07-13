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
  data: Row[];
};

export default function KanjiList({ data }: Props) {
	return(
		<div>
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
			))} // end map.()
		</div>
	);
}

