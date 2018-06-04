import React, { Component } from "react";
import NoteModel from "../API/NoteModel";
import NotesMockAPI from "../API/NotesMockAPI";
import UsersMockAPI from "../API/UsersMockAPI";

export default class AddNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: new NoteModel("", "", null, UsersMockAPI.getLoggedUserID()),
      ready: true
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;

    if (id) {
      this.setState({
        ready: false
      });

      NotesMockAPI.getById(id).then(dbNote => {
        this.setState({
          note: dbNote,
          ready: true
        });
      });
    }
  }

  onPropChange(event) {
    event.persist();
    this.setState({
      note: { ...this.state.note, [event.target.name]: event.target.value }
    });
  }

  onSave(event) {
    event.preventDefault();
    if (
      this.state.note.title === "" ||
      this.state.note.description === "" ||
      (this.state.note.status != "0" && this.state.note.status != "1")
    ) {
      return;
    }
    if (this.state.note.status == 1) {
      this.state.note.dateFinished = new Date().toString();
    } else {
      this.state.note.dateFinished = null;
    }
    this.setState({
      ready: false
    });
    NotesMockAPI.save(this.state.note).then(() => {
      this.setState({
        ready: true
      });

      this.props.history.push("/notes-list");
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
      <div>
        <form onSubmit={this.onSave.bind(this)}>
          <div className="form-group">
            <label>Title: </label>
            <input
              className="form-control"
              name="title"
              value={this.state.note.title}
              onChange={this.onPropChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              className="form-control"
              name="description"
              value={this.state.note.description}
              onChange={this.onPropChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Status: </label>
            <input
              type="number"
              min="0"
              max="1"
              className="form-control"
              name="status"
              value={this.state.note.status}
              onChange={this.onPropChange.bind(this)}
              placeholder="0 or 1"
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}
