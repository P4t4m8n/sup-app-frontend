export interface MessageModel extends MessagesToCreate {
  _id: string;
  createAt: string;
}

export interface MessagesToCreate {
  message: string;
  userId: string;
  updatedAt?: number | null;
  chatId: string;
  senderUserName: string;
}
