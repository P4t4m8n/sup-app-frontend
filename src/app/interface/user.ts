export interface UserModel {
  _id: string;
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
