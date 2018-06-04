import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Routing from "./Routing";
import { BrowserRouter } from "react-router-dom";
import { Header } from "../Components/Header";
import NotesMockAPI from "../API/NotesMockAPI";
import UsersMockAPI from "../API/UsersMockAPI";
import "bootstrap/dist/css/bootstrap.min.css";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

export default class Application extends Component {
  onLogout = () => {
    UsersMockAPI.logout();
  };

  render() {
    //UsersMockAPI.seedAdmin();
    NotesMockAPI.seed();

    let isAuthenticated = UsersMockAPI.isAuthenticated();

    let isAdmin = UsersMockAPI.IsAdmin();

    console.log(isAdmin);

    return (
      <div style={styles}>
        <Header
          isAdmin={isAdmin}
          eventLogout={this.onLogout}
          isAuthenticated={isAuthenticated}
        />
        <Routing />
      </div>
    );
  }
}
