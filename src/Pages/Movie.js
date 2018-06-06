import React, { Component } from "react";
import "../Pages/Movie.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class Movie extends Component {
  constructor(props) {
    super(props);
  }

  deleteMovie() {
    this.props.deleteMovieFunc(this.props.id);
  }

  editMovie() {
    this.props.history.push("/add-movie/" + this.props.id);
  }

  render() {
    return (
      <div className="movie-holder col-md-3">
        <span
          className="glyphicon glyphicon-pencil edit-icon"
          onClick={this.editMovie.bind(this)}
        >
          {" "}
          Edit{" "}
        </span>
        <span
          className="glyphicon glyphicon-pencil delete-icon"
          onClick={this.deleteMovie.bind(this)}
        >
          {" "}
          Delete{" "}
        </span>
        <div className="movie-title">
          <span className="key">Title: </span>
          {this.props.title}
        </div>
        <hr />
        <div className="movie-description">
          <span className="key">Description: </span>
          {this.props.description}
        </div>
        <hr />
        <div className="movie-description">
          <span className="key">Creator: </span>
          {this.props.creator}
        </div>
        <hr />
        <div className="movie-creation-date">
          <span className="key">Creation Date:</span>
          {this.props.creationDate}
        </div>
        <hr />
        <div className="movie-creation-date">
          <span className="key">Date Finished:</span>
          {this.props.dateFinished}
        </div>
        <hr />
        <div className="movie-creation-date">
          <span className="key">Status:</span>
          {this.props.status}
        </div>
      </div>
    );
  }
}

export default withRouter(Movie);

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  dateFinished: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  deleteMovieFunc: PropTypes.func.isRequired,
  checkMovieFunc: PropTypes.func.isRequired
};
