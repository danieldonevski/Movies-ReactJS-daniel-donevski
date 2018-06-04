import React, { Component } from "react";
import UsersMockAPI from "../API/UsersMockAPI";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      hasError: false,
      isAdmin: "N"
    };
  }

  onPropChange(event) {
    event.persist();

    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();

    if (!this.state.username || !this.state.password) {
      return;
    }

    UsersMockAPI.register(this.state)
      .then(() => {
        this.props.history.push("/login");
      })
      .catch(() => {
        this.setState({
          hasError: true
        });
      });
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
            {this.state.hasError ? (
              <p className="text-danger">Username taken.</p>
            ) : (
              ""
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.onPropChange.bind(this)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    );
  }
}
