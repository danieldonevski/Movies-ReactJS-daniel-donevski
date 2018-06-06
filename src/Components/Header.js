import React, { Component } from "react";
import { Link } from "react-router-dom";
import User from "../Pages/User";
import UsersMockAPI from "../API/UsersMockAPI";

export const Header = props => {
  let template = props.isAuthenticated ? (
    props.isAdmin ? (
      <nav className="navbar navbar-default">
        <ul className="nav navbar-nav header">
          <li>
            <Link to="/movies-list"> Movies </Link>
          </li>
          <li>
            <Link to="/add-movie">Add movie </Link>
          </li>
          <li>
            <Link to="/add-user"> Add User </Link>
          </li>
          <li>
            <Link to="/users-list"> Users </Link>
          </li>
          <li>
            <Link to="/login" onClick={props.eventLogout}>
              {" "}
              Logout{" "}
            </Link>
          </li>
        </ul>
      </nav>
    ) : (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li>
              <Link to="/movies-list"> Movies </Link>
            </li>
            <li>
              <Link to="/add-movie">Add movie </Link>
            </li>
            <li>
              <Link to="/login" onClick={props.eventLogout}>
                {" "}
                Logout{" "}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  ) : (
    <nav>
      <Link to="/login"> Login </Link>
      <Link to="/register"> Register </Link>
    </nav>
  );

  return template;
};

// export default class Header extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       users: [],
//       ready: false
//     };
//   }

//   render() {
//     let navbar;

//     if (
//       UsersMockAPI.getRoleById(UsersMockAPI.getLoggedUserID).isAdmin === "N"
//     ) {
//       navbar = (
//         <nav>
//           <Link to="/home"> Home </Link>
//           <Link to="/movies-list"> Movies </Link>
//           <Link to="/add-movie">Add movie </Link>
//           <Link to="/register"> Add User </Link>
//           <Link to="/users-list"> Users </Link>
//           <Link to="/logout"> Logout </Link>
//         </nav>
//       );
//     } else {
//       navbar = (
//         <nav>
//           <Link to="/login"> Login </Link>
//           <Link to="/register"> Register </Link>
//         </nav>
//       );
//     }

//     return <div>{navbar}</div>;
//   }
// }
