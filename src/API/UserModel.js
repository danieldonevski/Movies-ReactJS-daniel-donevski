export default class UserModel {
  constructor(username, password, id, isAdmin) {
    this.username = username;
    this.password = password;
    this.id = id || null;
    this.isAdmin = isAdmin || null;
  }
}
