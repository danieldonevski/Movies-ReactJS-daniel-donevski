import React, { Component } from "react";
import UserModel from "../API/UserModel";
import MoviesMockAPI from "../API/MoviesMockAPI";
import UsersMockAPI from "../API/UsersMockAPI";

export default class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: new UserModel("", "", null, ""),
      ready: true
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;

    if (id) {
      this.setState({
        ready: false
      });

      UsersMockAPI.getById(id).then(dbUser => {
        this.setState({
          user: dbUser,
          ready: true
        });
      });
    }
  }

  onPropChange(event) {
    event.persist();
    this.setState({
      user: { ...this.state.user, [event.target.name]: event.target.value }
    });
  }

  onSave(event) {
    event.preventDefault();
    if (
      this.state.user.username === "" ||
      this.state.user.password === "" ||
      this.state.user.isAdmin === ""
    ) {
      return;
    }
    this.setState({
      ready: false
    });

    UsersMockAPI.register(this.state.user).then(() => {
      this.setState({
        ready: true
      });

      this.props.history.push("/users-list");
    });
  }

  render() {
    let isAuthenticated = UsersMockAPI.isAuthenticated();
    if (!isAuthenticated) {
      return <div>Error 404 Not Found</div>;
    }

    if (!this.state.ready) {
      return (
        <div>
          <img src="https://loading.io/spinners/fidget-spinner/lg.fidget-spinner.gif" />
        </div>
      );
    }

    return (
      <div
        className="col-md-12"
        style={{
          maxWidth: "350px",
          margin: "auto",
          paddingTop: "25px",
          paddingBottom: "25px"
        }}
      >
        <form onSubmit={this.onSave.bind(this)}>
          <div className="form-group">
            <label>Username: </label>
            <input
              className="form-control"
              name="username"
              value={this.state.user.username}
              onChange={this.onPropChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              className="form-control"
              name="password"
              value={this.state.user.password}
              onChange={this.onPropChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>IsAdmin: </label>
            <input
              className="form-control"
              name="isAdmin"
              value={this.state.user.isAdmin}
              onChange={this.onPropChange.bind(this)}
            />
          </div>
          <button type="submit" className="btn btn-default">
            Save
          </button>
        </form>
      </div>
    );
  }
}
