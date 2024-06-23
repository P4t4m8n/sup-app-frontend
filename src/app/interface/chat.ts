import { MessageModel } from './message';
import { UserModel, UserSmallModel } from './user';

export interface ChatModel {
  _id?: string;
  users: UserSmallModel[];
  name: string;
  messages: MessageModel[];
}
