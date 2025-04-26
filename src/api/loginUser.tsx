import { supabase } from "../db.js";

export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error("Error logging in user:", error);
    return null;
  }

  return data;
}
