import React, { Component } from "react";
import User from "../Pages/User";
import MoviesMockAPI from "../API/MoviesMockAPI";
import UsersMockAPI from "../API/UsersMockAPI";

const styles = {
  "background-color": "lightgray"
};

export default class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      ready: false
    };
  }

  componentDidMount() {
    UsersMockAPI.getAll().then(dbUsers => {
      this.setState({
        users: dbUsers,
        ready: true
      });
    });
  }

  deleteUser(id) {
    this.setState({
      ready: false
    });

    UsersMockAPI.delete(id).then(() => {
      UsersMockAPI.getAll().then(dbUsers => {
        this.setState({
          users: dbUsers,
          ready: true
        });
      });
    });
  }

  render() {
    let isAuthenticated = UsersMockAPI.isAuthenticated();
    if (!isAuthenticated) {
      return <div>Error 404 Not Found</div>;
    }

    if (this.state.ready) {
      return (
        <div className="user-list-wrapper" style={styles}>
          <div>
            {this.state.users.map(user => {
              return (
                <User
                  key={user.id}
                  id={user.id}
                  username={user.username}
                  password={user.password}
                  isAdmin={user.isAdmin}
                  deleteUserFunc={this.deleteUser.bind(this)}
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <img src="https://loading.io/spinners/fidget-spinner/lg.fidget-spinner.gif" />
        </div>
      );
    }
  }
}
