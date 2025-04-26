import { supabase } from "../db";

export async function logOutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error logging out user:", error);
    return null;
  }

  return true;
}
