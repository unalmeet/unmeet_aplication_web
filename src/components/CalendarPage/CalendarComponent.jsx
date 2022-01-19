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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalBoton from "../HomePage/Modal-Boton";
import NewMeeting from "../HomePage/newMeetingComponent";
import JoinMeeting from "../HomePage/joinMeetingComponent";
import UserContext from "../UserContext";
import { faMicrophone, faVideo } from "@fortawesome/free-solid-svg-icons";

class Calendar extends React.Component {
  static contextType = UserContext;
  state = {
    meetings: [],
    microphoneFlag: false,
    videoFlag: false,
  };

  arrayUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i].link === a[j].link) a.splice(j--, 1);
      }
    }

    return a;
  }
  handleControlClick(selection) { 
    let _state = selection;
    this.setState({ [_state]: !this.state[_state] });
  }

  componentDidMount() {
    const user = this.context;
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query:
          `query {
          listMeetingsAttendant(attendant:` +
          user +
          `){
            link
            name
            description
            attendants
            date_start
            date_end
            host
          }
          listMeetingsHosted(host:` +
          user +
          `){
            link
            name
            description
            attendants
            date_start
            date_end
            host
          }
        }    
      `,
      }),
    })
      .then((response) => response.json())
      .then((query) => {
        let meetings = query.data.listMeetingsAttendant.concat(
          query.data.listMeetingsHosted
        );
        var uniqueMeetings = this.arrayUnique(meetings);
        this.setState({ meetings: uniqueMeetings });
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
            <ModalBoton
              boton="New Meeting"
              color="#029ACA"
              content={newMeeting}
            />
            <ModalBoton
              boton="Join Meeting"
              color="#029ACA"
              content={joinMeeting}
            />
            <div className="calendar_cammic_buttons">
              <div
                onClick={() => this.handleControlClick("microphoneFlag")}
                className={`action-button ${
                  this.state.microphoneFlag ? "active" : "disabled"
                }`}
              >
                <FontAwesomeIcon
                  icon={faMicrophone}
                  className={
                    this.state.microphoneFlag ? "activeIcon" : "disabledIcon"
                  }
                />
              </div>
              <div
                onClick={() => this.handleControlClick("videoFlag")}
                className={`action-button ${
                  this.state.videoFlag ? "active" : "disabled"
                }`}
              >
                <FontAwesomeIcon
                  icon={faVideo}
                  className={
                    this.state.videoFlag ? "activeIcon" : "disabledIcon"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Calendar;
