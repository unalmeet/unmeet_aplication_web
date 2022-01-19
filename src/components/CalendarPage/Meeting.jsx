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

import { faTrashAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Meeting extends React.Component {
  static contextType = UserContext

  inviteUser(link) {
    fetch("http://localhost:5000/graphql", {
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

  removeMeeting(link) {
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query:
          `mutation {
          removeMeeting(link:"` +
          link +
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
    const user = this.context;
    let meetings = this.props.meetings.sort(
      (a, b) => Date.parse(a.date_start) - Date.parse(b.date_start)
    );
    let mymeetings = [];
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
      mymeetings.push(x);
    }

    let rendermeetings = mymeetings.map((meeting) => (
      <Card
        key={meeting.link}
        inverse
        style={{
          backgroundColor: meeting.host == user ? "#144B7D" : "#029ACA",
          margin: "1rem",
          borderRadius: "1rem",
        }}
      >
        <CardBody>
          <CardTitle tag="h5">
            <Link to={`/inmeeting/${meeting.link}`} style={{ color: 'white' }}>{meeting.name}</Link>
          </CardTitle>
          <CardSubtitle className="mb-2" tag="h6">
            {meeting.date_start} - {meeting.date_end}
          </CardSubtitle>
          <CardText>
            <div>Description: {meeting.description}</div>
            <div>Attendants: {meeting.attendants}</div>
          </CardText>
          <div>
            <CardFooter>Hosted by: {meeting.host}</CardFooter>
          </div>
          {meeting.host == user && (
            <div>
              <Button
                style={{ backgroundColor: "white" }}
                onClick={() => this.removeMeeting(meeting.link)}
              >
                <FontAwesomeIcon icon={faTrashAlt} color="#029ACA" />
              </Button>
              <Button
                style={{ backgroundColor: "white" }}
                onClick={() => this.inviteUser(meeting.link)}
              >
                <FontAwesomeIcon icon={faUserPlus} color="#029ACA" />
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    ));
    return <div>{rendermeetings}</div>;
  }
}
export default Meeting;
