import { MessageModel } from './message';
import { UserModel } from './user';

export interface ChatModel {
  _id?: string;
  users: UserModel[];
  message: MessageModel[];
}
