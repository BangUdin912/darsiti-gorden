import { supabase } from "@/lib/supabaseClient";

const DEFAULT_BUCKET = "gallery";

export const storageService = {
  async upload(
    file: File,
    bucket: string = DEFAULT_BUCKET
  ) {
    const ext = file.name.split(".").pop() ?? "jpg";

    const fileName = `${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new Error(error.message);
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return {
      path: fileName,
      url: publicUrl,
    };
  },

  async remove(
    path: string,
    bucket: string = DEFAULT_BUCKET
  ) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      throw new Error(error.message);
    }
  },
};