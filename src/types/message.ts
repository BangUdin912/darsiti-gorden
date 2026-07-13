export type MessageStatus =
  | "new"
  | "processing"
  | "done";

export interface Message {
  id: string;

  name: string;

  phone: string;

  email?: string;

  address?: string;

  productName?: string;

  service?: string;

  message: string;

  material?: string;

  status: MessageStatus;

  createdAt: string;

  updatedAt: string;
}

export interface CreateMessage {
  name: string;

  phone: string;

  email?: string;

  address?: string;

  productName?: string;

  service?: string;

    material?: string;

  message?: string;

  status?: MessageStatus;
}

export interface UpdateMessage extends Partial<CreateMessage> {
  status?: MessageStatus;
}