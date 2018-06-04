import React, { Component } from "react";
import { Link } from "react-router-dom";
import User from "../Pages/User";
import UsersMockAPI from "../API/UsersMockAPI";

export const Header = props => {
  let template = props.isAuthenticated ? (
    props.isAdmin ? (
      <nav>
        <Link to="/notes-list"> Notes </Link>
        <Link to="/add-note">Add note </Link>
        <Link to="/add-user"> Add User </Link>
        <Link to="/users-list"> Users </Link>
        <Link to="/login" onClick={props.eventLogout}>
          {" "}
          Logout{" "}
        </Link>
      </nav>
    ) : (
      <nav>
        <Link to="/notes-list"> Notes </Link>
        <Link to="/add-note">Add note </Link>
        <Link to="/login" onClick={props.eventLogout}>
          {" "}
          Logout{" "}
        </Link>
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
//           <Link to="/notes-list"> Notes </Link>
//           <Link to="/add-note">Add note </Link>
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
