import { createClient } from "@supabase/supabase-js";
import type { Message, CreateMessage } from "@/types/message";

// ======================
// SUPABASE CLIENT
// ======================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// ======================
// MESSAGE SERVICE
// ======================

export const messageService = {
  /**
   * GET ALL
   */
  async getAll(): Promise<Message[]> {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("getAll:", error.message);
      return [];
    }

    return (data ?? []).map(mapMessage);
  },

  /**
   * GET RECENT
   */
  async getRecent(limit = 5): Promise<Message[]> {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("getRecent:", error.message);
      return [];
    }

    return (data ?? []).map(mapMessage);
  },

  /**
   * GET BY ID
   */
  async getById(id: string): Promise<Message | null> {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("getById:", error.message);
      return null;
    }

    return data ? mapMessage(data) : null;
  },

  /**
   * CREATE MESSAGE
   */
  async create(message: CreateMessage): Promise<Message> {
    const { data, error } = await supabase
      .from("messages")
      .insert({
        ...mapPayload(message),
        status: "new",
      })
      .select()
      .single();

    if (error) {
      console.error("create:", error.message);
      throw new Error(error.message);
    }

    return mapMessage(data);
  },

  /**
   * UPDATE
   */
  async update(
  id: string,
  payload: Partial<CreateMessage>
): Promise<Message> {
  const updateData = {
    ...mapPayload(payload),
    updated_at: new Date().toISOString(),
  };

  Object.keys(updateData).forEach((key) => {
    if (updateData[key as keyof typeof updateData] === undefined) {
      delete updateData[key as keyof typeof updateData];
    }
  });

  const { data, error } = await supabase
    .from("messages")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return mapMessage(data);
},

  /**
   * UPDATE STATUS
   */
  async updateStatus(
    id: string,
    status: Message["status"]
  ): Promise<Message> {
    const { data, error } = await supabase
      .from("messages")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return mapMessage(data);
  },

  async getNewMessages(): Promise<Message[]> {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("status", "new")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      return [];
    }

    return data.map(mapMessage);
  },

  async search(keyword: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(
`
name.ilike.%${keyword}%,
phone.ilike.%${keyword}%,
email.ilike.%${keyword}%,
address.ilike.%${keyword}%,
service.ilike.%${keyword}%,
product_name.ilike.%${keyword}%,
material.ilike.%${keyword}%
`
)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      return [];
    }

    return data.map(mapMessage);
  },

  /**
   * DELETE
   */
async delete(id: string): Promise<boolean> {
    const { error } = await supabase
        .from("messages")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("delete:", error.message);
        throw new Error(error.message);
    }

    return true;
},

  /**
   * TOTAL MESSAGE
   */
  async getCount(): Promise<number> {
    const { count, error } = await supabase
      .from("messages")
      .select("*", {
        count: "exact",
        head: true,
      });

    if (error) {
      console.error("getCount:", error.message);
      return 0;
    }

    return count ?? 0;
  },

  async getByStatus(
    status: Message["status"]
): Promise<Message[]> {

    const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("status", status)
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        console.error(error);
        return [];
    }

    return data.map(mapMessage);
},

async getByProduct(
    product: string
): Promise<Message[]> {

    const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("product_name", product)
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        return [];
    }

    return data.map(mapMessage);
},

async getByService(
    service: string
): Promise<Message[]> {

    const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("service", service)
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        return [];
    }

    return data.map(mapMessage);
},

  /**
   * TOTAL MESSAGE BERDASARKAN STATUS
   */
  async getCountByStatus(
    status: Message["status"]
  ): Promise<number> {
    const { count, error } = await supabase
      .from("messages")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", status);

    if (error) {
      console.error("getCountByStatus:", error.message);
      return 0;
    }

    return count ?? 0;
  },
};

/**
 * ======================
 * MAP DATABASE → MESSAGE
 * ======================
 */

type MessageRow = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  address: string | null;
  product_name: string | null;
  service: string | null;
  message: string | null;
  material: string | null;
  status: "new" | "processing" | "done";
  created_at: string;
  updated_at: string;
};

function mapMessage(row: MessageRow): Message {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email ?? undefined,
    address: row.address ?? undefined,
    productName: row.product_name ?? undefined,
    service: row.service ?? undefined,
    message: row.message ?? "",
    material: row.material ?? undefined,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * ======================
 * MAP MESSAGE → DATABASE
 * ======================
 */

function mapPayload(message: Partial<CreateMessage>) {
  return {
    name: message.name,
    phone: message.phone,
    email: message.email ?? null,
    address: message.address ?? null,
    product_name: message.productName ?? null,
    service: message.service ?? null,
    message: message.message ?? null,
    material: message.material ?? null,
  };
}