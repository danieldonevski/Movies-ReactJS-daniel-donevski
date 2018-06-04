import React, { Component } from "react";
import "./User.css";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class User extends Component {
  constructor(props) {
    super(props);
  }

  deleteUser = () => {
    this.props.deleteUserFunc(this.props.id);
  };

  editUser = () => {
    console.log(this.props);
    this.props.history.push("/add-user/" + this.props.id);
  };

  render() {
    return (
      <div className="user-holder">
        <span className="delete-icon" onClick={this.editUser.bind(this)}>
          {" "}
          E{" "}
        </span>
        <span className="delete-icon" onClick={this.deleteUser.bind(this)}>
          {" "}
          X{" "}
        </span>
        <div className="user-title">
          <span className="key">ID: </span>
          {this.props.id}
        </div>
        <hr />
        <div className="user-title">
          <span className="key">Username: </span>
          {this.props.username}
        </div>
        <hr />
        <div className="user-description">
          <span className="key">Password: </span>
          {this.props.password}
        </div>
        <hr />
        <div>
          <span className="key">IsAdmin:</span>
          {this.props.isAdmin}
        </div>
      </div>
    );
  }
}

export default withRouter(User);

User.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  isAdmin: PropTypes.string.isRequired,
  deleteUserFunc: PropTypes.func.isRequired
};
