export interface FriendModel {
  _id: string;
  userId: string;
  friendId: string;
  status: 'pending' | 'accepted' | 'rejected';
  username: string;
  imgUrl: string;
}
