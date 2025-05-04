import { supabase } from "../db.js";

export async function insertPatternData(animal) {
  const { data: animalData, error: animalError } = await supabase
    .from("Animals")
    .insert([
      {
        name: animal.name,
        rows: animal.rows,
        columns: animal.columns,
        stored_colors: animal.storedColors, // Insert as JSON
        cells: animal.cells, // Insert as JSON
        creator_id: animal.creatorId,
      },
    ])
    .select();

  if (animalError) {
    console.error("Error inserting animal:", animalError);
    return;
  }
}
