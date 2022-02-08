import React from "react";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";
import {
  Button,
  CardGroup,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  CardFooter,
} from "reactstrap";
import ModalBoton from "../HomePage/Modal-Boton";
import NewMeeting from "../HomePage/newMeetingComponent";

import { faTrashAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Meeting extends React.Component {
  static contextType = UserContext;
  constructor(props, context) {
    super(props);
    this.state = {
      user: context,
      mymeetings: [],
    };
  }

  componentDidMount() {
    let result = [];
    let meetings = this.props.meetings.sort(
      (a, b) => Date.parse(a.date_start) - Date.parse(b.date_start)
    );
    for (let i in meetings) {
      let x = {
        link: "",
        name: "",
        description: "",
        date_start: "",
        date_end: "",
        host: "",
        attendants: "",
      };
      let start = new Date(Date.parse(meetings[i].date_start));
      let end = new Date(Date.parse(meetings[i].date_end));
      x.link = meetings[i].link;
      x.name = meetings[i].name;
      x.description = meetings[i].description;
      x.date_start = start.toLocaleTimeString("en-US", { timeZone: "UTC" });
      x.date_end = end.toLocaleTimeString("en-US", { timeZone: "UTC" });
      x.host = meetings[i].host;
      x.attendants = meetings[i].attendants.toString();
      result.push(x);
    }
    this.setState({ mymeetings: result });
  }

  inviteUser(link) {
    fetch(process.env.REACT_APP_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query:
          `mutation {
          addAttendant(link:` +
          JSON.stringify(link) +
          `, idAttendant:1){
            link
            attendants
          }
        }`,
      }),
    })
      .then((response) => response.json())
      .then((query) => {
        console.log(query.data);
      });
  }

  removeMeeting(cancelledmeeting) {
    let temp_array = this.state.mymeetings;
    const index = temp_array.indexOf(cancelledmeeting);
    if (index > -1) {
      temp_array.splice(index, 1);
    }
    this.setState({
      mymeetings: temp_array,
    });

    fetch(process.env.REACT_APP_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query:
          `mutation {
             removeMeeting(link:"` +
              cancelledmeeting.link +
          `")
           }`,
      }),
    })
      .then((response) => response.json())
      .then((query) => {
        console.log(query.data);
      });
  }

  render() {
    const newMeeting = <NewMeeting className="bg-primary" />;
    let renderNoMeetings = (
      <Card
        style={{
          backgroundColor: "#144B7D",
          margin: "1rem",
          borderRadius: "1rem",
        }}
        inverse
      >
        <CardBody>
          <CardTitle tag="h5">No meetings scheduled</CardTitle>
          <CardText>
            <h6>Let's create a new meeting now </h6>
            <ModalBoton
              boton="New Meeting"
              color="#029ACA"
              content={newMeeting}
            />
          </CardText>
        </CardBody>
      </Card>
    );
    let rendermeetings = this.state.mymeetings.map((meeting) => (
      <Card
        key={meeting.link}
        inverse
        style={{
          backgroundColor:
            meeting.host == this.state.user ? "#144B7D" : "#029ACA",
          margin: "1rem",
          borderRadius: "1rem",
        }}
      >
        <CardBody>
          <CardTitle tag="h5">
            <Link to={`/inmeeting/${meeting.link}`} style={{ color: "white" }}>
              {meeting.name}
            </Link>
          </CardTitle>
          <CardSubtitle className="mb-2" tag="h6">
            {meeting.date_start} - {meeting.date_end}
          </CardSubtitle>
          <CardText>
            <span>Description: {meeting.description}</span>
          </CardText>
          <CardText>
            <span>Attendants: {meeting.attendants}</span>
          </CardText>
          <span>
            <CardFooter>Hosted by: {meeting.host}</CardFooter>
          </span>
          {meeting.host == this.state.user && (
            <span>
              <Button
                style={{ backgroundColor: "white" }}
                onClick={() => this.removeMeeting(meeting)}
              >
                <FontAwesomeIcon icon={faTrashAlt} color="#029ACA" />
              </Button>
              <Button
                style={{ backgroundColor: "white" }}
                onClick={() => this.inviteUser(meeting.link)}
              >
                <FontAwesomeIcon icon={faUserPlus} color="#029ACA" />
              </Button>
            </span>
          )}
        </CardBody>
      </Card>
    ));
    return (
      <div>
        {this.state.mymeetings.length === 0 ? renderNoMeetings : rendermeetings}
      </div>
    );
  }
}
export default Meeting;
