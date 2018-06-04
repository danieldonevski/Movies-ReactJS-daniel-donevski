import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Message from "../Components/Message";
import NoteList from "../Pages/NoteList";
import Home from "../Pages/Home";
import AddNote from "../Pages/AddNote";
import Register from "../Pages/Register";
import Login from "../Pages/Login";

import UserList from "../Pages/UserList";
import Logout from "../Pages/Logout";
import AddUser from "../Pages/AddUser";

export default class Routing extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/notes-list" component={NoteList} />
          <Route exact path="/add-note" component={AddNote} />
          <Route exact path="/add-note/:id" component={AddNote} />
          <Route exact path="/users-list" component={UserList} />
          <Route exact path="/add-user" component={AddUser} />
          <Route exact path="/add-user/:id" component={AddUser} />
        </Switch>
      </div>
    );
  }
}
