export interface Profile {
  id: string;

  full_name: string;

  avatar_url?: string;

  created_at: string;

  updated_at: string;
}

export interface UpdateProfile {
  full_name?: string;

  avatar_url?: string;
}