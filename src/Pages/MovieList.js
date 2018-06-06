import React, { Component } from "react";
import Movie from "../Pages/Movie";
import MoviesMockAPI from "../API/MoviesMockAPI";
import UsersMockAPI from "../API/UsersMockAPI";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const styles = {
  "background-color": "rgb(238, 238, 238)"
};

export default class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      ready: false,
      authorId: UsersMockAPI.getLoggedUserID(),
      isAdmin: UsersMockAPI.IsAdmin()
    };
  }

  componentDidMount() {
    console.log(this.state.isAdmin);
    this.state.isAdmin
      ? MoviesMockAPI.getAll().then(dbMovies => {
          console.log("admin");
          this.setState({
            movies: dbMovies,
            ready: true
          });
        })
      : MoviesMockAPI.getByAuthorId(this.state.authorId).then(dbMovies => {
          this.setState({
            movies: dbMovies,
            ready: true
          });
        });
  }

  deleteMovie(id) {
    this.setState({
      ready: false
    });

    MoviesMockAPI.delete(id).then(() => {
      MoviesMockAPI.getAll().then(dbMovies => {
        this.setState({
          movies: dbMovies
        });
      });
    });
  }

  checkMovie(id) {
    this.setState({
      ready: false
    });

    MoviesMockAPI.getById(id).then(dbMovies => {
      this.setState({
        movies: dbMovies
      });
    });

    //this.state.movies.status = "Checked";

    MoviesMockAPI.save(this.state.movies).then(() => {
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

    if (this.state.ready) {
      return (
        <div className="movie-list-wrapper col-md-12" style={styles}>
          <div>
            {this.state.movies.map(movie => {
              return (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  description={movie.description}
                  creationDate={movie.creationDate}
                  creator={movie.authorId}
                  dateFinished={movie.dateFinished}
                  status={movie.status ? "Watched" : "Not Watched"}
                  deleteMovieFunc={this.deleteMovie.bind(this)}
                  checkMovieFunc={this.checkMovie.bind(this)}
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
