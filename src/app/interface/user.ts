export interface UserModel extends UserSmallModel {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserSmallModel {
  _id?: string;
  username: string;
  imgUrl: string;
}
export interface UserLogin {
  username: string;
  password: string;
}

export interface UserSignup {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}
