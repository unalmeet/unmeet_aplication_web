import React, { Component } from "react";
import Login from "../Credentials/LoginComponent";
import Register from "../Credentials/RegisterComponent";
import NewMeeting from "./newMeetingComponent";
import JoinMeeting from "./joinMeetingComponent";
import ModalLateral from "./Modal-Lateral";
import ModalBoton from "./Modal-Boton";

import { Logo } from "../Logo";
import { Button } from "../Button";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      email: "",
      token: "",
    };
  }
  answerCredentials(event, email) {
    this.setState({ email: "email" });

    if (email != "") {
      this.props.credentials(this.state.email);
    }
    event.preventDefault();
  }

  render() {
    const login = (
      <Login answer={(event, email) => this.answerCredentials(event, email)} />
    );
    const register = <Register className="bg-primary" />;
    const newMeeting = <NewMeeting className="bg-primary" />;
    const joinMeeting = <JoinMeeting className="bg-primary" />;

    return (
      <div className="col-12 col-md-12">
        <div className="HomePage">
          <Logo width={200} height={200} />
          <div className="home_buttons_meeting">
            <ModalBoton boton="New Meeting" color="#144B7D" content={newMeeting} />
            <ModalBoton boton="Join Meeting" color="#144B7D" content={joinMeeting}/>
          </div>
          <div className="home_links_account">
            <ModalLateral boton="Login" content={login} />
            <ModalLateral boton="Register" content={register} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
