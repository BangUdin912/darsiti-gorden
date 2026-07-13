import { supabase } from "./supabaseClient";

export async function uploadImage(file: File) {
  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("gallery")
    .upload(fileName, file);

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  const { data: publicUrl } = supabase.storage
    .from("gallery")
    .getPublicUrl(fileName);

  return publicUrl.publicUrl;
}