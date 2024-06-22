export interface UserModel extends userSmallModel {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface userSmallModel {
  _id?: string;
  username: string;
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
