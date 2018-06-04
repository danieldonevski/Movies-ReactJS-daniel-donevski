import React, { Component } from "react";
import "../Pages/Note.css";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class Note extends Component {
  constructor(props) {
    super(props);
  }

  deleteNote() {
    this.props.deleteNoteFunc(this.props.id);
  }

  editNote() {
    this.props.history.push("/add-note/" + this.props.id);
  }

  render() {
    return (
      <div className="note-holder">
        <span className="glyphicon glyphicon-pencil delete-icon" onClick={this.editNote.bind(this)}>
          {" "}
          E{" "}
        </span>
        <span className="glyphicon glyphicon-pencil delete-icon" onClick={this.deleteNote.bind(this)}>
          {" "}
          X{" "}
        </span>
        <div className="note-title">
          <span className="key">Title: </span>
          {this.props.title}
        </div>
        <hr />
        <div className="note-description">
          <span className="key">Description: </span>
          {this.props.description}
        </div>
        <hr />
        <div className="note-description">
          <span className="key">Creator: </span>
          {this.props.creator}
        </div>
        <hr />
        <div className="note-creation-date">
          <span className="key">Creation Date:</span>
          {this.props.creationDate}
        </div>
        <hr />
        <div className="note-creation-date">
          <span className="key">Date Finished:</span>
          {this.props.dateFinished}
        </div>
        <hr />
        <div className="note-creation-date">
          <span className="key">Status:</span>
          {this.props.status}
        </div>
      </div>
    );
  }
}

export default withRouter(Note);

Note.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  dateFinished: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  deleteNoteFunc: PropTypes.func.isRequired,
  checkNoteFunc: PropTypes.func.isRequired
};
