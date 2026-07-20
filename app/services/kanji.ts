import { supabase } from "@/lib/supabase";

export type Kanji = {
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

export type NewKanji = {
  kanji: string;
  meaning: string;
  onyomi: string;
  kunyomi: string;
  examples: string;
  study_day: number;
};

// ----------------------------
// GET ALL
// ----------------------------
export async function getKanjiList(): Promise<Kanji[]> {
  const { data, error } = await supabase.from("kanji").select("*").order("id");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

// ----------------------------
// GET ONE
// ----------------------------
export async function getKanji(id: number): Promise<Kanji | null> {
  const { data, error } = await supabase
    .from("kanji")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

// ----------------------------
// CREATE
// ----------------------------
export async function saveKanji(kanji: NewKanji) {
  return await supabase.from("kanji").insert([kanji]).select().single();
}

// ----------------------------
// UPDATE
// ----------------------------
export async function updateKanji(id: number, values: Partial<Kanji>) {
  return await supabase
    .from("kanji")
    .update(values)
    .eq("id", id)
    .select()
    .single();
}

// ----------------------------
// DELETE
// ----------------------------
export async function deleteKanji(id: number) {
  return await supabase.from("kanji").delete().eq("id", id);
}
