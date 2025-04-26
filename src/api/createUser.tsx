import { supabase } from "../db.js";

export async function createUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    return null;
  }

  return data;
}
