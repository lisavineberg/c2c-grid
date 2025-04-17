import { supabase } from "../db.js";

export async function readAnimalData() {
  // Fetch all rows from the Animals table
  const { data, error } = await supabase.from("Animals").select("*");

  if (error) {
    console.error("Error fetching animal data:", error);
    return [];
  }

  return data;
}
