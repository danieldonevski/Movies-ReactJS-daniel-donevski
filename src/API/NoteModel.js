export default class NoteModel {
  constructor(title, descr, id, authorID, status) {
    this.id = id || null;
    this.title = title;
    this.description = descr;
    this.authorId = authorID || null;
    this.creationDate = new Date().toString();
    this.status = status;
  }
}
