import React, { Component } from "react";
import UsersMockAPI from "../API/UsersMockAPI";

export default class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      hasError: false,
      errorText: ""
    };
  }

  componentDidMount() {
    UsersMockAPI.logout(UsersMockAPI.getLoggedUserID());
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={this.onPropChange.bind(this)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.onPropChange.bind(this)}
            />
            {this.state.hasError ? (
              <p className="text-danger">{this.state.errorText}</p>
            ) : (
                ""
              )}
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}
