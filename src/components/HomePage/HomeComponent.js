import React, { Component } from "react";
import Login from "../Credentials/LoginComponent";
import Register from "../Credentials/RegisterComponent";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Logo } from "../Logo";
import { Button } from "../Button";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="col-12 col-md-10">
        <div className="HomePage">
          <Logo width={200} height={250} />
          <div className="home_buttons_meeting">
            <Button text="New Meeting" color="#144B7D" textColor="#FFFF" />
            <Button text="Join Meeting" color="#144B7D" textColor="#FFFF" />
          </div>
          <div className="home_links_account">
            <a href="login" className="href">
              Login
            </a>
            <a href="Sign in" className="href">
              Sign in
            </a>
            <a href="Forgot Password" className="href">
              Forgot Password
            </a>
          </div>
        </div>

        <Popup trigger={<button> Login </button>} position="right center">
          
          <Login />
        </Popup>
        <Popup trigger={<button> Register </button>} position="right center">
          
          <Register />
        </Popup>
      </div>
    );
  }
}

export default Home;
