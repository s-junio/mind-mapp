interface UserInfo {
  userName: String;
  avatar: String;
  email: String;
  firstName: String;
  lastName: String;
}

class UserManager {
  private static _instance: UserManager;
  private userName: String;
  private avatar: String;
  private email: String;
  private firstName: String;
  private lastName: String;

  private constructor({
    userName,
    avatar,
    email,
    firstName,
    lastName,
  }: UserInfo) {
    this.userName = userName;
    this.avatar = avatar;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public getUserInfo() {
    return {
      userName: this.userName,
    };
  }
}

export default UserManager;
