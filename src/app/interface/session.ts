export interface SessionModel {
  _id?: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
}
