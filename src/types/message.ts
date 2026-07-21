export type MessageStatus =
  | "new"
  | "processing"
  | "done";

export interface NotificationMessage {
  id: string;
  name: string;
  productName?: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface Message {
  id: string;

  name: string;
  phone: string;

  email?: string;
  address?: string;

  productName?: string;
  service?: string;
  material?: string;

  message: string;

  status: MessageStatus;

  read: boolean;

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

  read?: boolean;
}

export interface UpdateMessage
  extends Partial<CreateMessage> {}