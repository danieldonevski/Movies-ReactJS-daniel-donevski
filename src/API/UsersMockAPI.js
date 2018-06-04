import UserModel from "./UserModel";
import NotesMockAPI from "./NotesMockAPI";

export default class UsersMockAPI {
  static isAuthenticated() {
    return UsersMockAPI.getLoggedUserID() !== "undefined" ? true : false;
  }

  static generateId() {
    return Math.floor(Math.random() * (10001 - 1 + 1)) + 1;
  }

  /**
   *
   */
  static getLoggedUserID() {
    return localStorage.getItem("logged-id");
  }

  /**
   *
   */
  static seedAdmin() {
    let admin = {
      username: "god",
      password: "adminpass",
      isAdmin: "Y"
    };

    let users = JSON.parse(localStorage.getItem("users"));

    if (!users) {
      users = [];
    }

    let doesExist = users.find(u => u.username === "god" && u.isAdmin === "Y");

    if (!doesExist) {
      users.push(admin);

      let usersJSON = JSON.stringify(users);
      localStorage.setItem("users", usersJSON);
    }
  }

  /**
   *
   */
  static getAll() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let users = localStorage.getItem("users");
        users = JSON.parse(users);

        if (!users || users.length === 0) {
          resolve([]);
        } else {
          resolve(users);
        }
      }, 1000);
    });
  }

  /**
   *
   */
  static login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let users = JSON.parse(localStorage.getItem("users"));

        let currentUser = users.find(
          u => u.username === username && u.password === password
        );

        if (currentUser) {
          localStorage.setItem("logged-id", currentUser.id);
          localStorage.setItem("is-admin", currentUser.isAdmin);
          resolve(currentUser);
        } else {
          reject("Wrong username or password.");
        }
      }, 1500);
    });
  }

  /**
   *
   */
  static logout() {
    localStorage.setItem("logged-id", undefined);
    localStorage.setItem("is-admin", undefined);
  }

  /**
   *
   */
  static register(user) {
    return new Promise((resolve, reject) => {
      let users = JSON.parse(localStorage.getItem("users"));

      if (!users) {
        users = [];
      }

      console.log("$$");
      console.log(user);
      //let doesExist = users.find(u => u.username === user.username);
      let doesExist = users.find(u => u.id === user.id);
      console.log(doesExist);
      console.log("$$");

      if (!doesExist) {
        user.id = UsersMockAPI.generateId();

        users.push(user);
        let usersJSON = JSON.stringify(users);
        localStorage.setItem("users", usersJSON);

        resolve();
      } else {
        let index = users.findIndex(u => u.id === user.id);

        users[index] = user;

        let jsonUsers = JSON.stringify(users);
        localStorage.setItem("users", jsonUsers);
        resolve();
        //reject();
      }
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let users = JSON.parse(localStorage.getItem("users"));
        let index = users.findIndex(n => n.id === id);
        users.splice(index, 1);

        let jsonUsers = JSON.stringify(users);
        localStorage.setItem("users", jsonUsers);

        NotesMockAPI.deleteByAuthorId(id);
        resolve();
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let users = localStorage.getItem("users");
        let jsonUsers = JSON.parse(users);

        let result = jsonUsers.find(n => n.id == id);

        resolve(result);
      }, 1000);
    });
  }

  static isLoggedUserAdmin() {
    return localStorage.getItem("is-admin");
  }

  static IsAdmin() {
    return UsersMockAPI.isLoggedUserAdmin() === "Y" ? true : false;
  }
}
