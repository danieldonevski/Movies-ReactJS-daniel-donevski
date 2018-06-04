import React from "react";

export default class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSaved: false,
      text: "Its saved"
    };
  }

  doSave() {
    this.setState({
      isSaved: true
    });

    if (this.props.showAlertFunc) {
      this.props.showAlertFunc(this.state.text);
    }
  }

  render() {
    return (
      <div className="my-message-div">
        {this.props.text}
        <div>
          <button className="btn btn-primary" onClick={this.doSave.bind(this)}>
            Save
          </button>
        </div>
        <div>{this.state.isSaved ? this.state.text : ""}</div>
      </div>
    );
  }
}
