import React, { useRef } from "react";
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
  constructor(props) {
    super(props);
    this.myRef = React.createRef(null);
    this.state = {
      microphoneFlag: false,
      videoFlag: false,
    };
  }

  handleControlClick(selection) {
    let _state = selection;
    this.setState({ [_state]: !this.state[_state] });
  }

  render() {
    const newMeeting = <NewMeeting className="bg-primary" />;
    const joinMeeting = <JoinMeeting className="bg-primary" />;


    const getVideo = () => {
      this.handleControlClick("videoFlag");
      navigator.mediaDevices
        .getUserMedia({ video: { width: "100%" } })
        .then((stream) => {
          let video = this.myRef.current;
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.error("error:", err);
        });
    };

    return (
      <div>
        <Days />
        <div className="calendar_meeting_display">
          <div className="calendar_meeting_videodisplay">
            {this.state.videoFlag ? (
              <video height="100%" width="100%" muted autoPlay ref={this.myRef} />
            ) : (
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
            )}
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
                onClick={() => this.handleControlClick("videoFlag")}
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
                onClick={() => getVideo()}
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
