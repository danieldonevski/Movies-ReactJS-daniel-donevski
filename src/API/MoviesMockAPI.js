import MovieModel from "./MovieModel";

export default class MoviesMockAPI {
  static generateId() {
    return Math.floor(Math.random() * (10001 - 1 + 1)) + 1;
  }

  static seed() {
    let movies = JSON.parse(localStorage.getItem("movies"));

    if (!movies || movies.length === 0) {
      let seedMovies = [
        new MovieModel("Title 1", "Test 1", MoviesMockAPI.generateId()),
        new MovieModel("Title 2", "Test 2", MoviesMockAPI.generateId()),
        new MovieModel("Title 3", "Test 3", MoviesMockAPI.generateId()),
        new MovieModel("Title 4", "Test 4", MoviesMockAPI.generateId()),
        new MovieModel("Title 5", "Test 5", MoviesMockAPI.generateId())
      ];

      let jsonMovies = JSON.stringify(seedMovies);
      localStorage.setItem("movies", jsonMovies);
    }
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let movies = localStorage.getItem("movies");
        let jsonMovies = JSON.parse(movies);

        let result = jsonMovies.find(n => n.id == id);

        resolve(result);
      }, 1000);
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let movies = localStorage.getItem("movies");
        movies = JSON.parse(movies);

        if (!movies || movies.length === 0) {
          resolve([]);
        } else {
          resolve(movies);
        }
      }, 1000);
    });
  }

  static getByAuthorId(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let allMovies = JSON.parse(localStorage.getItem("movies"));

        let result = allMovies.filter(n => n.authorId === id);

        resolve(result);
      }, 1000);
    });
  }

  static deleteByAuthorId(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let allMovies = JSON.parse(localStorage.getItem("movies"));

        let result = allMovies.filter(n => n.authorId != id);

        let jsonMovies = JSON.stringify(result);
        localStorage.setItem("movies", jsonMovies);

        resolve(result);
      }, 1000);
    });
  }

  static save(movie) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let allMovies = JSON.parse(localStorage.getItem("movies"));
        if (movie.id) {
          let index = allMovies.findIndex(n => n.id === movie.id);
          allMovies[index] = movie;
        } else {
          movie.id = MoviesMockAPI.generateId();
          allMovies.push(movie);
        }

        let jsonMovies = JSON.stringify(allMovies);
        localStorage.setItem("movies", jsonMovies);

        resolve();
      }, 1000);
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let movies = JSON.parse(localStorage.getItem("movies"));
        let index = movies.findIndex(n => n.id === id);
        movies.splice(index, 1);

        let jsonMovies = JSON.stringify(movies);
        localStorage.setItem("movies", jsonMovies);

        resolve();
      });
    });
  }
}
