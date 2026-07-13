import { createClient } from "@/lib/supabase/client";
import type { Profile, UpdateProfile } from "@/types/profile";

const supabase = createClient();

export const profileService = {
  /**
   * ==================================
   * GET USER LOGIN
   * ==================================
   */
  async getUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) throw error;

    return user;
  },

  /**
   * ==================================
   * GET PROFILE
   * ==================================
   */
  async getProfile(): Promise<Profile | null> {
    const user = await this.getUser();

    if (!user) return null;

    let { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (error) throw error;

    /**
     * Jika profile belum ada
     * otomatis dibuat
     */
    if (!data) {
      const { error: insertError } = await supabase
        .from("profiles")
        .insert({
          id: user.id,
          full_name:
            user.user_metadata?.full_name ||
            "Administrator",
        });

      if (insertError) throw insertError;

      const result = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (result.error) throw result.error;

      data = result.data;
    }

    return data as Profile;
  },

  /**
   * ==================================
   * DATA USER UNTUK HEADER / SIDEBAR
   * ==================================
   */
  async getCurrentUser() {
    const user = await this.getUser();

    if (!user) return null;

    const profile = await this.getProfile();

    return {
      id: user.id,
      email: user.email ?? "",
      full_name:
        profile?.full_name ||
        user.user_metadata?.full_name ||
        "Administrator",
      avatar_url:
        profile?.avatar_url || "",
    };
  },

  /**
   * ==================================
   * UPDATE PROFILE
   * ==================================
   */
  async updateProfile(
    payload: UpdateProfile
  ): Promise<void> {
    const user = await this.getUser();

    if (!user) {
      throw new Error("User belum login.");
    }

    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          ...payload,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "id",
        }
      );

    if (error) throw error;
  },

  /**
   * ==================================
   * UPLOAD AVATAR
   * ==================================
   */
  async uploadAvatar(
    file: File
  ): Promise<string> {
    const user = await this.getUser();

    if (!user) {
      throw new Error("User belum login.");
    }

    const extension =
      file.name.split(".").pop();

    const fileName =
      `${user.id}-${Date.now()}.${extension}`;

    const filePath =
      `profiles/${fileName}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        upsert: true,
      });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    return publicUrl;
  },

  /**
   * ==================================
   * UPDATE AVATAR
   * ==================================
   */
  async updateAvatar(
    file: File
  ): Promise<string> {
    const url =
      await this.uploadAvatar(file);

    await this.updateProfile({
      avatar_url: url,
    });

    return url;
  },

  /**
   * ==================================
   * DELETE AVATAR
   * ==================================
   */
  async deleteAvatar(
    avatarUrl: string
  ): Promise<void> {
    if (!avatarUrl) return;

    const path =
      avatarUrl.split("/avatars/")[1];

    if (!path) return;

    const { error } = await supabase.storage
      .from("avatars")
      .remove([path]);

    if (error) throw error;
  },

  /**
   * ==================================
   * UPDATE EMAIL LOGIN
   * ==================================
   */
  async updateEmail(
    email: string
  ): Promise<void> {
    const { error } =
      await supabase.auth.updateUser({
        email,
      });

    if (error) throw error;
  },

  /**
   * ==================================
   * UPDATE PASSWORD LOGIN
   * ==================================
   */
  async updatePassword(
    password: string
  ): Promise<void> {
    const { error } =
      await supabase.auth.updateUser({
        password,
      });

    if (error) throw error;
  },

  /**
   * ==================================
   * LOGOUT
   * ==================================
   */
  async logout(): Promise<void> {
    const { error } =
      await supabase.auth.signOut();

    if (error) throw error;
  },
};