import { supabase } from "../db.js";

export async function insertAnimalData(animal) {
  console.log("animal", animal);

  // Insert into Animals table
  const { data: animalData, error: animalError } = await supabase
    .from("Animals")
    .insert([
      {
        name: animal.name,
        rows: animal.rows,
        columns: animal.columns,
        stored_colors: animal.storedColors, // Insert as JSON
        cells: animal.cells, // Insert as JSON
      },
    ])
    .select();

  if (animalError) {
    console.error("Error inserting animal:", animalError);
    return;
  }
}
