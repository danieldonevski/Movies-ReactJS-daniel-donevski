import React, { Component } from "react";
import MovieModel from "../API/MovieModel";
import MoviesMockAPI from "../API/MoviesMockAPI";
import UsersMockAPI from "../API/UsersMockAPI";

export default class AddMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: new MovieModel("", "", null, UsersMockAPI.getLoggedUserID()),
      ready: true
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;

    if (id) {
      this.setState({
        ready: false
      });

      MoviesMockAPI.getById(id).then(dbMovie => {
        this.setState({
          movie: dbMovie,
          ready: true
        });
      });
    }
  }

  onCheckboxChange(event) {
    event.persist();
    this.setState({
      movie: { ...this.state.movie, [event.target.name]: event.target.checked }
    });
  }

  onPropChange(event) {
    event.persist();
    this.setState({
      movie: { ...this.state.movie, [event.target.name]: event.target.value }
    });
  }

  onSave(event) {
    event.preventDefault();
    if (
      this.state.movie.title === "" ||
      this.state.movie.description === "" ||
      (this.state.movie.status != "0" && this.state.movie.status != "1")
    ) {
      return;
    }
    if (this.state.movie.status == 1) {
      this.state.movie.dateFinished = new Date().toString();
    } else {
      this.state.movie.dateFinished = null;
    }
    this.setState({
      ready: false
    });
    MoviesMockAPI.save(this.state.movie).then(() => {
      this.setState({
        ready: true
      });

      this.props.history.push("/movies-list");
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
            <label>Title: </label>
            <input
              className="form-control"
              name="title"
              value={this.state.movie.title}
              onChange={this.onPropChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              className="form-control"
              name="description"
              value={this.state.movie.description}
              onChange={this.onPropChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Status: </label>
            <input
              type="checkbox"
              className="form-control"
              name="status"
              onChange={this.onCheckboxChange.bind(this)}
              defaultChecked={this.state.checked}
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
