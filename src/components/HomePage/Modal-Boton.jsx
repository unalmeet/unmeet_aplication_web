import React, { Component } from "react";
/* import "./Menu-controler"; */
import "./modal-styles.css";
import { Button } from "reactstrap";

export default class ModalBoton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  render() {
    const activarSideBar = this.state.visible === true ? "active" : "";

    return (
      <div>
        <div id="menu-toggle-btn">
          <Button
            style={{
              margin: "1rem",
              width: "10rem",
              height: "3rem",
              backgroundColor: this.props.color,
              border: "0",
            }}
            onClick={() => this.setState({ visible: !this.state.visible })}
          >
            {this.props.boton}
          </Button>
        </div>
        <div className={"side-bar-container " + activarSideBar}>
          <div className={"side-bar " + activarSideBar}>
            <div className="body-side-bar">
              <div className={"menu menu-pr " + activarSideBar} id="menu-pr">
                {this.props.content}
              </div>
            </div>
          </div>
          <div
              className="side-background"
            onClick={() => this.setState({ visible: !this.state.visible })}
          >
            <div className="btn a-white" id="close-menu">
              &times;
            </div>
          </div>
        </div>
      </div>
    );
  }
}
