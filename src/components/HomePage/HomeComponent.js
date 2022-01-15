import React, { Component } from "react";
import Login from "../Credentials/LoginComponent";
import Register from "../Credentials/RegisterComponent";
import ModalLateral from "./Modal-Lateral";

import { Logo } from "../Logo";
import { Button } from "../Button";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const login=<Login/>;
    const register=<Register className="bg-primary"/>;
    return (
      <div className="col-12 col-md-12">
        <div className="HomePage">
          <Logo width={200} height={250} />
          <div className="home_buttons_meeting">
            <Button text="New Meeting" color="#144B7D" textColor="#FFFF" />
            <Button text="Join Meeting" color="#144B7D" textColor="#FFFF" />
          </div>
          <div className="home_links_account">
            <ModalLateral boton="Login" content={login}/>
            <ModalLateral boton="Register" content={register}/>
          </div>
        </div>
        


        
      </div>
    );
  }
}

export default Home;
