import { supabase } from "../db.js";

export async function deletePattern(patternId: string, isPublic: boolean) {
  if (isPublic) return;
  const { data, error } = await supabase
    .from("Animals")
    .delete()
    .eq("id", patternId);

  console.log("deletePattern", patternId, data, error);

  if (error) {
    return null;
  }

  return data;
}
