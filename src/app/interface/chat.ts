import { MessageModel } from './message';
import { UserModel, userSmallModel } from './user';

export interface ChatModel {
  _id?: string;
  users: userSmallModel[];
  name: string;
  messages: MessageModel[];
}
