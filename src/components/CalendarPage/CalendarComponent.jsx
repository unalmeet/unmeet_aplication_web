import React from "react";
import {
  Card,
  CardGroup,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import { Logo } from "../Logo";
import Days from "./Days";
import { MicButton } from "../MicButton";
import { CamButton } from "../CamButton";
import ModalBoton from "../HomePage/Modal-Boton";
import NewMeeting from "../HomePage/newMeetingComponent";
import JoinMeeting from "../HomePage/joinMeetingComponent";

class Calendar extends React.Component {
  state = {
    meetings: [],
  };
  componentDidMount() {
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query {
          listMeetings{
            link
            name
            attendants
            date_start
          }
        }    
      `,
      }),
    })
      .then((response) => response.json())
      .then((query) => {
        this.setState({ meetings: query.data.listMeetings });
      });
  }
  render() {
    const newMeeting = <NewMeeting className="bg-primary" />;
    const joinMeeting = <JoinMeeting className="bg-primary" />;
    return (
      <div>
        <Days meetings={this.state.meetings} />
        <div className="calendar_meeting_display">
          <div className="calendar_meeting_videodisplay">
            <Card
              style={{
                margin: "1rem",
                backgroundColor: "#2D2A2A",
              }}
            >
              <CardBody
                style={{
                  display: "grid",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Logo
                  width={window.innerWidth * 0.2}
                  height={window.innerWidth * 0.2}
                />
              </CardBody>
            </Card>
          </div>
          <div className="calendar_meeting_buttons">
            <ModalBoton boton="New Meeting" color= "#029ACA" content={newMeeting} />
            <ModalBoton boton="Join Meeting" color= "#029ACA" content={joinMeeting} />
            <div className="calendar_cammic_buttons">
              <MicButton width={100} height={100} />
              <CamButton width={100} height={100} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Calendar;
