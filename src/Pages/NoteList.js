import React, { Component } from "react";
import Note from "../Pages/Note";
import NotesMockAPI from "../API/NotesMockAPI";
import UsersMockAPI from "../API/UsersMockAPI";

const styles = {
  "background-color": "lightgray"
};

export default class NoteList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      ready: false,
      authorId: UsersMockAPI.getLoggedUserID(),
      isAdmin: UsersMockAPI.IsAdmin()
    };
  }

  componentDidMount() {
    console.log(this.state.isAdmin);
    this.state.isAdmin
      ? NotesMockAPI.getAll().then(dbNotes => {
          console.log("admin");
          this.setState({
            notes: dbNotes,
            ready: true
          });
        })
      : NotesMockAPI.getByAuthorId(this.state.authorId).then(dbNotes => {
          this.setState({
            notes: dbNotes,
            ready: true
          });
        });
  }

  deleteNote(id) {
    this.setState({
      ready: false
    });

    NotesMockAPI.delete(id).then(() => {
      NotesMockAPI.getAll().then(dbNotes => {
        this.setState({
          notes: dbNotes
        });
      });
    });
  }

  checkNote(id) {
    this.setState({
      ready: false
    });

    NotesMockAPI.getById(id).then(dbNotes => {
      this.setState({
        notes: dbNotes
      });
    });

    //this.state.notes.status = "Checked";

    NotesMockAPI.save(this.state.notes).then(() => {
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

    if (this.state.ready) {
      return (
        <div className="note-list-wrapper" style={styles}>
          <div>
            {this.state.notes.map(note => {
              return (
                <Note
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  description={note.description}
                  creationDate={note.creationDate}
                  creator={note.authorId}
                  dateFinished={note.dateFinished}
                  status={note.status == 1 ? " Checked" : " Unchecked"}
                  deleteNoteFunc={this.deleteNote.bind(this)}
                  checkNoteFunc={this.checkNote.bind(this)}
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <img src="https://loading.io/spinners/gear/index.config-gear-loading-icon.gif" />
        </div>
      );
    }
  }
}
