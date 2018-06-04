import React, { Component } from "react";
import Hello from "../Components/Hello";
import Message from "../Components/Message";

let showAlert = text => {
  alert(text);
};
const myMessage = ["my new message", "message 1", "message 2"];

export default class Home extends Component {
  render() {
    return (
      <div>
        <Hello name="Admins sucks" />
        <h2>Start editing to see some magic happen {"\u2728"}</h2>
        {myMessage.map(m => {
          return <Message key={m} text={m} showAlertFunc={showAlert} />;
        })}
      </div>
    );
  }
}
