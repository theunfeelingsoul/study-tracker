import { supabase } from "@/lib/supabase";

export type StudyDay = {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
};

// GET ALL STUDY DAYS
export async function getStudyDays(): Promise<StudyDay[]> {
  const { data, error } = await supabase
    .from("study_days")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching study days:", error);
    throw error;
  }

  return data ?? [];
}

// CREATE A STUDY DAY
export async function createStudyDay(
  name: string,
  description: string | null = null,
) {
  const cleanName = name.trim();

  if (!cleanName) {
    throw new Error("Study day name cannot be empty.");
  }

  return await supabase
    .from("study_days")
    .insert([{ name: cleanName, description }])
    .select()
    .single();
}

// RENAME A STUDY DAY
export async function renameStudyDay(
  id: number,
  name: string,
  description: string | null,
) {
  const cleanName = name.trim();

  if (!cleanName) {
    throw new Error("Study day name cannot be empty.");
  }

  return await supabase
    .from("study_days")
    .update({
      name: cleanName,
      description,
    })
    .eq("id", id)
    .select()
    .single();
}

// DELETE A STUDY DAY
export async function deleteStudyDay(id: number) {
  return await supabase.from("study_days").delete().eq("id", id);
}
