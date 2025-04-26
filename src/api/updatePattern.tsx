import { supabase } from "../db.js";

export async function updatePattern(pattern) {
  console.log("Updating pattern with name:", pattern.patternId);
  const { data, error } = await supabase
    .from("Animals")
    .update({
      name: pattern.name,
      rows: pattern.rows,
      columns: pattern.columns,
      stored_colors: pattern.storedColors,
      cells: pattern.cells,
      creator_id: pattern.creatorId,
    })
    .eq("id", pattern.patternId);

  console.log("Update result:", data, error);
  if (error) {
    return null;
  }

  return data;
}
