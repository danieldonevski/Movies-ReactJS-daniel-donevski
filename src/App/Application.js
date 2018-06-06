import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Routing from "./Routing";
import { BrowserRouter } from "react-router-dom";
import { Header } from "../Components/Header";
import MoviesMockAPI from "../API/MoviesMockAPI";
import UsersMockAPI from "../API/UsersMockAPI";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const styles = {
  backgroundColor: "#eeeeee"
};

export default class Application extends Component {
  onLogout = () => {
    UsersMockAPI.logout();
  };

  render() {
    //UsersMockAPI.seedAdmin();
    MoviesMockAPI.seed();

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
