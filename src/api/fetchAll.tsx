import { supabase } from "../db.js";

// fetch any grids where either the userId matches the creator_id or the grid is public
export async function readAnimalData(userId: string) {
  const { data, error } = await supabase
    .from("Animals")
    .select()
    .or(userId ? `creator_id.eq.${userId}` : `is_public.eq.${true}`);
  if (error) {
    console.error("Error fetching animal data:", error);
    return [];
  }

  return data;
}
