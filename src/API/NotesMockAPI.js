import NoteModel from "./NoteModel";

export default class NotesMockAPI {
  static generateId() {
    return Math.floor(Math.random() * (10001 - 1 + 1)) + 1;
  }

  static seed() {
    let notes = JSON.parse(localStorage.getItem("notes"));

    if (!notes || notes.length === 0) {
      let seedNotes = [
        new NoteModel("Title 1", "Test 1", NotesMockAPI.generateId()),
        new NoteModel("Title 2", "Test 2", NotesMockAPI.generateId()),
        new NoteModel("Title 3", "Test 3", NotesMockAPI.generateId()),
        new NoteModel("Title 4", "Test 4", NotesMockAPI.generateId()),
        new NoteModel("Title 5", "Test 5", NotesMockAPI.generateId())
      ];

      let jsonNotes = JSON.stringify(seedNotes);
      localStorage.setItem("notes", jsonNotes);
    }
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let notes = localStorage.getItem("notes");
        let jsonNotes = JSON.parse(notes);

        let result = jsonNotes.find(n => n.id == id);

        resolve(result);
      }, 1000);
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let notes = localStorage.getItem("notes");
        notes = JSON.parse(notes);

        if (!notes || notes.length === 0) {
          resolve([]);
        } else {
          resolve(notes);
        }
      }, 1000);
    });
  }

  static getByAuthorId(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let allNotes = JSON.parse(localStorage.getItem("notes"));

        let result = allNotes.filter(n => n.authorId === id);

        resolve(result);
      }, 1000);
    });
  }

  static deleteByAuthorId(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let allNotes = JSON.parse(localStorage.getItem("notes"));

        let result = allNotes.filter(n => n.authorId != id);

        let jsonNotes = JSON.stringify(result);
        localStorage.setItem("notes", jsonNotes);

        resolve(result);
      }, 1000);
    });
  }

  static save(note) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let allNotes = JSON.parse(localStorage.getItem("notes"));
        if (note.id) {
          let index = allNotes.findIndex(n => n.id === note.id);
          allNotes[index] = note;
        } else {
          note.id = NotesMockAPI.generateId();
          allNotes.push(note);
        }

        let jsonNotes = JSON.stringify(allNotes);
        localStorage.setItem("notes", jsonNotes);

        resolve();
      }, 1000);
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let notes = JSON.parse(localStorage.getItem("notes"));
        let index = notes.findIndex(n => n.id === id);
        notes.splice(index, 1);

        let jsonNotes = JSON.stringify(notes);
        localStorage.setItem("notes", jsonNotes);

        resolve();
      });
    });
  }
}
