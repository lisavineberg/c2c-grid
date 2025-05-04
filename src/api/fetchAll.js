import { supabase } from "../db.js";

export async function readAnimalData(userId) {
  const { data, error } = await supabase
    .from("Animals")
    .select()
    .or(
      userId
        ? `creator_id.eq.${userId},is_public.eq.${true}`
        : `is_public.eq.${true}`
    );
  if (error) {
    console.error("Error fetching animal data:", error);
    return [];
  }

  return data;
}
